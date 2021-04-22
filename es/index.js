
import button from "./button/index.js";
import icon from "./icon/index.js";
import select from "./select/index.js";
import card from "./card/index.js";
const components = [button, icon, select, card];

function install(Vue) {
  components.forEach(component => {
    component.install(Vue);
  })
}
// if (Vue) {
//   install(Vue)
// }
export default {
  install
}