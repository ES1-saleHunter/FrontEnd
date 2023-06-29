import Vue from 'vue'
import { decode, parsePath, withoutBase, withoutTrailingSlash, normalizeURL } from 'ufo'

import { getMatchedComponentsInstances, getChildrenComponentInstancesUsingFetch, promisify, globalHandleError, urlJoin, sanitizeComponent } from './utils'
import NuxtError from '../layouts/error.vue'
import NuxtLoading from './components/nuxt-loading.vue'
import NuxtBuildIndicator from './components/nuxt-build-indicator'

import '../assets/css/tailwind.css'

import '../node_modules/element-ui/lib/theme-chalk/index.css'

import _9f3a2e20 from '../layouts/components/cadastro/formCadastro.vue'
import _8542348e from '../layouts/components/loading.vue'
import _2754c95c from '../layouts/components/login/formLogin.vue'
import _7a147216 from '../layouts/components/navbar/avatar.vue'
import _4ff3bca8 from '../layouts/components/navbar/navbar.vue'
import _3ff45666 from '../layouts/components/navbar/navbarcompose.vue'

import _5e1477e7 from '../layouts/components/preco/LineChart.vue'
import _56d9a9d2 from '../layouts/components/preco/pricedesc.vue'
import _651b1b30 from '../layouts/components/recuperarsenha/FormRecuperarsenha.vue'
import _273be84e from '../layouts/components/recuperarsenha/FormRedefinirsenha.vue'
import _4cbc6f26 from '../layouts/components/sidebar/sidebar.vue'
import _7e152806 from '../layouts/default1.vue'
import _6f6c098b from './layouts/default.vue'

const layouts = { "_components/cadastro/formCadastro": sanitizeComponent(_9f3a2e20),"_components/loading": sanitizeComponent(_8542348e),"_components/login/formLogin": sanitizeComponent(_2754c95c),"_components/navbar/avatar": sanitizeComponent(_7a147216),"_components/navbar/navbar": sanitizeComponent(_4ff3bca8),"_components/navbar/navbarcompose": sanitizeComponent(_3ff45666),"_components/preco/LineChart": sanitizeComponent(_5e1477e7),"_components/preco/pricedesc": sanitizeComponent(_56d9a9d2),"_components/recuperarsenha/FormRecuperarsenha": sanitizeComponent(_651b1b30),"_components/recuperarsenha/FormRedefinirsenha": sanitizeComponent(_273be84e),"_components/sidebar/sidebar": sanitizeComponent(_4cbc6f26),"_default1": sanitizeComponent(_7e152806),"_default": sanitizeComponent(_6f6c098b) }

export default {
  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [layoutEl])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [templateEl])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      h(NuxtBuildIndicator),
      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: '',

    nbFetching: 0
    }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    this.$root.$options.$nuxt = this

    if (process.client) {
      // add to window so we can listen when ready
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  async mounted () {
    this.$loading = this.$refs.loading
  },

  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    },

    isFetching () {
      return this.nbFetching > 0
    },
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map(async (page) => {
        let p = []

        // Old fetch
        if (page.$options.fetch && page.$options.fetch.length) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        // Wait for asyncData & old fetch to finish
        await Promise.all(p)
        // Cleanup refs
        p = []

        if (page.$fetch) {
          p.push(page.$fetch())
        }
        // Get all component instance to call $fetch
        for (const component of getChildrenComponentInstancesUsingFetch(page.$vnode.componentInstance)) {
          p.push(component.$fetch())
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail(error)
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },
    errorChanged () {
      if (this.nuxt.err) {
        if (this.$loading) {
          if (this.$loading.fail) {
            this.$loading.fail(this.nuxt.err)
          }
          if (this.$loading.finish) {
            this.$loading.finish()
          }
        }

        let errorLayout = (NuxtError.options || NuxtError).layout;

        if (typeof errorLayout === 'function') {
          errorLayout = errorLayout(this.context)
        }

        this.setLayout(errorLayout)
      }
    },

    setLayout (layout) {
      if(layout && typeof layout !== 'string') {
        throw new Error('[nuxt] Avoid using non-string value as layout property.')
      }

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    },
  },

  components: {
    NuxtLoading
  }
}
