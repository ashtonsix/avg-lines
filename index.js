'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

var i80 = function i80(arr) {
  return Math.ceil(arr.length * 0.8);
};
var sum = function sum(arr) {
  return arr.reduce(function (pv, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var v = _ref2[0];
    return pv + v;
  }, 0);
};

exports.default = function (args) {
  return new Promise(function (resolve, reject) {
    return (0, _child_process.exec)('find ' + args + ' | xargs wc -l', { maxBuffer: Math.pow(1024, 2) }, function (err, input) {
      if (err) reject(err);else {
        var files = input.split('\n').filter(function (v) {
          return v;
        }).slice(0, -1).map(function (l) {
          return l.match(/^ *(\d+) +(.+)$/).slice(1);
        }).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2);

          var val = _ref4[0];
          var file = _ref4[1];
          return [parseInt(val, 10), file];
        }).sort(function (_ref5, _ref6) {
          var _ref8 = _slicedToArray(_ref5, 1);

          var v0 = _ref8[0];

          var _ref7 = _slicedToArray(_ref6, 1);

          var v1 = _ref7[0];
          return v0 - v1;
        });
        if (!files.length) reject('No files matched `find ' + args + '`');else {
          resolve({
            numFiles: files.length,
            numLines: sum(files),
            avgLines: files[i80(files)][0],
            linesIneqaulity: sum(files.slice(i80(files))) / sum(files),
            largestFileName: files.slice(-1)[0][1],
            largestFile: files.slice(-1)[0][0] });
        }
      }
    });
  });
};