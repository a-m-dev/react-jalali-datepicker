"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentJalaali = _interopRequireDefault(require("moment-jalaali"));

var _DateFormats = _interopRequireDefault(require("../Constants/DateFormats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var convertDate = function convertDate(_ref) {
  var date = _ref.date,
      isJalaali = _ref.isJalaali;
  var JALAALI_DATE_FORMAT = _DateFormats.default.JALAALI_DATE_FORMAT,
      GEORGIAN_DATE_FORMAT = _DateFormats.default.GEORGIAN_DATE_FORMAT;

  var _date$split$map = date.split("-").map(function (el) {
    return Number(el);
  }),
      _date$split$map2 = _slicedToArray(_date$split$map, 3),
      year = _date$split$map2[0],
      month = _date$split$map2[1],
      day = _date$split$map2[2];

  return isJalaali ? (0, _momentJalaali.default)("".concat(year, "-").concat(month, "-").concat(day), JALAALI_DATE_FORMAT).format(GEORGIAN_DATE_FORMAT) : (0, _momentJalaali.default)("".concat(year, "-").concat(month, "-").concat(day), GEORGIAN_DATE_FORMAT).format(JALAALI_DATE_FORMAT);
};

var _default = convertDate;
exports.default = _default;