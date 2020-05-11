"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

var _RangeSelectTypes = _interopRequireDefault(require("../Constants/RangeSelectTypes"));

var _Events = _interopRequireDefault(require("../Constants/Events"));

var _generateMonth = _interopRequireDefault(require("../utils/generateMonth"));

var _getDateUnix = _interopRequireDefault(require("../utils/getDateUnix"));

var _getUnixOfDate = _interopRequireDefault(require("../utils/getUnixOfDate"));

var _calcuateNextAndPrevMonth = _interopRequireDefault(require("../utils/calcuateNextAndPrevMonth"));

var _convertDate = _interopRequireDefault(require("../utils/convertDate"));

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
      excludeModeComponent = props.excludeModeComponent,
      excludeModeComponentProps = props.excludeModeComponentProps,
      onExclude = props.onExclude,
      shouldDisableBeforeToday = props.shouldDisableBeforeToday,
      onChangeRange = props.onChangeRange,
      appendExcludeWeekDays = props.appendExcludeWeekDays,
      onExcludeStatusChange = props.onExcludeStatusChange; // local States

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
      setSelectedRange = _useState10[1];

  (0, _react.useEffect)(function () {
    window.addEventListener(_Events.default.RANGE_PICKER.CLEAR, onClearFunction);
    window.addEventListener(_Events.default.RANGE_PICKER.TOGGLE_EXCLUDE_MODE, handleExcludeMode);
    return function () {
      window.removeEventListener(_Events.default.RANGE_PICKER.CLEAR);
      window.removeEventListener(_Events.default.RANGE_PICKER.TOGGLE_EXCLUDE_MODE);
    };
  }, []); // Effects
  // initialize component with today

  (0, _react.useEffect)(function () {
    var today = new Date();
    var datesRange = (0, _generateMonth.default)({
      indexDate: today,
      numberOfMonths: numberOfMonths,
      isJalaali: isJalaali
    });
    setVisibleDatesRange(datesRange); // convert start and stop dates

    var _convertSelectedRange = convertSelectedRange(selectedRange),
        convertedStartDate = _convertSelectedRange.convertedStartDate,
        convertedStopDate = _convertSelectedRange.convertedStopDate;

    setSelectedRange({
      startDate: convertedStartDate,
      stopDate: convertedStopDate
    }); // convert exclusion days

    var convertedExcludedDays = excludedDates.map(function (date) {
      return (0, _convertDate.default)({
        date: date,
        isJalaali: !isJalaali
      });
    });
    setExcludedDates(convertedExcludedDays);
    onExclude(convertedExcludedDays); // call onChange Range

    onChangeRange({
      startDate: convertedStartDate,
      stopDate: convertedStopDate
    });
  }, [isJalaali]); // exclude

  (0, _react.useEffect)(function () {
    if (isExcludedMode) {
      var JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT,
          GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT;
      var ONE_DAY_IN_UNIX = 24 * 60 * 60;
      var startDate = selectedRange.startDate,
          stopDate = selectedRange.stopDate;
      var startDate_unix = (0, _getDateUnix.default)({
        date: startDate,
        isJalaali: isJalaali
      });
      var stopDate_unix = (0, _getDateUnix.default)({
        date: stopDate,
        isJalaali: isJalaali
      });
      var targetDaysTracer = [];

      var _loop = function _loop(i) {
        var iterationDate = (0, _getUnixOfDate.default)({
          unix: i,
          isJalaali: isJalaali
        });
        var dayName = (0, _momentJalaali.default)(iterationDate, isJalaali ? JALAALI_DATE_FORMAT : GEORGIAN_DATE_FORMAT).format("dddd");
        var foundIndex = appendExcludeWeekDays.findIndex(function (weekDay) {
          return weekDay === dayName;
        });
        if (foundIndex !== -1) targetDaysTracer.push(iterationDate);
      };

      for (var i = startDate_unix + ONE_DAY_IN_UNIX; i < stopDate_unix; i = i + ONE_DAY_IN_UNIX) {
        _loop(i);
      }

      setExcludedDates(function (excludedDates) {
        return [].concat(_toConsumableArray(excludedDates), targetDaysTracer);
      });
    }
  }, [appendExcludeWeekDays, selectedRange, setExcludedDates]);
  (0, _react.useEffect)(function () {
    onExclude(excludedDates);
  }, [excludedDates]);
  (0, _react.useEffect)(function () {
    onExcludeStatusChange({
      isExclutionEnabled: isExclutionEnabled,
      isExcludedMode: isExcludedMode
    });
  }, [isExclutionEnabled, isExcludedMode]); // reset

  var onClearFunction = (0, _react.useCallback)(function () {
    setSelectedRange({
      startDate: null,
      stopDate: null
    });
    setExcludedDates([]);
    setIsExclutionEnabled(true);
    setIsExcludedMode(false);
  }, []); // handlers

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
    onChangeRange({
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
    if (currentDateUnix <= startDateUnix || currentDateUnix >= stopDateUnix) return; // find if already added

    setExcludedDates(function (excludedDates) {
      return manageExcludedState(excludedDates, date);
    });
  }, [selectedRange, excludedDates, setExcludedDates]);
  var handleExcludeMode = (0, _react.useCallback)(function (event) {
    setIsExcludedMode(event.detail.isExcludedMode);
  }, [setIsExcludedMode, selectedRange]); // privateFuncs

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
  };

  var manageExcludedState = function manageExcludedState(days, selectedDay) {
    var foundIndex = days.findIndex(function (el) {
      return (0, _getDateUnix.default)({
        date: el,
        isJalaali: isJalaali
      }) === (0, _getDateUnix.default)({
        date: selectedDay,
        isJalaali: isJalaali
      });
    });

    if (foundIndex < 0) {
      return [].concat(_toConsumableArray(days), [selectedDay]);
    } else {
      return [].concat(_toConsumableArray(days.slice(0, foundIndex)), _toConsumableArray(days.slice(foundIndex + 1, days.length)));
    }
  };

  var convertSelectedRange = function convertSelectedRange(_ref2) {
    var startDate = _ref2.startDate,
        stopDate = _ref2.stopDate;
    var convertedStartDate = null;
    var convertedStopDate = null;

    if (startDate) {
      convertedStartDate = (0, _convertDate.default)({
        date: startDate,
        isJalaali: !isJalaali
      });

      if (stopDate) {
        convertedStopDate = (0, _convertDate.default)({
          date: stopDate,
          isJalaali: !isJalaali
        });
      }
    }

    return {
      convertedStartDate: convertedStartDate,
      convertedStopDate: convertedStopDate
    };
  }; // return the result


  return {
    data: {
      isJalaali: isJalaali,
      monthsToShow: numberOfMonths,
      visibleDatesRange: visibleDatesRange,
      selectedRange: selectedRange,
      ExcludeModeComponent: excludeModeComponent,
      excludeModeComponentProps: excludeModeComponentProps,
      isExcludedMode: isExcludedMode,
      excludedDates: excludedDates,
      shouldDisableBeforeToday: shouldDisableBeforeToday
    },
    actions: {
      handleNavigateMonth: handleNavigateMonth,
      onSelectDate: onSelectDate
    }
  };
};

var _default = RangePickerManager;
exports.default = _default;