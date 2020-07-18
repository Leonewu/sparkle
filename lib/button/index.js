import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import { add } from '../utils/';

var render = function render() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "wrapper"
  }, [_vm._v(" button component ")]);
};

var staticRenderFns = [];
render._withStripped = true;
var _default = {
  render,
  staticRenderFns,
  _scopeId: "data-v-5e24e079",
  name: 'XiaoButton',

  data() {
    return {};
  },

  mounted() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.promise;
    })();
  },

  methods: {
    c() {
      console.log(12);
      add();
    },

    promise() {
      return new Promise((resolve, reject) => {
        resolve(1);
      });
    }

  }
};

function install(Vue) {
  Vue.component(_default.name, _default);
}

export default {
  _default,
  install
};