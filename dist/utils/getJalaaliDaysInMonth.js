"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

var _getFormattedMonth = _interopRequireDefault(require("./getFormattedMonth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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