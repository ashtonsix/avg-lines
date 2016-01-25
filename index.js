'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _child_process = require('child_process');

var pipe = function pipe(args) {
  for (var _len = arguments.length, stack = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    stack[_key - 1] = arguments[_key];
  }

  return stack.reduce(function (pv, v) {
    return v(pv);
  }, args);
};
var args = process.argv.slice(process.argv[0] === 'node' ? 2 : 1).join(' ');
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
var log = function log(str) {
  var _context;

  var bold = false;
  pipe(str.split('**').reduce(function (pv, v) {
    return bold = !bold, pv + '\u001b[' + (bold ? 1 : 0) + 'm' + v;
  }), (_context = console).log.bind(_context));
};

(0, _child_process.exec)('find ' + args + ' | xargs wc -l', function (err, input) {
  return err ? console.error(err) : pipe(input.split('\n').slice(0, -2).map(function (l) {
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
  }), function (files) {
    return log('Checked **' + files.length + '** files (**' + sum(files) + '** LOC):'), log('  **80%** of files contain > **' + files[i80(files)][0] + '** LOC'), log('  **20%** of files contain **' + (sum(files.slice(i80(files))) / sum(files) * 100).toFixed(2) + '%** of the LOC'), log('  The largest file (**' + files.slice(-1)[0][1] + '**) contains **' + files.slice(-1)[0][0] + '** LOC');
  });
});