"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../utils/");

var render = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "wrapper"
  }, [_vm._v(" button component test ")]);
};

var staticRenderFns = [];
render._withStripped = true;
var _default = {
  render,
  staticRenderFns,
  _scopeId: "data-v-4f3be68a",
  name: 'Button',

  data() {
    return {};
  },

  mounted() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      yield _this.promise;
    })();
  },

  methods: {
    c() {
      console.log(12);
      (0, _utils.add)();
    },

    promise() {
      return new Promise((resolve, reject) => {
        resolve(1);
      });
    }

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