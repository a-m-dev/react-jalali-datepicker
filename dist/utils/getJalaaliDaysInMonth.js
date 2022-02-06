"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

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
 * @returns [String] days in month in jalaali format
 */
var getJalaaliDaysInMonth = function getJalaaliDaysInMonth(date, numberOfMonths) {
  // TODO:
  //  - get current month in jalaali
  //  - create start date based on jalaali month
  //  - create end date based on jalaali month
  //  - return array of days in month
  var GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT,
      JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT;
  var currYear = date.getFullYear();
  var currMonth = date.getMonth();
  var currDay = date.getDate();
  var isoDate = new Date(currYear, currMonth, currDay, 12, 0, 0).toISOString();
  var dateAsJalaali = (0, _momentJalaali.default)(isoDate, GEORGIAN_DATE_FORMAT).format(JALAALI_DATE_FORMAT); // find startDate in jalaali

  var startDate = (0, _momentJalaali.default)(dateAsJalaali, JALAALI_DATE_FORMAT);
  startDate.startOf("jMonth"); // console.log({ date, startDate: startDate.format(JALAALI_DATE_FORMAT) });
  // find stopDate in Jalaali

  var stopDate = (0, _momentJalaali.default)(dateAsJalaali, JALAALI_DATE_FORMAT);
  stopDate.add(numberOfMonths, "jMonth");
  stopDate.startOf("jMonth"); // console.log({ stopDate: stopDate.format(JALAALI_DATE_FORMAT) });

  var resultDays = [];
  var currDate = startDate;

  while (currDate < stopDate) {
    var _currDate$format$spli = currDate.format(JALAALI_DATE_FORMAT).split("-"),
        _currDate$format$spli2 = _slicedToArray(_currDate$format$spli, 3),
        year = _currDate$format$spli2[0],
        month = _currDate$format$spli2[1],
        day = _currDate$format$spli2[2];

    resultDays.push({
      year: year,
      month: month,
      day: day
    });
    currDate.add(1, "day");
  } // console.log(JSON.stringify(resultDays, null, 2));


  return (0, _getFormattedMonth.default)(resultDays);
};

var _default = getJalaaliDaysInMonth;
exports.default = _default;