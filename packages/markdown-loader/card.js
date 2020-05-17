
// 包上卡片样式
// var str = '<h3>标题1</h3><pre>描述1</pre><code>console.log(1)</code><h3><h3>标题2</h3><pre>描述2</pre><code>console.log(2)</code><h3>'
module.exports = function wrap(str) {
  const group = str.replace(/<h3/g, ':::<h3').replace(/<h2/g, ':::<h2').split(':::')
  return group.reduce((html, fragment) => {
    if (fragment.indexOf('<h3>') !== -1) {
      html += `<div class="card">${fragment}</div>`
    } else {
      html += fragment
    }
    return html
  }, '')
}
