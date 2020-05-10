"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertToGeorgian = function convertToGeorgian(date) {
  if (!date instanceof _momentJalaali.default) return;
  var GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT,
      JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT;
  var resultDate = (0, _momentJalaali.default)(date, JALAALI_DATE_FORMAT).format(GEORGIAN_DATE_FORMAT);
  return resultDate;
};

var _default = convertToGeorgian;
exports.default = _default;