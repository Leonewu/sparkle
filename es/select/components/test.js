import trr from './components2/test2.js';

var render = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v(" 测试嵌套引用 "), _c('trr')], 1);
};

var staticRenderFns = [];
render._withStripped = true;
export default {
  render,
  staticRenderFns,
  name: 'Tt',
  components: {
    trr
  }
};