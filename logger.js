#!/usr/bin/env node
'use strict';

var _context;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv.slice(/node/.test(process.argv[0]) ? 2 : 1).map(function (v) {
  return '\'' + v + '\'';
}).join(' ');
var log = function log(str) {
  var bold = false;
  var newStr = str.split('**').reduce(function (pv, v) {
    return bold = !bold, pv + '\u001b[' + (bold ? 1 : 0) + 'm' + v;
  });
  console.log(newStr);
};

exports.default = (0, _index2.default)(args).then(function (_ref) {
  var numFiles = _ref.numFiles;
  var numLines = _ref.numLines;
  var avgLines$ = _ref.avgLines;
  var linesIneqaulity = _ref.linesIneqaulity;
  var largestFileName = _ref.largestFileName;
  var largestFile = _ref.largestFile;
  return log('Checked **' + numFiles + '** files (**' + numLines + '** LOC):'), log('  **80%** of files contain > **' + avgLines$ + '** LOC'), log('  **20%** of files contain **' + (linesIneqaulity * 100).toFixed(2) + '%** of the total LOC'), log('  The largest file (**' + largestFileName + '**) contains **' + largestFile + '** LOC');
}).catch((_context = console).error.bind(_context));