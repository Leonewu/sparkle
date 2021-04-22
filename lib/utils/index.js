"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.remove = remove;
exports.testBabel = testBabel;
exports.testAsync = testAsync;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function add(component) {
  console.log("add ".concat(component));
}

function remove(component) {
  console.log("remove ".concat(component));
}

function testBabel() {
  var a = [1, 2, 3];
  return [...a].map(n => n + 1);
}

function testAsync() {
  return _testAsync.apply(this, arguments);
}

function _testAsync() {
  _testAsync = (0, _asyncToGenerator2.default)(function* () {
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