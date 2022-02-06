"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

var _WeedayIndex = _interopRequireDefault(require("../Constants/WeedayIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var refineDaysForRendering = function refineDaysForRendering(monthId, days, isJalaali) {
  // get desired format
  var JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT,
      GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT;

  var _monthId$split = monthId.split("__"),
      _monthId$split2 = _slicedToArray(_monthId$split, 2),
      year = _monthId$split2[0],
      month = _monthId$split2[1];

  var firstDayBegansAt;
  var lastDayEndsAt;
  var firstDayOfMonth = (0, _momentJalaali.default)("".concat(year, "-").concat(month, "-").concat(days[0]), isJalaali ? JALAALI_DATE_FORMAT : GEORGIAN_DATE_FORMAT);
  var lastDayOfMonth = (0, _momentJalaali.default)("".concat(year, "-").concat(month, "-").concat(days[days.length - 1]), isJalaali ? JALAALI_DATE_FORMAT : GEORGIAN_DATE_FORMAT);
  firstDayBegansAt = firstDayOfMonth.format("dddd");
  lastDayEndsAt = lastDayOfMonth.format("dddd");
  var preEmptyDays = new Array(_WeedayIndex.default.get(firstDayBegansAt)).fill(null);
  var postEmptyDays = lastDayEndsAt === "Friday" ? [] : new Array(_WeedayIndex.default.size / 2 - _WeedayIndex.default.get(lastDayEndsAt) - 1).fill(null); // console.log({
  //   lastDayEndsAt,
  //   preEmptyDays,
  //   postEmptyDays,
  //   WeekdayIndex,
  //   WeekdayIndexx: WeekdayIndex.get(lastDayEndsAt) - 1,
  //   // _____ARRAY_____: [...preEmptyDays, ...days, ...postEmptyDays],
  // });

  return [].concat(_toConsumableArray(preEmptyDays), _toConsumableArray(days), _toConsumableArray(postEmptyDays));
};

var _default = refineDaysForRendering;
exports.default = _default;