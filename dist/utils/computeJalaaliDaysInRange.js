"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Constants = require("../Constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var computeJalaaliDaysInRange = function computeJalaaliDaysInRange(_ref) {
  var _startDate = _ref._startDate,
      _stopDate = _ref._stopDate,
      defaultExcludedDays = _ref.defaultExcludedDays;
  var resultDays = {};
  var JALAALI_DATE_FORMAT = _Constants.DATE_FORMATS.JALAALI_DATE_FORMAT;
  var formattedDefaultExcludedDays = defaultExcludedDays.map(function (date) {
    return date.split("-").map(function (el) {
      return Number(el);
    }).join("-");
  });
  var currDay = _startDate;

  var _loop = function _loop() {
    var _currDay$format$split = currDay.format(JALAALI_DATE_FORMAT).split("-").map(function (el) {
      return Number(el);
    }),
        _currDay$format$split2 = _slicedToArray(_currDay$format$split, 3),
        year = _currDay$format$split2[0],
        month = _currDay$format$split2[1],
        day = _currDay$format$split2[2]; // TODO
    // - check if day exists in excluded day
    //   then  make `isIncluded` false


    var date = "".concat(year, "-").concat(month, "-").concat(day);
    resultDays[date] = {
      isIncluded: formattedDefaultExcludedDays.findIndex(function (el) {
        return el === date;
      }) === -1 ? true : false,
      forceIncluded: false,
      isInSequence: false
    };
    currDay = currDay.add(1, "day");
  };

  while (currDay <= _stopDate) {
    _loop();
  } // console.log(JSON.stringify(resultDays, null, 2));


  return resultDays;
};

var _default = computeJalaaliDaysInRange;
exports.default = _default;