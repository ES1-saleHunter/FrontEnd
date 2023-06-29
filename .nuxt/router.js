import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5e9357ea = () => interopDefault(import('../pages/jogos/index.vue' /* webpackChunkName: "pages/jogos/index" */))
const _37819e44 = () => interopDefault(import('../pages/lojas/index.vue' /* webpackChunkName: "pages/lojas/index" */))
const _2bca7856 = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _b93594a0 = () => interopDefault(import('../pages/components/image.vue' /* webpackChunkName: "pages/components/image" */))
const _54483f5d = () => interopDefault(import('../pages/jogos/compara/index.vue' /* webpackChunkName: "pages/jogos/compara/index" */))
const _58201ce5 = () => interopDefault(import('../pages/usuarios/cadastro.vue' /* webpackChunkName: "pages/usuarios/cadastro" */))
const _a3e7e0de = () => interopDefault(import('../pages/usuarios/favoritos.vue' /* webpackChunkName: "pages/usuarios/favoritos" */))

const _21fc37ca = () => interopDefault(import('../pages/usuarios/lista/index.vue' /* webpackChunkName: "pages/usuarios/lista/index" */))
const _151bc926 = () => interopDefault(import('../pages/usuarios/login.vue' /* webpackChunkName: "pages/usuarios/login" */))
const _b9a93e50 = () => interopDefault(import('../pages/usuarios/recuperarsenha.vue' /* webpackChunkName: "pages/usuarios/recuperarsenha" */))
const _56c7d501 = () => interopDefault(import('../pages/usuarios/redefinirsenha.vue' /* webpackChunkName: "pages/usuarios/redefinirsenha" */))
const _73f252a3 = () => interopDefault(import('../pages/jogos/_name.vue' /* webpackChunkName: "pages/jogos/_name" */))

const _41f24534 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _5e9357ea,
    name: "jogos"
  }, {
    path: "/lojas",
    component: _37819e44,
    name: "lojas"
  }, {
    path: "/usuarios",
    component: _2bca7856,
    name: "usuarios"
  }, {
    path: "/components/image",
    component: _b93594a0,
    name: "components-image"
  }, {
    path: "/jogos/compara",
    component: _54483f5d,
    name: "jogos-compara"
  }, {
    path: "/usuarios/cadastro",
    component: _58201ce5,
    name: "usuarios-cadastro"
  }, {
    path: "/usuarios/favoritos",
    component: _a3e7e0de,
    name: "usuarios-favoritos"
  }, {
    path: "/usuarios/lista",
    component: _21fc37ca,
    name: "usuarios-lista"
  }, {
    path: "/usuarios/login",
    component: _151bc926,
    name: "usuarios-login"
  }, {
    path: "/usuarios/recuperarsenha",
    component: _b9a93e50,
    name: "usuarios-recuperarsenha"
  }, {
    path: "/usuarios/redefinirsenha",
    component: _56c7d501,
    name: "usuarios-redefinirsenha"
  }, {

    path: "/components/filtros/filtrosJogos",
    component: _fe3b164c,
    name: "components-filtros-filtrosJogos"

    path: "/jogos/:name",
    component: _73f252a3,
    name: "jogos-name"

  }, {
    path: "/",
    component: _41f24534,
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
