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

export default {
  _default,
  install
};