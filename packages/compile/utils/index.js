
function isTestPath(filePath) {
  return /__test__/.test(filePath)
}

function isDemoPath(filePath) {
  return /demo/.test(filePath)
}

function isDocPath(filePath) {
  return /README\.md/.test(filePath)
}

function isIgnorePath(filePath) {
  return isTestPath(filePath) || isDemoPath(filePath) || isDocPath(filePath)
}

module.exports = {
  isTestPath,
  isDemoPath,
  isDocPath,
  isIgnorePath
}