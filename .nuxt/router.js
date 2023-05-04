import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _25d0dec3 = () => interopDefault(import('../pages/jogos/index.vue' /* webpackChunkName: "pages/jogos/index" */))
const _3959bb96 = () => interopDefault(import('../pages/lojas/index.vue' /* webpackChunkName: "pages/lojas/index" */))
const _71015ac4 = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _254c9df8 = () => interopDefault(import('../pages/components/image.vue' /* webpackChunkName: "pages/components/image" */))
const _64689215 = () => interopDefault(import('../pages/jogos/compara/index.vue' /* webpackChunkName: "pages/jogos/compara/index" */))
const _1325bd9d = () => interopDefault(import('../pages/usuarios/cadastro.vue' /* webpackChunkName: "pages/usuarios/cadastro" */))
const _ddb21496 = () => interopDefault(import('../pages/usuarios/login.vue' /* webpackChunkName: "pages/usuarios/login" */))
const _30f39790 = () => interopDefault(import('../pages/usuarios/recuperarsenha.vue' /* webpackChunkName: "pages/usuarios/recuperarsenha" */))
const _36dfe88e = () => interopDefault(import('../pages/usuarios/redefinirsenha.vue' /* webpackChunkName: "pages/usuarios/redefinirsenha" */))
const _14cd8c28 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _25d0dec3,
    name: "jogos"
  }, {
    path: "/lojas",
    component: _3959bb96,
    name: "lojas"
  }, {
    path: "/usuarios",
    component: _71015ac4,
    name: "usuarios"
  }, {
    path: "/components/image",
    component: _254c9df8,
    name: "components-image"
  }, {
    path: "/jogos/compara",
    component: _64689215,
    name: "jogos-compara"
  }, {
    path: "/usuarios/cadastro",
    component: _1325bd9d,
    name: "usuarios-cadastro"
  }, {
    path: "/usuarios/login",
    component: _ddb21496,
    name: "usuarios-login"
  }, {
    path: "/usuarios/recuperarsenha",
    component: _30f39790,
    name: "usuarios-recuperarsenha"
  }, {
    path: "/usuarios/redefinirsenha",
    component: _36dfe88e,
    name: "usuarios-redefinirsenha"
  }, {
    path: "/",
    component: _14cd8c28,
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
