import getJalaaliDaysInMonth from "./getJalaaliDaysInMonth";
import getGeorgianDaysInMonth from "./getGeorgianDaysInMonth";

/**
 *
 * @param {Object} Obj.numberOfMonths - the spectrum of monthes that you want to involve
 * @param {Object} Obj.isJalaali - should be in jalaali format or not
 * @param {Object} Obj.indexDate - the start date of calculations
 * @returns {[String]} - array of days in that month
 */
const generateMonth = ({
  numberOfMonths,
  isJalaali = false,
  indexDate = new Date(),
}) => {
  if (!numberOfMonths instanceof Number) return [];

  return isJalaali
    ? getJalaaliDaysInMonth(indexDate, numberOfMonths)
    : getGeorgianDaysInMonth(indexDate, numberOfMonths);
};

export default generateMonth;
