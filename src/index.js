import Button from './components/button/'
import Select from './components/select/'

const components = [Button, Select]

const install = function(Vue) {
  components.forEach((component) => {
    Vue.use(component)
  })
}

export default {
  install
}
