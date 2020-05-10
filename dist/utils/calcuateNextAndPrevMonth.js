"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _convertToGeorgian = _interopRequireDefault(require("./convertToGeorgian"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var calcuateNextAndPrevMonth = function calcuateNextAndPrevMonth(_ref) {
  var monthId = _ref.monthId,
      isJalaali = _ref.isJalaali,
      numberOfMonths = _ref.numberOfMonths;

  var _monthId$split$map = monthId.split("__").map(function (el) {
    return Number(el);
  }),
      _monthId$split$map2 = _slicedToArray(_monthId$split$map, 2),
      year = _monthId$split$map2[0],
      month = _monthId$split$map2[1];

  var calculatedMonth = month + numberOfMonths - 1;
  var indexDate = isJalaali ? new Date(year, calculatedMonth, 1, 12, 0, 0) : new Date(year, calculatedMonth, 1);

  var _date = "".concat(indexDate.getFullYear(), "-").concat(indexDate.getMonth() + 1, "-").concat(indexDate.getDate());

  return isJalaali ? (0, _convertToGeorgian.default)(_date) : _date;
};

var _default = calcuateNextAndPrevMonth;
exports.default = _default;