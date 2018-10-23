'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// module.exports = (name) => {
//   return `Hi hi, ${name}!`;
// }
var GREET_TYPES = {
  GREET1: 'Hello',
  GREET2: 'Hi'
};

function greet(name) {
  var key = _lodash2.default.findKey(GREET_TYPES, function (item) {
    return item === 'Hi';
  });

  return GREET_TYPES[key] + ' ' + name + ', it\'s ' + (0, _moment2.default)().format('YYYY/MM/DD HH:mm:ss') + '!';
}

exports.default = greet;