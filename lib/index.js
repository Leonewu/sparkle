"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./button/index.js"));

var _index2 = _interopRequireDefault(require("./icon/index.js"));

var _index3 = _interopRequireDefault(require("./select/index.js"));

var _index4 = _interopRequireDefault(require("./card/index.js"));

var components = [_index.default, _index2.default, _index3.default, _index4.default];

function install(Vue) {
  components.forEach(component => {
    component.install(Vue);
  });
} // if (Vue) {
//   install(Vue)
// }


var _default = {
  install
};
exports.default = _default;