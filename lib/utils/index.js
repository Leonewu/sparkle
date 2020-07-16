import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
export function add(component) {
  console.log("add ".concat(component));
}
export function remove(component) {
  console.log("remove ".concat(component));
}
export function testBabel() {
  var a = [1, 2, 3];
  return [...a].map(n => n + 1);
}
export function testAsync() {
  return _testAsync.apply(this, arguments);
}

function _testAsync() {
  _testAsync = _asyncToGenerator(function* () {
    new Promise(resolve => {
      setTimeout(() => {
        resolve('async function');
      }, 1000);
    }).then(res => {
      console.log(res);
    });
  });
  return _testAsync.apply(this, arguments);
}