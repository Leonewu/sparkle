var _default = {
  name: 'XiaoCard',
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

function install(Vue) {
  Vue.component(_default.name, _default);
}

export default {
  _default,
  install
};