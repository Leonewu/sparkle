
import button from "./button/index.js";
import select from "./select/index.js";
import card from "./card/index.js";
const components = [button, select, card];
function install(Vue) {
  components.forEach(component => {
    if (component.install) {
      component.install(Vue);
    } else {
      Vue.component(component.name, component);
    }
  })
}
// if (Vue) {
//   install(Vue)
// }
export default {
  install
}