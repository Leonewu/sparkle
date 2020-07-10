var render = function render() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._v(" picker "), _c('test')], 1);
};

var staticRenderFns = [];
render._withStripped = true;
import test from './components/test';
export default {
  render,
  staticRenderFns,
  name: 'Picker',
  components: {
    test
  }
};