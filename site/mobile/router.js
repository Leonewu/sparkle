import Vue from 'vue'
import VueRouter from 'vue-router'
// import DemoHome from './components/DemoHome'
import './common/iframe-router'
import { routes } from '@COMPONENTS/demo'

Vue.use(VueRouter)
console.log(routes)
export const router = new VueRouter({
  mode: 'hash',
  routes: routes,
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 }
})

router.afterEach(() => {
  if (!router.currentRoute.redirectedFrom) {
    Vue.nextTick(window.syncPath)
  }
})

window.vueRouter = router
