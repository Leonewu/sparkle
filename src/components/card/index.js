import Card from './card'
Card.install = function(Vue) {
  Vue.component(Card.name, Card)
}
export default Card
