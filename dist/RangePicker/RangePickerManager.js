"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _Constants = require("../Constants");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var isWindow = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";

var RangePickerManager = function RangePickerManager(props) {
  /**
   *
   * props Values
   */
  var isJalaali = props.isJalaali,
      numberOfMonths = props.numberOfMonths,
      shouldDisableBeforeToday = props.shouldDisableBeforeToday,
      appendExcludeWeekDays = props.appendExcludeWeekDays,
      onExcludeStatusChange = props.onExcludeStatusChange,
      onExclude = props.onExclude,
      onChangeRange = props.onChangeRange,
      onExcludeDaysSeqChange = props.onExcludeDaysSeqChange,
      _props$defaultSelecte = props.defaultSelectedRange,
      defaultStartDate = _props$defaultSelecte.startDate,
      defaultStopDate = _props$defaultSelecte.stopDate,
      defaultExcludedDays = props.defaultExcludedDays;
  var isInitiatedWithDefaults = !!defaultStartDate && !!defaultStopDate;
  /**
   *
   * local States
   */

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

  var _useState7 = (0, _react.useState)({
    startDate: null,
    stopDate: null
  }),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedRange = _useState8[0],
      setSelectedRange = _useState8[1];

  var _useState9 = (0, _react.useState)(appendExcludeWeekDays),
      _useState10 = _slicedToArray(_useState9, 2),
      excludedDaysSeq = _useState10[0],
      setexcludedDaysSeq = _useState10[1];

  var _useState11 = (0, _react.useState)({}),
      _useState12 = _slicedToArray(_useState11, 2),
      computedSelectedRange = _useState12[0],
      setComputedSelectedRange = _useState12[1]; // DEFAULTS SETUP


  (0, _react.useEffect)(function () {
    if (isInitiatedWithDefaults) {
      // default selected range
      var defaultSelectedRange = {
        startDate: defaultStartDate,
        stopDate: defaultStopDate
      };
      setSelectedRange(defaultSelectedRange); // compute selected range

      var startDate = isJalaali ? defaultStartDate : (0, _utils.convertDate)({
        date: defaultStartDate,
        isJalaali: true
      });
      var stopDate = isJalaali ? defaultStartDate : (0, _utils.convertDate)({
        date: defaultStopDate,
        isJalaali: true
      });
      setComputedSelectedRange((0, _utils.computeDaysInRange)({
        startDate: startDate,
        stopDate: stopDate,
        isJalaali: isJalaali,
        defaultExcludedDays: defaultExcludedDays
      })); // set extra stuff

      setIsExcludedMode(true);
      setIsExclutionEnabled(false);
    }
  }, [isInitiatedWithDefaults]);
  (0, _react.useEffect)(function () {
    if (isInitiatedWithDefaults) {
      setComputedSelectedRange((0, _utils.computeDaysInRange)({
        startDate: defaultStartDate,
        stopDate: defaultStopDate,
        isJalaali: isJalaali,
        defaultExcludedDays: defaultExcludedDays
      }));
    }
  }, [defaultExcludedDays]);
  (0, _react.useEffect)(function () {
    setexcludedDaysSeq(appendExcludeWeekDays);
  }, [appendExcludeWeekDays]); // ------------------------------------------------

  /**
   *
   * Event listeners
   * TODO:
   *  -
   */

  (0, _react.useEffect)(function () {
    if (isWindow) {
      window.addEventListener(_Constants.EVENTS.RANGE_PICKER.CLEAR, onClearFunction);
      window.addEventListener(_Constants.EVENTS.RANGE_PICKER.TOGGLE_EXCLUDE_MODE, handleExcludeMode);
      return function () {
        window.removeEventListener(_Constants.EVENTS.RANGE_PICKER.CLEAR, onClearFunction);
        window.removeEventListener(_Constants.EVENTS.RANGE_PICKER.TOGGLE_EXCLUDE_MODE, handleExcludeMode);
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
    setVisibleDatesRange(datesRange); // convert selectedRange and update it

    var _convertSelectedRange = convertSelectedRange(selectedRange),
        convertedStartDate = _convertSelectedRange.convertedStartDate,
        convertedStopDate = _convertSelectedRange.convertedStopDate;

    setSelectedRange({
      startDate: convertedStartDate,
      stopDate: convertedStopDate
    }); // convert computedSelectedRange and update it

    setComputedSelectedRange(function (computedSelectedRange) {
      return manageComputedSelectedRange({
        oldState: computedSelectedRange,
        newState: (0, _utils.computeDaysInRange)({
          startDate: convertedStartDate,
          stopDate: convertedStopDate,
          isJalaali: isJalaali
        })
      });
    }); // AWARE OUTSIDE

    onChangeRange({
      startDate: convertedStartDate,
      stopDate: convertedStopDate
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
    setSelectedRange(selectedRange);
  }, [numberOfMonths]); // exclude

  (0, _react.useEffect)(function () {
    if (isExcludedMode) {
      var BULK = _Constants.RANGEPICKER_DAY_EXCLUSION_TYPES.BULK;
      var JALAALI_DATE_FORMAT = _Constants.DATE_FORMATS.JALAALI_DATE_FORMAT,
          GEORGIAN_DATE_FORMAT = _Constants.DATE_FORMATS.GEORGIAN_DATE_FORMAT;
      var ONE_DAY_IN_UNIX = 24 * 60 * 60;
      var startDate = selectedRange.startDate,
          stopDate = selectedRange.stopDate;
      var startDate_unix = (0, _utils.getDateUnix)({
        date: startDate,
        isJalaali: isJalaali
      });
      var stopDate_unix = (0, _utils.getDateUnix)({
        date: stopDate,
        isJalaali: isJalaali
      });
      var targetDaysTracer = [];

      var _loop = function _loop(i) {
        var iterationDate = (0, _utils.getUnixOfDate)({
          unix: i,
          isJalaali: isJalaali
        });
        var dayName = (0, _momentJalaali.default)(iterationDate, isJalaali ? JALAALI_DATE_FORMAT : GEORGIAN_DATE_FORMAT).format("dddd");
        var foundIndex = appendExcludeWeekDays.findIndex(function (weekDay) {
          return weekDay === dayName;
        });
        if (foundIndex !== -1) targetDaysTracer.push(iterationDate.split("-").map(function (el) {
          return Number(el);
        }).join("-"));
      };

      for (var i = startDate_unix + ONE_DAY_IN_UNIX; i < stopDate_unix; i = i + ONE_DAY_IN_UNIX) {
        _loop(i);
      } // console.log({ targetDaysTracer });


      setComputedSelectedRange(function (computedSelectedRange) {
        return toggleComputedSelectedRangeItems(computedSelectedRange, targetDaysTracer, BULK);
      });
    }
  }, [appendExcludeWeekDays, selectedRange]);
  /**
   *
   * AWARE OUTSIDE API
   */
  // api to aware user of exclude status change

  (0, _react.useEffect)(function () {
    onExcludeStatusChange({
      isExclutionEnabled: isExclutionEnabled,
      isExcludedMode: isExcludedMode
    });
  }, [isExclutionEnabled, isExcludedMode]);
  (0, _react.useEffect)(function () {
    if (computedSelectedRange && isExcludedMode) {
      onExclude(getExcludedDays(computedSelectedRange));
    }
  }, [computedSelectedRange]);
  /**
   *
   * handlers
   */

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
  }, [selectedRange, isExcludedMode, isExclutionEnabled, excludedDaysSeq]);
  var updateSelectedRange = (0, _react.useCallback)(function (_ref) {
    var e = _ref.e,
        year = _ref.year,
        month = _ref.month,
        day = _ref.day;
    var START_DATE = _Constants.RANGE_SELECT_TYPES.START_DATE,
        STOP_DATE = _Constants.RANGE_SELECT_TYPES.STOP_DATE;
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
      var selectedDate_unix = (0, _utils.getDateUnix)({
        date: targetDate,
        isJalaali: isJalaali
      });
      var startDate_unix = (0, _utils.getDateUnix)({
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
      setComputedSelectedRange({});
      onExclude([]);
    } // set State

    setSelectedRange({
      startDate: resultedStartDate,
      stopDate: resultedStopDate
    });

    if (resultedStartDate !== null && resultedStopDate !== null) {
      setComputedSelectedRange((0, _utils.computeDaysInRange)({
        startDate: resultedStartDate,
        stopDate: resultedStopDate,
        isJalaali: isJalaali
      }));
    } // AWARE OUTSIDE


    onChangeRange({
      startDate: resultedStartDate,
      stopDate: resultedStopDate
    });
  }, [selectedRange]);
  var handleExcludeDays = (0, _react.useCallback)(function (args) {
    var e = args.e,
        year = args.year,
        month = args.month,
        day = args.day;
    var startDate = selectedRange.startDate,
        stopDate = selectedRange.stopDate;
    var SINGLE = _Constants.RANGEPICKER_DAY_EXCLUSION_TYPES.SINGLE;
    var date = "".concat(year, "-").concat(month, "-").concat(day);
    var currentDateUnix = (0, _utils.getDateUnix)({
      date: date,
      isJalaali: isJalaali
    });
    var startDateUnix = (0, _utils.getDateUnix)({
      date: startDate,
      isJalaali: isJalaali
    });
    var stopDateUnix = (0, _utils.getDateUnix)({
      date: stopDate,
      isJalaali: isJalaali
    });
    if (currentDateUnix <= startDateUnix || currentDateUnix >= stopDateUnix) return; // check if excludedDaysSeq has the day name
    // aware it to delete the week day

    var weekDayName = (0, _utils.getWeekDayName)({
      date: date,
      isJalaali: isJalaali
    });
    var foundIndex = excludedDaysSeq.findIndex(function (el) {
      return el === weekDayName;
    });

    if (foundIndex !== -1) {
      onExcludeDaysSeqChange(weekDayName);
      var tracer = [];
      Object.keys(computedSelectedRange).splice(1, Object.keys(computedSelectedRange).length - 2) // extract first and last day
      .forEach(function (day) {
        var dayName = (0, _utils.getWeekDayName)({
          date: day,
          isJalaali: isJalaali
        });
        if (dayName === weekDayName) tracer.push(day);
      });
      tracer = tracer.filter(function (el) {
        return el !== date;
      });

      var newComputed = _objectSpread({}, computedSelectedRange);

      tracer.forEach(function (__day) {
        newComputed[__day] = {
          isIncluded: false,
          forceIncluded: false,
          isInSequence: false
        };
      });
      setComputedSelectedRange(newComputed);
      return;
    }

    setComputedSelectedRange(function (computedSelectedRange) {
      return toggleComputedSelectedRangeItems(computedSelectedRange, [date], SINGLE);
    });
  }, [selectedRange, computedSelectedRange]);
  /**
   *
   * Custome Event Dispatche Functions
   */

  var onClearFunction = (0, _react.useCallback)(function () {
    setSelectedRange({
      startDate: null,
      stopDate: null
    });
    setIsExclutionEnabled(true);
    setIsExcludedMode(false);
    setComputedSelectedRange({});
    onExclude([]);
    onChangeRange({
      startDate: null,
      stopDate: null
    });
  }, [computedSelectedRange]);
  var handleExcludeMode = (0, _react.useCallback)(function (event) {
    setIsExcludedMode(event.detail.isExcludedMode);
  }, [setIsExcludedMode, selectedRange]);
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

  var toggleComputedSelectedRangeItems = function toggleComputedSelectedRangeItems(oldState, dates) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Constants.RANGEPICKER_DAY_EXCLUSION_TYPES.SINGLE;
    // console.log("OLD -->>>", { oldState });
    var SINGLE = _Constants.RANGEPICKER_DAY_EXCLUSION_TYPES.SINGLE,
        BULK = _Constants.RANGEPICKER_DAY_EXCLUSION_TYPES.BULK;
    var newState = {};
    Object.entries(oldState).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          date = _ref3[0],
          state = _ref3[1];

      var isExsists = dates.some(function (dt) {
        return dt === date;
      });

      if (isExsists && type === SINGLE) {
        state.isIncluded = !state.isIncluded;

        if (state.isInSequence && state.isIncluded) {
          state.forceIncluded = true;
        }

        Object.assign(newState, _defineProperty({}, date, state));
      } else if (!isExsists && type === BULK && state.isInSequence) {
        state.isIncluded = true;
        state.isInSequence = false;

        if (state.forceIncluded) {
          state.forceIncluded = false;
        }

        Object.assign(newState, _defineProperty({}, date, state));
      } else if (isExsists) {
        state.isIncluded = false;

        if (type === BULK) {
          state.isInSequence = true;

          if (state.forceIncluded) {
            state.isIncluded = true;
            state.forceIncluded = true;
          }
        }

        Object.assign(newState, _defineProperty({}, date, state));
      }
    }); // console.log("NEW STATE", { newState });

    return _objectSpread(_objectSpread({}, oldState), newState);
  };

  var convertSelectedRange = function convertSelectedRange(_ref4) {
    var startDate = _ref4.startDate,
        stopDate = _ref4.stopDate;
    var convertedStartDate = null;
    var convertedStopDate = null;

    if (startDate) {
      convertedStartDate = (0, _utils.convertDate)({
        date: startDate,
        isJalaali: !isJalaali
      });

      if (stopDate) {
        convertedStopDate = (0, _utils.convertDate)({
          date: stopDate,
          isJalaali: !isJalaali
        });
      }
    }

    return {
      convertedStartDate: convertedStartDate,
      convertedStopDate: convertedStopDate
    };
  };

  var manageComputedSelectedRange = function manageComputedSelectedRange(_ref5) {
    var oldState = _ref5.oldState,
        newState = _ref5.newState;
    if (oldState == null || newState == null) return;
    var result = {};
    Object.entries(newState).forEach(function (_ref6, i) {
      var _ref7 = _slicedToArray(_ref6, 2),
          key = _ref7[0],
          value = _ref7[1];

      return result[key] = Object.values(oldState)[i];
    });
    return result;
  };

  var getExcludedDays = function getExcludedDays(computedDays) {
    return Object.entries(computedDays).filter(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          date = _ref9[0],
          _ref9$ = _ref9[1],
          isIncluded = _ref9$.isIncluded,
          forceIncluded = _ref9$.forceIncluded,
          isInSequence = _ref9$.isInSequence;

      return !isIncluded && !forceIncluded;
    }).map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 1),
          date = _ref11[0];

      return date;
    });
  };
  /**
   *
   * return the result
   */


  return {
    data: {
      isJalaali: isJalaali,
      visibleDatesRange: visibleDatesRange,
      selectedRange: selectedRange,
      isExcludedMode: isExcludedMode,
      shouldDisableBeforeToday: shouldDisableBeforeToday,
      computedSelectedRange: computedSelectedRange
    },
    actions: {
      handleNavigateMonth: handleNavigateMonth,
      onSelectDate: onSelectDate
    }
  };
};

var _default = RangePickerManager;
exports.default = _default;