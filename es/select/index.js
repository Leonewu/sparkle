import XiaoButton from '../button/';
import picker from './picker';

var render = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "select-wrapper"
  }, [_vm._v(" select component "), _c('XiaoButton'), _c('picker')], 1);
};

var staticRenderFns = [];
render._withStripped = true;
var _default = {
  render,
  staticRenderFns,
  name: 'Select',
  components: {
    XiaoButton,
    picker
  },

  data() {
    return {};
  }

};
_default.name = 'starry-' + _default.name.toLowerCase();

function install(Vue) {
  Vue.component(_default.name, _default);
}

export default {
  _default,
  install
};