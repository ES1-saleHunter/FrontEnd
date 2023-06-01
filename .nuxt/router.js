import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5382e15b = () => interopDefault(import('..\\pages\\jogos\\index.vue' /* webpackChunkName: "pages/jogos/index" */))
const _9dd4c230 = () => interopDefault(import('..\\pages\\lojas\\index.vue' /* webpackChunkName: "pages/lojas/index" */))
const _cb9d27e4 = () => interopDefault(import('..\\pages\\usuarios\\index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _07c83d26 = () => interopDefault(import('..\\pages\\components\\image.vue' /* webpackChunkName: "pages/components/image" */))
const _7e432398 = () => interopDefault(import('..\\pages\\jogos\\compara\\index.vue' /* webpackChunkName: "pages/jogos/compara/index" */))
const _127823a6 = () => interopDefault(import('..\\pages\\usuarios\\cadastro.vue' /* webpackChunkName: "pages/usuarios/cadastro" */))
const _383b316e = () => interopDefault(import('..\\pages\\usuarios\\favoritos.vue' /* webpackChunkName: "pages/usuarios/favoritos" */))
const _63d90f25 = () => interopDefault(import('..\\pages\\usuarios\\login.vue' /* webpackChunkName: "pages/usuarios/login" */))
const _52af1c20 = () => interopDefault(import('..\\pages\\usuarios\\recuperarsenha.vue' /* webpackChunkName: "pages/usuarios/recuperarsenha" */))
const _064b9049 = () => interopDefault(import('..\\pages\\usuarios\\redefinirsenha.vue' /* webpackChunkName: "pages/usuarios/redefinirsenha" */))
const _794e121a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _5382e15b,
    name: "jogos"
  }, {
    path: "/lojas",
    component: _9dd4c230,
    name: "lojas"
  }, {
    path: "/usuarios",
    component: _cb9d27e4,
    name: "usuarios"
  }, {
    path: "/components/image",
    component: _07c83d26,
    name: "components-image"
  }, {
    path: "/jogos/compara",
    component: _7e432398,
    name: "jogos-compara"
  }, {
    path: "/usuarios/cadastro",
    component: _127823a6,
    name: "usuarios-cadastro"
  }, {
    path: "/usuarios/favoritos",
    component: _383b316e,
    name: "usuarios-favoritos"
  }, {
    path: "/usuarios/login",
    component: _63d90f25,
    name: "usuarios-login"
  }, {
    path: "/usuarios/recuperarsenha",
    component: _52af1c20,
    name: "usuarios-recuperarsenha"
  }, {
    path: "/usuarios/redefinirsenha",
    component: _064b9049,
    name: "usuarios-redefinirsenha"
  }, {
    path: "/",
    component: _794e121a,
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
