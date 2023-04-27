import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _03d9a0c2 = () => interopDefault(import('..\\pages\\usuarios\\index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _64110cf9 = () => interopDefault(import('..\\pages\\usuarios\\cadastro.vue' /* webpackChunkName: "pages/usuarios/cadastro" */))
const _64fd784e = () => interopDefault(import('..\\pages\\usuarios\\login.vue' /* webpackChunkName: "pages/usuarios/login" */))
const _24b486b2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/usuarios",
    component: _03d9a0c2,
    name: "usuarios"
  }, {
    path: "/usuarios/cadastro",
    component: _64110cf9,
    name: "usuarios-cadastro"
  }, {
    path: "/usuarios/login",
    component: _64fd784e,
    name: "usuarios-login"
  }, {
    path: "/",
    component: _24b486b2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
