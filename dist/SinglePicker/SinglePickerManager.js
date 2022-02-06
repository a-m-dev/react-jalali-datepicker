"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _Constants = require("../Constants");

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var isWindow = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";

var SinglePickerManager = function SinglePickerManager(props) {
  /**
   *
   * props Values
   */
  var isJalaali = props.isJalaali,
      numberOfMonths = props.numberOfMonths,
      shouldDisableBeforeToday = props.shouldDisableBeforeToday,
      shouldDisableAfterToday = props.shouldDisableAfterToday,
      onChangeDate = props.onChangeDate,
      defaultSelectedDay = props.defaultSelectedDay,
      disabledBeforeDate = props.disabledBeforeDate,
      disabledAfterDate = props.disabledAfterDate,
      isDateIncludeDisableBound = props.isDateIncludeDisableBound;
  var isInitiatedWithDefaults = !!defaultSelectedDay;
  /**
   *
   * local States
   */

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      visibleDatesRange = _useState2[0],
      setVisibleDatesRange = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedDay = _useState4[0],
      setSelectedDay = _useState4[1]; // DEFAULTS SETUP


  (0, _react.useEffect)(function () {
    if (isInitiatedWithDefaults) {
      setSelectedDay(defaultSelectedDay);
    }
  }, [isInitiatedWithDefaults]); // ------------------------------------------------

  (0, _react.useEffect)(function () {}, [selectedDay]);
  /**
   *
   * Event listeners
   * TODO:
   *  -
   */

  (0, _react.useEffect)(function () {
    if (isWindow) {
      window.addEventListener(_Constants.EVENTS.SINGLE_PICKER.CLEAR, onClearFunction);
      return function () {
        window.removeEventListener(_Constants.EVENTS.SINGLE_PICKER.CLEAR, onClearFunction);
      };
    }
  }, []);
  /**
   *
   * Effects
   */

  (0, _react.useEffect)(function () {
    var today = new Date();
    var datesRange = (0, _utils.generateMonth)({
      indexDate: today,
      numberOfMonths: numberOfMonths,
      isJalaali: isJalaali
    });
    setVisibleDatesRange(datesRange); // convert selectedDay and update it

    var _convertSelectedRange = convertSelectedRange(selectedDay),
        convertedStartDate = _convertSelectedRange.convertedStartDate;

    setSelectedDay(convertedStartDate); // AWARE OUTSIDE

    onChangeDate({
      date: convertedStartDate
    });
  }, [isJalaali]);
  /**
   * ON Number of month change
   */

  (0, _react.useEffect)(function () {
    var today = new Date();
    var datesRange = (0, _utils.generateMonth)({
      indexDate: today,
      numberOfMonths: numberOfMonths,
      isJalaali: isJalaali
    });
    setVisibleDatesRange(datesRange);
    setSelectedDay(selectedDay);
  }, [numberOfMonths]);
  /**
   *
   * handlers
   */

  var handleNavigateMonth = (0, _react.useCallback)(function (e) {
    var target = e.currentTarget.dataset.name;
    handlePrevAndNextMonth(target);
  }, [visibleDatesRange]);
  var onSelectDate = (0, _react.useCallback)(function () {
    updateSelectedRange.apply(void 0, arguments);
  }, [selectedDay]);
  var updateSelectedRange = (0, _react.useCallback)(function (_ref) {
    var e = _ref.e,
        year = _ref.year,
        month = _ref.month,
        day = _ref.day;
    var START_DATE = _Constants.RANGE_SELECT_TYPES.START_DATE;
    setSelectedDay("".concat(year, "-").concat(month, "-").concat(day)); // AWARE OUTSIDE

    onChangeDate({
      date: "".concat(year, "-").concat(month, "-").concat(day)
    });
  }, [selectedDay]);
  /**
   *
   * Custome Event Dispatche Functions
   */

  var onClearFunction = (0, _react.useCallback)(function () {
    setSelectedDay(null);
    onChangeDate({
      date: null
    });
  }, []);
  /**
   *
   * privateFuncs
   */

  var handlePrevAndNextMonth = function handlePrevAndNextMonth(type) {
    var monthId = Object.keys(visibleDatesRange)[0];
    var calculatedNextMonth = type === "NEXT" ? numberOfMonths : numberOfMonths * -1;
    var resultDate = (0, _utils.calcuateNextAndPrevMonth)({
      monthId: monthId,
      isJalaali: isJalaali,
      numberOfMonths: calculatedNextMonth
    });
    setVisibleDatesRange((0, _utils.generateMonth)({
      indexDate: new Date(resultDate),
      numberOfMonths: numberOfMonths,
      isJalaali: isJalaali
    }));
  };

  var convertSelectedRange = function convertSelectedRange(day) {
    var convertedStartDate = null;

    if (day) {
      convertedStartDate = (0, _utils.convertDate)({
        date: day,
        isJalaali: !isJalaali
      });
    }

    return {
      convertedStartDate: convertedStartDate
    };
  };
  /**
   *
   * return the result
   */


  return {
    data: {
      isJalaali: isJalaali,
      visibleDatesRange: visibleDatesRange,
      selectedDay: selectedDay,
      shouldDisableBeforeToday: shouldDisableBeforeToday,
      shouldDisableAfterToday: shouldDisableAfterToday,
      disabledBeforeDate: disabledBeforeDate,
      disabledAfterDate: disabledAfterDate,
      isDateIncludeDisableBound: isDateIncludeDisableBound
    },
    actions: {
      handleNavigateMonth: handleNavigateMonth,
      onSelectDate: onSelectDate
    }
  };
};

var _default = SinglePickerManager;
exports.default = _default;