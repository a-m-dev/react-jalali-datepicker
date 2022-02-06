"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUnixOfDate = function getUnixOfDate(_ref) {
  var unix = _ref.unix,
      isJalaali = _ref.isJalaali;
  var JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT,
      GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT;
  return isJalaali ? _momentJalaali.default.unix(unix).format(JALAALI_DATE_FORMAT) : _momentJalaali.default.unix(unix).format(GEORGIAN_DATE_FORMAT);
};

var _default = getUnixOfDate;
exports.default = _default;