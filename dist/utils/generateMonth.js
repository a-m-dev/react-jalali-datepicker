"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getJalaaliDaysInMonth = _interopRequireDefault(require("./getJalaaliDaysInMonth"));

var _getGeorgianDaysInMonth = _interopRequireDefault(require("./getGeorgianDaysInMonth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Object} Obj.numberOfMonths - the spectrum of monthes that you want to involve
 * @param {Object} Obj.isJalaali - should be in jalaali format or not
 * @param {Object} Obj.indexDate - the start date of calculations
 * @returns {[String]} - array of days in that month
 */
var generateMonth = function generateMonth(_ref) {
  var numberOfMonths = _ref.numberOfMonths,
      _ref$isJalaali = _ref.isJalaali,
      isJalaali = _ref$isJalaali === void 0 ? false : _ref$isJalaali,
      _ref$indexDate = _ref.indexDate,
      indexDate = _ref$indexDate === void 0 ? new Date() : _ref$indexDate;
  if (!numberOfMonths instanceof Number) return [];
  return isJalaali ? (0, _getJalaaliDaysInMonth.default)(indexDate, numberOfMonths) : (0, _getGeorgianDaysInMonth.default)(indexDate, numberOfMonths);
};

var _default = generateMonth;
exports.default = _default;