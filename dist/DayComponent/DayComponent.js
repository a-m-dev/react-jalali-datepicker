"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

var _getDateUnix = _interopRequireDefault(require("../utils/getDateUnix"));

require("./styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DayComponent = function DayComponent(_ref) {
  var day = _ref.day,
      monthId = _ref.monthId,
      isJalaali = _ref.isJalaali,
      selectedRange = _ref.selectedRange,
      isDayExcluded = _ref.isDayExcluded,
      onSelectDate = _ref.onSelectDate;
  var handleDaySelect = (0, _react.useCallback)(function (e) {
    var _monthId$split$map = monthId.split("__").map(function (el) {
      return Number(el);
    }),
        _monthId$split$map2 = _slicedToArray(_monthId$split$map, 2),
        year = _monthId$split$map2[0],
        month = _monthId$split$map2[1];

    onSelectDate({
      e: e,
      year: year,
      month: month,
      day: day
    });
  }, [onSelectDate]);
  /**
   * generate class name for day
   */

  var generateClassName = function generateClassName(day) {
    var baseClassName = "range-picker__day";
    if (!day) return baseClassName;
    var className = baseClassName;
    var _selectedRange$startD = selectedRange.startDate,
        startDate = _selectedRange$startD === void 0 ? "" : _selectedRange$startD,
        _selectedRange$stopDa = selectedRange.stopDate,
        stopDate = _selectedRange$stopDa === void 0 ? "" : _selectedRange$stopDa;
    var JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT,
        GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT;
    var today_unix;
    var crrentDate_unix;
    var startDate_unix;
    var stopDate_unix;

    var _monthId$split$map3 = monthId.split("__").map(function (el) {
      return Number(el);
    }),
        _monthId$split$map4 = _slicedToArray(_monthId$split$map3, 2),
        year = _monthId$split$map4[0],
        month = _monthId$split$map4[1];

    var today = isJalaali ? (0, _momentJalaali.default)(new Date().toISOString(), GEORGIAN_DATE_FORMAT).format(JALAALI_DATE_FORMAT) : new Date().toISOString();
    var currentDate = "".concat(year, "-").concat(month, "-").concat(day);
    today_unix = (0, _getDateUnix.default)({
      date: today.slice(0, 10),
      isJalaali: isJalaali
    });
    crrentDate_unix = (0, _getDateUnix.default)({
      date: currentDate,
      isJalaali: isJalaali
    });
    if (startDate) startDate_unix = (0, _getDateUnix.default)({
      date: startDate,
      isJalaali: isJalaali
    });
    if (stopDate) stopDate_unix = (0, _getDateUnix.default)({
      date: stopDate,
      isJalaali: isJalaali
    });
    if (crrentDate_unix === today_unix) className += " ".concat(baseClassName, "--today");
    if (isDayExcluded) className += " ".concat(baseClassName, "--excluded");
    if (crrentDate_unix === startDate_unix) className += " ".concat(baseClassName, "--start-date-selected");
    if (crrentDate_unix === stopDate_unix) className += " ".concat(baseClassName, "--stop-date-selected");
    if (crrentDate_unix > startDate_unix && crrentDate_unix < stopDate_unix) className += " ".concat(baseClassName, "--in-selected-range");
    return className;
  };

  return _react.default.createElement("div", {
    className: generateClassName(day),
    onClick: handleDaySelect
  }, day);
};

var _default = DayComponent;
exports.default = _default;