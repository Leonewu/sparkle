import Vue from 'vue'
import VueRouter from 'vue-router'
import './common/iframe-router'
import { routes as docRoutes } from '@COMPONENTS/doc'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "[request]" */'./views/home.md')
  },
  ...docRoutes
]

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'hash',
  routes: routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { selector: to.hash }
    }

    return { x: 0, y: 0 }
  }
})

router.afterEach(() => {
  Vue.nextTick(() => window.syncPath())
})

window.vueRouter = router
