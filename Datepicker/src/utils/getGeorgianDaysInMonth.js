import getFormattedMonth from "./getFormattedMonth";

/**
 *
 * @param {Date} date
 * @param {String} numberOfMonths
 * @returns [String] days in month in georgian format
 */
const getGeorgianDaysInMonth = (date, numberOfMonths) => {
  // TODO:
  //  - add `addDay` func to Date prototype
  //  - get current month in georgian
  //  - find start and stop dates
  //  - return array of days in month

  if (!Object.prototype.hasOwnProperty("addDays")) {
    Date.prototype.addDays = function (day) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + day);

      return date;
    };
  } else return;

  const currYear = date.getFullYear();
  const currMonth = date.getMonth();

  const stopMonth = currMonth + numberOfMonths;

  const startDate = new Date(currYear, currMonth, 1, 12, 0, 0);
  const stopDate = new Date(currYear, stopMonth, 1, 12, 0, 0);

  const resultDays = [];
  let currDay = startDate;
  while (currDay < stopDate) {
    console.log(17171717, currDay);
    const [year, month, day] = currDay.toISOString().slice(0, 10).split("-");
    resultDays.push({ year, month, day });

    currDay = currDay.addDays(1);
  }

  // console.log(JSON.stringify(resultDays, null, 2));

  return getFormattedMonth(resultDays);
};

export default getGeorgianDaysInMonth;
