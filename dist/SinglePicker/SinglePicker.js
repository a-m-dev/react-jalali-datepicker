"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MonthComponent = _interopRequireDefault(require("../MonthComponent"));

var _SinglePickerContext = _interopRequireDefault(require("./SinglePickerContext"));

var _SinglePickerManager2 = _interopRequireDefault(require("./SinglePickerManager"));

require("./styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SinglePicker = function SinglePicker(props) {
  var _SinglePickerManager = (0, _SinglePickerManager2.default)(props),
      data = _SinglePickerManager.data,
      actions = _SinglePickerManager.actions,
      _SinglePickerManager$ = _SinglePickerManager.actions,
      handleNavigateMonth = _SinglePickerManager$.handleNavigateMonth,
      onSelectDate = _SinglePickerManager$.onSelectDate,
      _SinglePickerManager$2 = _SinglePickerManager.data,
      visibleDatesRange = _SinglePickerManager$2.visibleDatesRange,
      isJalaali = _SinglePickerManager$2.isJalaali,
      selectedDay = _SinglePickerManager$2.selectedDay,
      shouldDisableBeforeToday = _SinglePickerManager$2.shouldDisableBeforeToday,
      shouldDisableAfterToday = _SinglePickerManager$2.shouldDisableAfterToday,
      _SinglePickerManager$3 = _SinglePickerManager$2.computedSelectedRange,
      computedSelectedRange = _SinglePickerManager$3 === void 0 ? {
    computedSelectedRange: computedSelectedRange
  } : _SinglePickerManager$3,
      disabledBeforeDate = _SinglePickerManager$2.disabledBeforeDate,
      disabledAfterDate = _SinglePickerManager$2.disabledAfterDate,
      isDateIncludeDisableBound = _SinglePickerManager$2.isDateIncludeDisableBound;

  return /*#__PURE__*/_react.default.createElement(_SinglePickerContext.default.Provider, {
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
      componentType: "SINGLE_PICKER",
      days: days,
      monthId: monthId,
      isJalaali: isJalaali,
      selectedRange: {
        startDate: selectedDay,
        stopDate: selectedDay
      },
      computedSelectedRange: computedSelectedRange,
      onSelectDate: onSelectDate,
      shouldDisableBeforeToday: shouldDisableBeforeToday,
      shouldDisableAfterToday: shouldDisableAfterToday,
      disabledBeforeDate: disabledBeforeDate,
      disabledAfterDate: disabledAfterDate,
      isDateIncludeDisableBound: isDateIncludeDisableBound
    }));
  }))));
};

SinglePicker.defaultProps = {
  numberOfMonths: 1,
  isJalaali: false,
  shouldDisableBeforeToday: false,
  shouldDisableAfterToday: false,
  onChangeDate: function onChangeDate() {
    return null;
  },
  disabledBeforeDate: null,
  disabledAfterDate: null,
  defaultSelectedDay: null,
  isDateIncludeDisableBound: false
};
SinglePicker.propTypes = {
  numberOfMonths: _propTypes.default.number,
  isJalaali: _propTypes.default.bool,
  shouldDisableBeforeToday: _propTypes.default.bool,
  shouldDisableAfterToday: _propTypes.default.bool,
  onChangeDate: _propTypes.default.func,
  disabledBeforeDate: _propTypes.default.string,
  disabledAfterDate: _propTypes.default.string,
  defaultSelectedDay: _propTypes.default.string,
  isDateIncludeDisableBound: _propTypes.default.bool
};
var _default = SinglePicker;
exports.default = _default;