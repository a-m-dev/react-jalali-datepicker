"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _DayNames = _interopRequireDefault(require("../Constants/DayNames"));

var _MonthNames = _interopRequireDefault(require("../Constants/MonthNames"));

var _refineDaysForRendering = _interopRequireDefault(require("../utils/refineDaysForRendering"));

var _DayComponent = _interopRequireDefault(require("../DayComponent"));

require("./styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var MonthComponent = function MonthComponent(_ref) {
  var componentType = _ref.componentType,
      days = _ref.days,
      monthId = _ref.monthId,
      _ref$isJalaali = _ref.isJalaali,
      isJalaali = _ref$isJalaali === void 0 ? false : _ref$isJalaali,
      onSelectDate = _ref.onSelectDate,
      selectedRange = _ref.selectedRange,
      isExcludedMode = _ref.isExcludedMode,
      computedSelectedRange = _ref.computedSelectedRange,
      shouldDisableBeforeToday = _ref.shouldDisableBeforeToday,
      shouldDisableAfterToday = _ref.shouldDisableAfterToday,
      disabledBeforeDate = _ref.disabledBeforeDate,
      disabledAfterDate = _ref.disabledAfterDate,
      isDateIncludeDisableBound = _ref.isDateIncludeDisableBound;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      refinedDays = _useState2[0],
      setRefinedDays = _useState2[1];

  var _monthId$split$map = monthId.split("__").map(function (el) {
    return Number(el);
  }),
      _monthId$split$map2 = _slicedToArray(_monthId$split$map, 2),
      year = _monthId$split$map2[0],
      month = _monthId$split$map2[1];

  (0, _react.useEffect)(function () {
    setRefinedDays((0, _refineDaysForRendering.default)(monthId, days, isJalaali));
  }, []);
  return /*#__PURE__*/_react.default.createElement("article", {
    className: "range-picker__month"
  }, /*#__PURE__*/_react.default.createElement("section", {
    className: "range-picker__month-heading"
  }, /*#__PURE__*/_react.default.createElement("h3", null, isJalaali ? "".concat(_MonthNames.default.get(month)[1], " ").concat(year) : "".concat(_MonthNames.default.get(month)[0], ", ").concat(year))), /*#__PURE__*/_react.default.createElement("section", {
    className: "range-picker__month-weekdays"
  }, _toConsumableArray(_DayNames.default.keys()).map(function (dayIndex) {
    return /*#__PURE__*/_react.default.createElement("span", {
      key: dayIndex
    }, isJalaali ? _DayNames.default.get(dayIndex)[1].charAt(0) : _DayNames.default.get(dayIndex)[0].slice(0, 3));
  })), /*#__PURE__*/_react.default.createElement("section", {
    className: "range-picker__month-days"
  }, refinedDays.length > 0 && refinedDays.map(function (day, index) {
    var isDayExcluded = false;
    if (computedSelectedRange["".concat(year, "-").concat(month, "-").concat(day)] && !computedSelectedRange["".concat(year, "-").concat(month, "-").concat(day)]["isIncluded"]) isDayExcluded = true;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: index
    }, /*#__PURE__*/_react.default.createElement(_DayComponent.default, {
      componentType: componentType,
      day: day,
      monthId: monthId,
      isJalaali: isJalaali,
      onSelectDate: onSelectDate,
      isExcludedMode: isExcludedMode,
      isDayExcluded: isDayExcluded,
      selectedRange: selectedRange,
      shouldDisableBeforeToday: shouldDisableBeforeToday,
      shouldDisableAfterToday: shouldDisableAfterToday,
      disabledBeforeDate: disabledBeforeDate,
      disabledAfterDate: disabledAfterDate,
      isDateIncludeDisableBound: isDateIncludeDisableBound
    }));
  })));
};

var _default = MonthComponent;
exports.default = _default;