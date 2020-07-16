import ppp from '../../components3/test3';

var render = function render() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v(" 测试嵌套引用 "), _c('ppp')], 1);
};

var staticRenderFns = [];
render._withStripped = true;
export default {
  render,
  staticRenderFns,
  name: 'Tt',
  components: {
    ppp
  }
};