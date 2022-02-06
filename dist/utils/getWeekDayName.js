"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _Constants = require("../Constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWeekDayName = function getWeekDayName(_ref) {
  var date = _ref.date,
      isJalaali = _ref.isJalaali;
  var JALAALI_DATE_FORMAT = _Constants.DATE_FORMATS.JALAALI_DATE_FORMAT,
      GEORGIAN_DATE_FORMAT = _Constants.DATE_FORMATS.GEORGIAN_DATE_FORMAT;
  var dayName = isJalaali ? (0, _momentJalaali.default)(date, JALAALI_DATE_FORMAT).format("dddd") : (0, _momentJalaali.default)(date, GEORGIAN_DATE_FORMAT).format("dddd");
  return dayName;
};

var _default = getWeekDayName;
exports.default = _default;