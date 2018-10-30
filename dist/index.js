'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function greet(name) {
  return 'Hi ' + name + ', it\'s ' + (0, _moment2.default)().format('YYYY/MM/DD HH:mm:ss') + '!';
}

exports.default = greet;