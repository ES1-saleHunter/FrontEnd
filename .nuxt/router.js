import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0cea2ec8 = () => interopDefault(import('../pages/jogos/index.vue' /* webpackChunkName: "pages/jogos/index" */))
const _0d13c56f = () => interopDefault(import('../pages/lojas/index.vue' /* webpackChunkName: "pages/lojas/index" */))
const _b40163b6 = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _63bbd3bf = () => interopDefault(import('../pages/components/image.vue' /* webpackChunkName: "pages/components/image" */))
const _17e89a24 = () => interopDefault(import('../pages/jogos/compara/index.vue' /* webpackChunkName: "pages/jogos/compara/index" */))
const _bac57e94 = () => interopDefault(import('../pages/usuarios/cadastro.vue' /* webpackChunkName: "pages/usuarios/cadastro" */))
const _6fa6f13c = () => interopDefault(import('../pages/usuarios/login.vue' /* webpackChunkName: "pages/usuarios/login" */))
const _05f8a3e9 = () => interopDefault(import('../pages/usuarios/recuperarsenha.vue' /* webpackChunkName: "pages/usuarios/recuperarsenha" */))
const _8cd5cfdc = () => interopDefault(import('../pages/usuarios/redefinirsenha.vue' /* webpackChunkName: "pages/usuarios/redefinirsenha" */))
const _0e9c4af6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/jogos",
    component: _0cea2ec8,
    name: "jogos"
  }, {
    path: "/lojas",
    component: _0d13c56f,
    name: "lojas"
  }, {
    path: "/usuarios",
    component: _b40163b6,
    name: "usuarios"
  }, {
    path: "/components/image",
    component: _63bbd3bf,
    name: "components-image"
  }, {
    path: "/jogos/compara",
    component: _17e89a24,
    name: "jogos-compara"
  }, {
    path: "/usuarios/cadastro",
    component: _bac57e94,
    name: "usuarios-cadastro"
  }, {
    path: "/usuarios/login",
    component: _6fa6f13c,
    name: "usuarios-login"
  }, {
    path: "/usuarios/recuperarsenha",
    component: _05f8a3e9,
    name: "usuarios-recuperarsenha"
  }, {
    path: "/usuarios/redefinirsenha",
    component: _8cd5cfdc,
    name: "usuarios-redefinirsenha"
  }, {
    path: "/",
    component: _0e9c4af6,
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
