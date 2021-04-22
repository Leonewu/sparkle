var render = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v(" icon ")]);
};

var staticRenderFns = [];
render._withStripped = true;
var _default = {
  render,
  staticRenderFns,
  name: 'Icon'
};
_default.name = 'starry-' + _default.name.toLowerCase();

function install(Vue) {
  Vue.component(_default.name, _default);
}

export default {
  _default,
  install
};