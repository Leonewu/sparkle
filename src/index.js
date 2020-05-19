import Button from './components/button/button.vue'
import Select from './components/select/select.vue'

const components = {
  // 组件名: 组件实例
  'xiao-button': Button,
  'xiao-select': Select
}

const install = function(Vue) {
  for (const name in components) {
    Vue.component(name, components[name])
  }
}

export default {
  install
}
