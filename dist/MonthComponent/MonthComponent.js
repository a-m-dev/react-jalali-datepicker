"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _DayNames = _interopRequireDefault(require("../Constants/DayNames"));

var _MonthNames = _interopRequireDefault(require("../Constants/MonthNames"));

var _refineDaysForRendering = _interopRequireDefault(require("../utils/refineDaysForRendering"));

var _DayComponent = _interopRequireDefault(require("../DayComponent"));

var _getDateUnix = _interopRequireDefault(require("../utils/getDateUnix"));

require("./styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MonthComponent = function MonthComponent(_ref) {
  var days = _ref.days,
      monthId = _ref.monthId,
      _ref$isJalaali = _ref.isJalaali,
      isJalaali = _ref$isJalaali === void 0 ? false : _ref$isJalaali,
      onSelectDate = _ref.onSelectDate,
      selectedRange = _ref.selectedRange,
      isExcludedMode = _ref.isExcludedMode,
      excludedDates = _ref.excludedDates,
      shouldDisableBeforeToday = _ref.shouldDisableBeforeToday;

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
  return _react.default.createElement("article", {
    className: "range-picker__month"
  }, _react.default.createElement("section", {
    className: "range-picker__month-heading"
  }, _react.default.createElement("h3", null, isJalaali ? "".concat(_MonthNames.default.get(month)[1], " ").concat(year) : "".concat(_MonthNames.default.get(month)[0], ", ").concat(year))), _react.default.createElement("section", {
    className: "range-picker__month-weekdays"
  }, _toConsumableArray(_DayNames.default.keys()).map(function (dayIndex) {
    return _react.default.createElement("span", {
      key: dayIndex
    }, isJalaali ? _DayNames.default.get(dayIndex)[1].charAt(0) : _DayNames.default.get(dayIndex)[0].slice(0, 3));
  })), _react.default.createElement("section", {
    className: "range-picker__month-days"
  }, refinedDays.length > 0 && refinedDays.map(function (day, index) {
    var isDayExcluded = false;

    if (day) {
      var _monthId$split = monthId.split("__"),
          _monthId$split2 = _slicedToArray(_monthId$split, 2),
          _year = _monthId$split2[0],
          _month = _monthId$split2[1];

      var foundIndex = excludedDates.findIndex(function (item) {
        return (0, _getDateUnix.default)({
          date: item,
          isJalaali: isJalaali
        }) === (0, _getDateUnix.default)({
          date: "".concat(_year, "-").concat(_month, "-").concat(day),
          isJalaali: isJalaali
        });
      });
      if (foundIndex !== -1) isDayExcluded = true;
    }

    return _react.default.createElement(_react.default.Fragment, {
      key: index
    }, _react.default.createElement(_DayComponent.default, {
      day: day,
      monthId: monthId,
      isJalaali: isJalaali,
      onSelectDate: onSelectDate,
      isExcludedMode: isExcludedMode,
      isDayExcluded: isDayExcluded,
      selectedRange: selectedRange,
      shouldDisableBeforeToday: shouldDisableBeforeToday
    }));
  })));
};

var _default = MonthComponent;
exports.default = _default;