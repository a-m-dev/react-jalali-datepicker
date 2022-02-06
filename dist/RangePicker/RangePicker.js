"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MonthComponent = _interopRequireDefault(require("../MonthComponent"));

var _RangePickerContext = _interopRequireDefault(require("./RangePickerContext"));

var _RangePickerManager2 = _interopRequireDefault(require("./RangePickerManager"));

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

var RangePicker = function RangePicker(props) {
  var _RangePickerManager = (0, _RangePickerManager2.default)(props),
      data = _RangePickerManager.data,
      actions = _RangePickerManager.actions,
      _RangePickerManager$a = _RangePickerManager.actions,
      handleNavigateMonth = _RangePickerManager$a.handleNavigateMonth,
      onSelectDate = _RangePickerManager$a.onSelectDate,
      _RangePickerManager$d = _RangePickerManager.data,
      visibleDatesRange = _RangePickerManager$d.visibleDatesRange,
      isJalaali = _RangePickerManager$d.isJalaali,
      selectedRange = _RangePickerManager$d.selectedRange,
      isExcludedMode = _RangePickerManager$d.isExcludedMode,
      shouldDisableBeforeToday = _RangePickerManager$d.shouldDisableBeforeToday,
      _RangePickerManager$d2 = _RangePickerManager$d.computedSelectedRange,
      computedSelectedRange = _RangePickerManager$d2 === void 0 ? {
    computedSelectedRange: computedSelectedRange
  } : _RangePickerManager$d2;

  return /*#__PURE__*/_react.default.createElement(_RangePickerContext.default.Provider, {
    value: {
      data: data,
      actions: actions
    }
  }, /*#__PURE__*/_react.default.createElement("article", {
    className: "range-picker range-picker--".concat(isJalaali ? "jalaali" : "georgian")
  }, /*#__PURE__*/_react.default.createElement("section", {
    className: "range-picker range-picker__navigators"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "range-picker__navigator",
    onClick: handleNavigateMonth,
    "data-name": "".concat(isJalaali ? "PREV" : "NEXT")
  }, /*#__PURE__*/_react.default.createElement("span", null, "\u2039")), /*#__PURE__*/_react.default.createElement("div", {
    className: "range-picker__navigator",
    onClick: handleNavigateMonth,
    "data-name": "".concat(isJalaali ? "NEXT" : "PREV")
  }, /*#__PURE__*/_react.default.createElement("span", null, "\u203A"))), /*#__PURE__*/_react.default.createElement("section", {
    className: "range-picker range-picker__container"
  }, !!visibleDatesRange && Object.entries(visibleDatesRange).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        monthId = _ref2[0],
        days = _ref2[1];

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: monthId
    }, /*#__PURE__*/_react.default.createElement(_MonthComponent.default, {
      days: days,
      monthId: monthId,
      isJalaali: isJalaali,
      selectedRange: selectedRange,
      isExcludedMode: isExcludedMode,
      computedSelectedRange: computedSelectedRange,
      onSelectDate: onSelectDate,
      shouldDisableBeforeToday: shouldDisableBeforeToday
    }));
  }))));
};

RangePicker.defaultProps = {
  numberOfMonths: 1,
  isJalaali: false,
  shouldDisableBeforeToday: true,
  onExclude: function onExclude() {
    return null;
  },
  onChangeRange: function onChangeRange() {
    return null;
  },
  onExcludeStatusChange: function onExcludeStatusChange() {
    return null;
  },
  appendExcludeWeekDays: [],
  defaultSelectedRange: {
    startDate: null,
    stopDate: null
  }
};
RangePicker.propTypes = {
  numberOfMonths: _propTypes.default.number,
  isJalaali: _propTypes.default.bool,
  shouldDisableBeforeToday: _propTypes.default.bool,
  onExclude: _propTypes.default.func,
  onChangeRange: _propTypes.default.func,
  onExcludeStatusChange: _propTypes.default.func,
  appendExcludeWeekDays: _propTypes.default.arrayOf(_propTypes.default.string),
  defaultSelectedRange: _propTypes.default.shape({
    startDate: _propTypes.default.string,
    stopDate: _propTypes.default.string
  })
};
var _default = RangePicker;
exports.default = _default;