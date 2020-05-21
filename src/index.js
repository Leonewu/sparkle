import Button from './components/button/button.vue'
import Select from './components/select/select.vue'

const components = [Button, Select]

const install = function(Vue) {
  components.forEach((component) => {
    Vue.use(component)
  })
}

export default {
  install
}
