"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MonthComponent = _interopRequireDefault(require("../MonthComponent"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _RangePickerContext = _interopRequireDefault(require("./RangePickerContext"));

var _RangePickerManager2 = _interopRequireDefault(require("./RangePickerManager"));

require("./styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RangePicker = function RangePicker(props) {
  var _RangePickerManager = (0, _RangePickerManager2.default)(props),
      data = _RangePickerManager.data,
      actions = _RangePickerManager.actions,
      _RangePickerManager$a = _RangePickerManager.actions,
      handleNavigateMonth = _RangePickerManager$a.handleNavigateMonth,
      onSelectDate = _RangePickerManager$a.onSelectDate,
      handleExcludeMode = _RangePickerManager$a.handleExcludeMode,
      _RangePickerManager$d = _RangePickerManager.data,
      visibleDatesRange = _RangePickerManager$d.visibleDatesRange,
      isJalaali = _RangePickerManager$d.isJalaali,
      selectedRange = _RangePickerManager$d.selectedRange,
      shouldShowExcludeMode = _RangePickerManager$d.shouldShowExcludeMode,
      ExcludeModeComponent = _RangePickerManager$d.ExcludeModeComponent,
      excludeModeComponentProps = _RangePickerManager$d.excludeModeComponentProps,
      isExcludedMode = _RangePickerManager$d.isExcludedMode,
      isExclutionEnabled = _RangePickerManager$d.isExclutionEnabled,
      excludedDates = _RangePickerManager$d.excludedDates,
      shouldDisableBeforeToday = _RangePickerManager$d.shouldDisableBeforeToday;

  return _react.default.createElement(_RangePickerContext.default.Provider, {
    value: {
      data: data,
      actions: actions
    }
  }, _react.default.createElement("article", {
    className: "range-picker range-picker--".concat(isJalaali ? "jalaali" : "georgian")
  }, _react.default.createElement("section", {
    className: "range-picker range-picker__navigators"
  }, _react.default.createElement("div", {
    className: "range-picker__navigator",
    onClick: handleNavigateMonth,
    "data-name": "".concat(isJalaali ? "PREV" : "NEXT")
  }, _react.default.createElement("span", null, "\u2039")), _react.default.createElement("div", {
    className: "range-picker__navigator",
    onClick: handleNavigateMonth,
    "data-name": "".concat(isJalaali ? "NEXT" : "PREV")
  }, _react.default.createElement("span", null, "\u203A"))), _react.default.createElement("section", {
    className: "range-picker range-picker__container"
  }, !!visibleDatesRange && Object.entries(visibleDatesRange).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        monthId = _ref2[0],
        days = _ref2[1];

    return _react.default.createElement(_react.default.Fragment, {
      key: monthId
    }, _react.default.createElement(_MonthComponent.default, {
      days: days,
      monthId: monthId,
      isJalaali: isJalaali,
      selectedRange: selectedRange,
      isExcludedMode: isExcludedMode,
      excludedDates: excludedDates,
      onSelectDate: onSelectDate,
      shouldDisableBeforeToday: shouldDisableBeforeToday
    }));
  })), shouldShowExcludeMode && _react.default.createElement(ExcludeModeComponent, _extends({}, excludeModeComponentProps, {
    onChange: handleExcludeMode,
    checked: isExcludedMode,
    disabled: isExclutionEnabled
  }))));
};

RangePicker.defaultProps = {
  numberOfMonths: 1,
  isJalaali: false,
  shouldShowExcludeMode: false,
  excludeModeComponent: _Checkbox.default,
  shouldDisableBeforeToday: true,
  onExclude: function onExclude() {
    return null;
  },
  onChangeRange: function onChangeRange() {
    return null;
  }
};
RangePicker.propTypes = {
  numberOfMonths: _propTypes.default.number,
  isJalaali: _propTypes.default.bool,
  shouldShowExcludeMode: _propTypes.default.bool,
  excludeModeComponent: _propTypes.default.any,
  shouldDisableBeforeToday: _propTypes.default.bool,
  onExclude: _propTypes.default.func,
  onChangeRange: _propTypes.default.func
};
var _default = RangePicker;
exports.default = _default;