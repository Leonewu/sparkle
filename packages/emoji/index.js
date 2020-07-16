
// const emoji = require('node-emoji')
const basic = {
  rocket: String.fromCodePoint(0x1F680),
  fire: String.fromCodePoint(0x1F525),
  point_left: String.fromCodePoint(0x1F448),
  point_right: String.fromCodePoint(0x1F449),
  warn: String.fromCodePoint(0x26A0)
}

const emoji = {}

const times = [3]

Object.keys(basic).forEach(key => {
  emoji[key] = basic[key]
  times.forEach(time => {
    emoji[`${key}_x${time}`] = (basic[key] + ' ').repeat(3)
  })
})

module.exports = emoji
