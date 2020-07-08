export default {
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