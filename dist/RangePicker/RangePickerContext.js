"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRangePickerContext = exports.default = void 0;

var _react = require("react");

var RangePickerContext = /*#__PURE__*/(0, _react.createContext)();

var useRangePickerContext = function useRangePickerContext() {
  return (0, _react.useContext)(RangePickerContext);
};

exports.useRangePickerContext = useRangePickerContext;
var _default = RangePickerContext;
exports.default = _default;