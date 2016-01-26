'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = require('child_process');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
var insertTypeOption = function insertTypeOption(args) {
  return (/('?[-\|])/.test(args) ? args.replace(/('?[-\|])/, '-type f $&') : args + ' -type f'
  );
};
var generateCommand = function generateCommand(args) {
  return 'find ' + insertTypeOption(args) + ' | xargs wc -l';
};

exports.default = function (args) {
  return new Promise(function (resolve, reject) {
    var _context;

    var process = (0, _child_process.exec)(generateCommand(args));
    var files = [];
    var interval = setInterval(function () {
      return console.log('checked ' + files.length + ' files');
    }, 3000);
    process.stderr.on('data', (_context = console).error.bind(_context));
    process.stdout.on('data', function (input) {
      return files.push.apply(files, _toConsumableArray(input.split('\n').filter(function (v) {
        return v;
      }).map(function (l) {
        return l.match(/^ *(\d+) +(.+)$/);
      }).filter(function (v) {
        return v;
      }).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3);

        var val = _ref4[1];
        var file = _ref4[2];
        return [parseInt(val, 10), file];
      }).filter(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2);

        var filename = _ref6[1];
        return filename !== 'total';
      })));
    });
    process.on('close', function (exit) {
      clearInterval(interval);
      if (exit) reject(exit);
      files.sort(function (_ref7, _ref8) {
        var _ref10 = _slicedToArray(_ref7, 1);

        var v0 = _ref10[0];

        var _ref9 = _slicedToArray(_ref8, 1);

        var v1 = _ref9[0];
        return v0 - v1;
      });
      if (!files.length) reject('No files matched `' + generateCommand(args) + '`');else {
        resolve({
          numFiles: files.length,
          numLines: sum(files),
          avgLines: files[i80(files)][0],
          linesIneqaulity: sum(files.slice(i80(files))) / sum(files),
          largestFileName: files.slice(-1)[0][1],
          largestFile: files.slice(-1)[0][0] });
      }
    });
  });
};