"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertToJalaali = function convertToJalaali(date) {
  if (!date instanceof Date) return;
  var GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT,
      JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT;
  return (0, _momentJalaali.default)(date, GEORGIAN_DATE_FORMAT).format(JALAALI_DATE_FORMAT);
};

var _default = convertToJalaali;
exports.default = _default;