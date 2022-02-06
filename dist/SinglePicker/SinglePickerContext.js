"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSinglePickerContext = exports.default = void 0;

var _react = require("react");

var SinglePickerContext = /*#__PURE__*/(0, _react.createContext)();

var useSinglePickerContext = function useSinglePickerContext() {
  return (0, _react.useContext)(SinglePickerContext);
};

exports.useSinglePickerContext = useSinglePickerContext;
var _default = SinglePickerContext;
exports.default = _default;