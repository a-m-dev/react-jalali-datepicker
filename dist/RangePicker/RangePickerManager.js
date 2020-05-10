"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

var _RangeSelectTypes = _interopRequireDefault(require("../Constants/RangeSelectTypes"));

var _generateMonth = _interopRequireDefault(require("../utils/generateMonth"));

var _getDateUnix = _interopRequireDefault(require("../utils/getDateUnix"));

var _calcuateNextAndPrevMonth = _interopRequireDefault(require("../utils/calcuateNextAndPrevMonth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RangePickerManager = function RangePickerManager(props) {
  // props Values
  var isJalaali = props.isJalaali,
      numberOfMonths = props.numberOfMonths,
      shouldShowExcludeMode = props.shouldShowExcludeMode,
      excludeModeComponent = props.excludeModeComponent,
      excludeModeComponentProps = props.excludeModeComponentProps,
      onExclude = props.onExclude; // local States

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      visibleDatesRange = _useState2[0],
      setVisibleDatesRange = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isExcludedMode = _useState4[0],
      setIsExcludedMode = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      isExclutionEnabled = _useState6[0],
      setIsExclutionEnabled = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      excludedDates = _useState8[0],
      setExcludedDates = _useState8[1];

  var _useState9 = (0, _react.useState)({
    startDate: null,
    stopDate: null
  }),
      _useState10 = _slicedToArray(_useState9, 2),
      selectedRange = _useState10[0],
      setSelectedRange = _useState10[1]; // Effects
  // initialize component with today


  (0, _react.useEffect)(function () {
    var today = new Date();
    var datesRange = (0, _generateMonth.default)({
      indexDate: today,
      numberOfMonths: numberOfMonths,
      isJalaali: isJalaali
    });
    setVisibleDatesRange(datesRange);
  }, []);
  (0, _react.useEffect)(function () {
    onExclude(excludedDates);
  }, [excludedDates]); // IMPORTANT
  // TODO:

  (0, _react.useEffect)(function () {// TODO:
    //  - call on Exclude with array of spesifica locale
    // onExclude()
  }, [isJalaali]); // handlers

  var handleNavigateMonth = (0, _react.useCallback)(function (e) {
    var target = e.currentTarget.dataset.name;
    handlePrevAndNextMonth(target);
  }, [visibleDatesRange]);
  var onSelectDate = (0, _react.useCallback)(function () {
    if (isExcludedMode && !isExclutionEnabled) {
      handleExcludeDays.apply(void 0, arguments);
    } else {
      updateSelectedRange.apply(void 0, arguments);
    }
  }, [selectedRange, setSelectedRange, isExcludedMode, setIsExcludedMode, isExclutionEnabled, setIsExclutionEnabled]);
  var updateSelectedRange = (0, _react.useCallback)(function (_ref) {
    var e = _ref.e,
        year = _ref.year,
        month = _ref.month,
        day = _ref.day;
    var START_DATE = _RangeSelectTypes.default.START_DATE,
        STOP_DATE = _RangeSelectTypes.default.STOP_DATE;
    var startDate = selectedRange.startDate,
        stopDate = selectedRange.stopDate;
    var targetDate = "".concat(year, "-").concat(month, "-").concat(day);
    var resultedStartDate = startDate;
    var resultedStopDate = stopDate;
    var type;

    if (startDate !== null && stopDate !== null) {
      type = START_DATE;
      resultedStartDate = targetDate;
      resultedStopDate = null;
    } else if (startDate !== null) {
      var selectedDate_unix = (0, _getDateUnix.default)({
        date: targetDate,
        isJalaali: isJalaali
      });
      var startDate_unix = (0, _getDateUnix.default)({
        date: startDate,
        isJalaali: isJalaali
      });

      if (selectedDate_unix < startDate_unix) {
        type = START_DATE;
        resultedStartDate = targetDate;
        resultedStopDate = null;
      } else {
        type = STOP_DATE; // start remains the same value, no need to change it

        resultedStopDate = targetDate;
      }
    } else if (startDate == null) {
      type = START_DATE;
      resultedStartDate = targetDate;
      resultedStopDate = null;
    } else if (startDate !== null && stopDate == null) {
      type = STOP_DATE; // start remain the same

      resultedStopDate = targetDate;
    } // check for exclusion mode


    if (type === STOP_DATE && resultedStopDate !== null) setIsExclutionEnabled(false);else if (type === START_DATE) {
      setIsExclutionEnabled(true);
      setIsExcludedMode(false);
      setExcludedDates([]);
    }
    setSelectedRange({
      startDate: resultedStartDate,
      stopDate: resultedStopDate
    });
  }, [selectedRange, setSelectedRange]);
  var handleExcludeDays = (0, _react.useCallback)(function (args) {
    var e = args.e,
        year = args.year,
        month = args.month,
        day = args.day;
    var startDate = selectedRange.startDate,
        stopDate = selectedRange.stopDate;
    var date = "".concat(year, "-").concat(month, "-").concat(day);
    var currentDateUnix = (0, _getDateUnix.default)({
      date: date,
      isJalaali: isJalaali
    });
    var startDateUnix = (0, _getDateUnix.default)({
      date: startDate,
      isJalaali: isJalaali
    });
    var stopDateUnix = (0, _getDateUnix.default)({
      date: stopDate,
      isJalaali: isJalaali
    });
    if (currentDateUnix <= startDateUnix || currentDateUnix >= stopDateUnix) return;
    setExcludedDates(function (excludedDates) {
      return [].concat(_toConsumableArray(excludedDates), ["".concat(year, "-").concat(month, "-").concat(day)]);
    });
  }, [selectedRange, excludedDates, setExcludedDates]);
  var handleExcludeMode = (0, _react.useCallback)(function (event) {
    if (!selectedRange.startDate && !selectedRange.stopDate) return;
    setIsExcludedMode(event.target.checked);
  }, [isExcludedMode, setIsExcludedMode, selectedRange]); // privateFuncs

  var handlePrevAndNextMonth = function handlePrevAndNextMonth(type) {
    var monthId = Object.keys(visibleDatesRange)[0];
    var resultDate = (0, _calcuateNextAndPrevMonth.default)({
      monthId: monthId,
      isJalaali: isJalaali,
      numberOfMonths: type === "NEXT" ? numberOfMonths : numberOfMonths * -1
    });
    setVisibleDatesRange((0, _generateMonth.default)({
      indexDate: new Date(resultDate),
      numberOfMonths: numberOfMonths,
      isJalaali: isJalaali
    }));
  }; // return the result


  return {
    data: {
      isJalaali: isJalaali,
      monthsToShow: numberOfMonths,
      visibleDatesRange: visibleDatesRange,
      selectedRange: selectedRange,
      shouldShowExcludeMode: shouldShowExcludeMode,
      ExcludeModeComponent: excludeModeComponent,
      excludeModeComponentProps: excludeModeComponentProps,
      isExcludedMode: isExcludedMode,
      isExclutionEnabled: isExclutionEnabled,
      excludedDates: excludedDates
    },
    actions: {
      handleNavigateMonth: handleNavigateMonth,
      onSelectDate: onSelectDate,
      handleExcludeMode: handleExcludeMode
    }
  };
};

var _default = RangePickerManager;
exports.default = _default;