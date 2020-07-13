var render = function render() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "select-wrapper"
  }, [_vm._v(" select component "), _c('XiaoButton'), _c('picker')], 1);
};

var staticRenderFns = [];
render._withStripped = true;
import XiaoButton from '../button/index.js';
import picker from './picker';
var _default = {
  render,
  staticRenderFns,
  name: 'XiaoSelect',
  components: {
    XiaoButton,
    picker
  },

  data() {
    return {};
  }

};

function install(Vue) {
  Vue.component(_default.name, _default);
}

export default {
  _default,
  install
};