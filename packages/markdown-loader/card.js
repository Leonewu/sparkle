
// 对 h3 到下一个 h3 之间的内容 包上卡片样式
// var str = '<h3>水电费可接受的</h3><pre>山东矿机防守打法</pre><code>skdfjsdfsdf</code><h3>水电费可2接受的</h3><pre>山东123矿机防守打法</pre><code>skdf3323323jsdfsdf</code></h3>''
module.exports = function(str) {
  str.replace(/<h3>((.|\n)*)<h3>/)
}
