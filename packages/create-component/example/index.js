import Example from './example.vue'
Example.install = function(Vue) {
  Vue.component(Example.name, Example)
}
export default Example
