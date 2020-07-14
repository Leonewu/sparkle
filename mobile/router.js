import Vue from 'vue'
import VueRouter from 'vue-router'
// import DemoHome from './components/DemoHome'
// import { decamelize } from './common'
import './common/iframe-router'
import routes from '@Components'
// const routes = __COMPONENTS__.map(name => ({
//   path: `/${name}`,
//   component: () => import(/* webpackChunkName: "[request]" */`../src/components/${name}/demo/index.vue`),
//   meta: {
//     name
//   }
// }))
// const { locales, defaultLang } = config.site

// setDefaultLang(defaultLang)

// function getLangFromRoute(route) {
//   const lang = route.path.split('/')[1]
//   const langs = Object.keys(locales)

//   if (langs.indexOf(lang) !== -1) {
//     return lang
//   }

//   return getLang()
// }

// function getRoutes() {
//   const routes = []
//   const names = Object.keys(demos)
//   const langs = locales ? Object.keys(locales) : []

//   if (langs.length) {
//     routes.push({
//       path: '*',
//       redirect: route => `/${getLangFromRoute(route)}/`
//     })

//     langs.forEach(lang => {
//       routes.push({
//         path: `/${lang}`,
//         component: DemoHome,
//         meta: { lang }
//       })
//     })
//   } else {
//     routes.push({
//       path: '*',
//       redirect: () => '/'
//     })

//     routes.push({
//       path: '/',
//       component: DemoHome
//     })
//   }

//   names.forEach(name => {
//     const component = decamelize(name)

//     if (langs.length) {
//       langs.forEach(lang => {
//         routes.push({
//           name: `${lang}/${component}`,
//           path: `/${lang}/${component}`,
//           component: demos[name],
//           meta: {
//             name,
//             lang
//           }
//         })
//       })
//     } else {
//       routes.push({
//         name,
//         path: `/${component}`,
//         component: demos[name],
//         meta: {
//           name
//         }
//       })
//     }
//   })

//   return routes
// }

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
