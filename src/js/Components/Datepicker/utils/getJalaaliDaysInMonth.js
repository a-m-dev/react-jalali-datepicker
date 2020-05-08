import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";
import getFormattedMonth from "./getFormattedMonth";

/**
 *
 * @param {Date} date
 * @param {String} numberOfMonths
 * @returns [String] days in month in jalaali format
 */
const getJalaaliDaysInMonth = (date, numberOfMonths) => {
  // TODO:
  //  - get current month in jalaali
  //  - create start date based on jalaali month
  //  - create end date based on jalaali month
  //  - return array of days in month

  const { GEORGIAN_DATE_FORMAT, JALAALI_DATE_FORMAT } = DATE_FORMATS;

  const currYear = date.getFullYear();
  const currMonth = date.getMonth();

  const isoDate = new Date(currYear, currMonth, 1, 12, 0, 0).toISOString();

  const dateAsJalaali = jMoment(isoDate, GEORGIAN_DATE_FORMAT).format(
    JALAALI_DATE_FORMAT
  );

  // find startDate in jalaali
  const startDate = jMoment(dateAsJalaali, JALAALI_DATE_FORMAT);
  startDate.startOf("jMonth");

  // console.log({ startDate: startDate.format(JALAALI_DATE_FORMAT) });

  // find stopDate in Jalaali
  const stopDate = jMoment(dateAsJalaali, JALAALI_DATE_FORMAT);
  stopDate.add(numberOfMonths, "jMonth");
  stopDate.startOf("jMonth");

  // console.log({ stopDate: stopDate.format(JALAALI_DATE_FORMAT) });

  const resultDays = [];
  let currDate = startDate;
  while (currDate < stopDate) {
    const [year, month, day] = currDate.format(JALAALI_DATE_FORMAT).split("-");

    resultDays.push({ year, month, day });

    currDate.add(1, "day");
  }

  // console.log(JSON.stringify(resultDays, null, 2));

  return getFormattedMonth(resultDays);
};

export default getJalaaliDaysInMonth;
