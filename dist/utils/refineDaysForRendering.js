"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

var _WeedayIndex = _interopRequireDefault(require("../Constants/WeedayIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
  return [].concat(_toConsumableArray(new Array(_WeedayIndex.default.get(firstDayBegansAt)).fill(null)), _toConsumableArray(days), _toConsumableArray(new Array(_WeedayIndex.default.size - _WeedayIndex.default.get(lastDayEndsAt) - 1).fill(null)));
};

var _default = refineDaysForRendering;
exports.default = _default;