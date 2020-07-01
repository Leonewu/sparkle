const path = require('path')

function getExt(file) {
  return file ? file.match(/\.([^.]+)$/) ? file.match(/\.([^.]+)$/)[1] : '' : ''
}

function getComponentName(path) {

}

module.exports = {
  getExt
}
