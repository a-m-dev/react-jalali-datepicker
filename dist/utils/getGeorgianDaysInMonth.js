"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getFormattedMonth = _interopRequireDefault(require("./getFormattedMonth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *
 * @param {Date} date
 * @param {String} numberOfMonths
 * @returns [String] days in month in georgian format
 */
var getGeorgianDaysInMonth = function getGeorgianDaysInMonth(date, numberOfMonths) {
  // TODO:
  //  - add `addDay` func to Date prototype
  //  - get current month in georgian
  //  - find start and stop dates
  //  - return array of days in month
  if (!Object.prototype.hasOwnProperty("addDays")) {
    Date.prototype.addDays = function (day) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + day);
      return date;
    };
  } else return;

  var currYear = date.getFullYear();
  var currMonth = date.getMonth();
  var stopMonth = currMonth + numberOfMonths;
  var startDate = new Date(currYear, currMonth, 1, 12, 0, 0);
  var stopDate = new Date(currYear, stopMonth, 1, 12, 0, 0);
  var resultDays = [];
  var currDay = startDate;

  while (currDay < stopDate) {
    var _currDay$toISOString$ = currDay.toISOString().slice(0, 10).split("-"),
        _currDay$toISOString$2 = _slicedToArray(_currDay$toISOString$, 3),
        year = _currDay$toISOString$2[0],
        month = _currDay$toISOString$2[1],
        day = _currDay$toISOString$2[2];

    resultDays.push({
      year: year,
      month: month,
      day: day
    });
    currDay = currDay.addDays(1);
  } // console.log(JSON.stringify(resultDays, null, 2));


  return (0, _getFormattedMonth.default)(resultDays);
};

var _default = getGeorgianDaysInMonth;
exports.default = _default;