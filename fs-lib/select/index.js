var render = function render() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "select-wrapper"
  }, [_vm._v(" select component "), _c('XiaoButton')], 1);
};

var staticRenderFns = [];
render._withStripped = true; //
//
//
//
//
//
//
// import './select.scss'

import XiaoButton from '../button/index.vue';
export default {
  render,
  staticRenderFns,
  name: 'XiaoSelect',
  components: {
    XiaoButton
  },

  data() {
    return {};
  }

};