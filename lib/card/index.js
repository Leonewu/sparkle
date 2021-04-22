"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'Card',
  props: {
    name: String,
    dot: Boolean
  },

  render() {
    var h = arguments[0];
    return h("div", {
      "class": "card"
    }, ["card"]);
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