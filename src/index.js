import Button from './components/button/button.vue'

const components = {
  // 组件名: 组件实例
  'xiao-button': Button
}

const install = function (Vue) {
  for (name in components) {
    Vue.component(name, components[name])
  }
}

export default {
  install
}

