"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _button = _interopRequireDefault(require("../button/"));

var _picker = _interopRequireDefault(require("./picker"));

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
    XiaoButton: _button.default,
    picker: _picker.default
  },

  data() {
    return {};
  }

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