"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _Constants = require("../Constants");

var _computeGeorgianDaysInRange = _interopRequireDefault(require("./computeGeorgianDaysInRange"));

var _computeJalaaliDaysInRange = _interopRequireDefault(require("./computeJalaaliDaysInRange"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var computeDaysInRange = function computeDaysInRange(_ref) {
  var startDate = _ref.startDate,
      stopDate = _ref.stopDate,
      isJalaali = _ref.isJalaali,
      _ref$defaultExcludedD = _ref.defaultExcludedDays,
      defaultExcludedDays = _ref$defaultExcludedD === void 0 ? [] : _ref$defaultExcludedD;
  if (startDate == null || stopDate == null) return;
  var JALAALI_DATE_FORMAT = _Constants.DATE_FORMATS.JALAALI_DATE_FORMAT,
      GEORGIAN_DATE_FORMAT = _Constants.DATE_FORMATS.GEORGIAN_DATE_FORMAT;

  var _startDate$split$map = startDate.split("-").map(function (el) {
    return Number(el);
  }),
      _startDate$split$map2 = _slicedToArray(_startDate$split$map, 3),
      startYear = _startDate$split$map2[0],
      startMonth = _startDate$split$map2[1],
      startDay = _startDate$split$map2[2];

  var _stopDate$split$map = stopDate.split("-").map(function (el) {
    return Number(el);
  }),
      _stopDate$split$map2 = _slicedToArray(_stopDate$split$map, 3),
      stopYear = _stopDate$split$map2[0],
      stopMonth = _stopDate$split$map2[1],
      stopDay = _stopDate$split$map2[2];

  var _startDate = isJalaali ? (0, _momentJalaali.default)("".concat(startYear, "-").concat(startMonth, "-").concat(startDay), JALAALI_DATE_FORMAT) : (0, _momentJalaali.default)("".concat(startYear, "-").concat(startMonth, "-").concat(startDay), GEORGIAN_DATE_FORMAT);

  var _stopDate = isJalaali ? (0, _momentJalaali.default)("".concat(stopYear, "-").concat(stopMonth, "-").concat(stopDay), JALAALI_DATE_FORMAT) : (0, _momentJalaali.default)("".concat(stopYear, "-").concat(stopMonth, "-").concat(stopDay), GEORGIAN_DATE_FORMAT);

  return isJalaali ? (0, _computeJalaaliDaysInRange.default)({
    _startDate: _startDate,
    _stopDate: _stopDate,
    defaultExcludedDays: defaultExcludedDays
  }) : (0, _computeGeorgianDaysInRange.default)({
    _startDate: _startDate,
    _stopDate: _stopDate,
    defaultExcludedDays: defaultExcludedDays
  });
};

var _default = computeDaysInRange;
exports.default = _default;