"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DayComponent = function DayComponent(_ref) {
  var componentType = _ref.componentType,
      day = _ref.day,
      monthId = _ref.monthId,
      isJalaali = _ref.isJalaali,
      selectedRange = _ref.selectedRange,
      isExcludedMode = _ref.isExcludedMode,
      isDayExcluded = _ref.isDayExcluded,
      onSelectDate = _ref.onSelectDate,
      shouldDisableBeforeToday = _ref.shouldDisableBeforeToday,
      shouldDisableAfterToday = _ref.shouldDisableAfterToday,
      disabledBeforeDate = _ref.disabledBeforeDate,
      disabledAfterDate = _ref.disabledAfterDate,
      isDateIncludeDisableBound = _ref.isDateIncludeDisableBound;
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
  var disabledBeforeDate_unix;
  var disabledAfterDate_unix;

  var _monthId$split$map = monthId.split("__").map(function (el) {
    return Number(el);
  }),
      _monthId$split$map2 = _slicedToArray(_monthId$split$map, 2),
      year = _monthId$split$map2[0],
      month = _monthId$split$map2[1];

  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTodayTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  var today = isJalaali ? (0, _momentJalaali.default)(localISOTodayTime, GEORGIAN_DATE_FORMAT).format(JALAALI_DATE_FORMAT) : localISOTodayTime;
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
  if (disabledBeforeDate) disabledBeforeDate_unix = (0, _getDateUnix.default)({
    date: disabledBeforeDate,
    isJalaali: isJalaali
  });
  if (disabledAfterDate) disabledAfterDate_unix = (0, _getDateUnix.default)({
    date: disabledAfterDate,
    isJalaali: isJalaali
  });
  var handleDaySelect = (0, _react.useCallback)(function (e) {
    if (day === null) return;
    if (isDisabledBeforeToday()) return;
    if (isDisabledAfterToday()) return;
    if (isDisabledBeforeDate()) return;
    if (isDisabledAfterDate()) return;

    var _monthId$split$map3 = monthId.split("__").map(function (el) {
      return Number(el);
    }),
        _monthId$split$map4 = _slicedToArray(_monthId$split$map3, 2),
        year = _monthId$split$map4[0],
        month = _monthId$split$map4[1];

    onSelectDate({
      e: e,
      year: year,
      month: month,
      day: day
    });
  }, [disabledBeforeDate, disabledAfterDate, onSelectDate]);

  var isDisabledBeforeToday = function isDisabledBeforeToday() {
    return shouldDisableBeforeToday && crrentDate_unix < today_unix;
  };

  var isDisabledAfterToday = function isDisabledAfterToday() {
    return shouldDisableAfterToday && crrentDate_unix > today_unix;
  };

  var isDisabledBeforeDate = function isDisabledBeforeDate() {
    if (!disabledBeforeDate) {
      return null;
    }

    if (isDateIncludeDisableBound) {
      return crrentDate_unix <= disabledBeforeDate_unix;
    }

    return crrentDate_unix < disabledBeforeDate_unix;
  };

  var isDisabledAfterDate = function isDisabledAfterDate() {
    if (!disabledAfterDate) {
      return null;
    }

    if (isDateIncludeDisableBound) {
      return crrentDate_unix >= disabledAfterDate_unix;
    }

    return crrentDate_unix > disabledAfterDate_unix;
  };
  /**
   * generate class name for day
   */


  var generateClassName = function generateClassName(day) {
    var baseClassName = "range-picker__day";
    if (!day) return baseClassName;
    var className = baseClassName;
    if (crrentDate_unix === today_unix) className += " ".concat(baseClassName, "--today");
    if (crrentDate_unix === today_unix) className += " ".concat(baseClassName, "--today");
    if (isDayExcluded) className += " ".concat(baseClassName, "--excluded");
    if (crrentDate_unix === startDate_unix) className += " ".concat(baseClassName, "--start-date-selected");
    if (crrentDate_unix === stopDate_unix) className += " ".concat(baseClassName, "--stop-date-selected");
    if (crrentDate_unix > startDate_unix && crrentDate_unix < stopDate_unix) className += " ".concat(baseClassName, "--in-selected-range");
    if (isDisabledBeforeToday()) className += " ".concat(baseClassName, "--before-today");
    if (isDisabledAfterToday()) className += " ".concat(baseClassName, "--after-today");
    if (isDisabledBeforeDate() || isDisabledAfterDate()) className += " ".concat(baseClassName, "--disabled");
    if (isExcludedMode && (crrentDate_unix < startDate_unix || crrentDate_unix > stopDate_unix)) return className += " ".concat(baseClassName, "--out-of-range");
    return className;
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: generateClassName(day),
    onClick: handleDaySelect
  }, day);
};

var _default = DayComponent;
exports.default = _default;