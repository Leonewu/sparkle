"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _default2 = {
  _default,
  install
};
exports.default = _default2;