"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getFormattedMonth = function getFormattedMonth(rawDates) {
  var formattedMonths = {};

  for (var i = 0; i < rawDates.length; i++) {
    // generate key for month and year
    var key = "".concat(Number(rawDates[i].year), "__").concat(Number(rawDates[i].month)); // generate month key

    if (!Array.isArray(formattedMonths[key])) {
      formattedMonths[key] = [];
    } // push days


    formattedMonths[key].push(Number(rawDates[i].day));
  } // console.log({ formattedMonths });


  return formattedMonths;
};

var _default = getFormattedMonth;
exports.default = _default;