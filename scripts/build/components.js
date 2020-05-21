const fs = require('fs')
const path = require('path')

// 根据文件目录获取组件列表
module.exports = function getComponents() {
  const filePath = path.resolve(__dirname, '../../src/components')
  const components = fs.readdirSync(filePath)
    .sort((a, b) =>
      fs.statSync(filePath + '/' + a).birthtimeMs - fs.statSync(filePath + '/' + b).birthtimeMs)
  return components
}
