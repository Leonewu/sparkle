"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _test = _interopRequireDefault(require("./components2/test2.js"));

var render = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v(" 测试嵌套引用 "), _c('trr')], 1);
};

var staticRenderFns = [];
render._withStripped = true;
var _default = {
  render,
  staticRenderFns,
  name: 'Tt',
  components: {
    trr: _test.default
  }
};
exports.default = _default;