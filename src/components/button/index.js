import Button from './button.vue'
// install 是为了按需引入可以直接 Vue.use(Button)
Button.install = function(Vue) {
  Vue.component(Button.name, Button)
}
export default Button
