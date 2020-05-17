import example from './example.vue'
example.install = function(Vue) {
  Vue.component(example.name, example)
}
export default example
