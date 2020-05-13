import { DATE_FORMATS } from "../Constants";

const computeGeorgianDaysInRange = ({ _startDate, _stopDate }) => {
  const resultDays = {};

  const { GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  let currDay = _startDate;
  while (currDay <= _stopDate) {
    const [year, month, day] = currDay
      .format(GEORGIAN_DATE_FORMAT)
      .split("-")
      .map((el) => Number(el));

    resultDays[`${year}-${month}-${day}`] = {
      isIncluded: true,
      forceIncluded: false,
    };

    currDay = currDay.add(1, "day");
  }

  // console.log(JSON.stringify(resultDays, null, 2));

  return resultDays;
};

export default computeGeorgianDaysInRange;
