import { DATE_FORMATS } from "../Constants";

const computeJalaaliDaysInRange = ({
  _startDate,
  _stopDate,
  defaultExcludedDays,
}) => {
  const resultDays = {};

  const { JALAALI_DATE_FORMAT } = DATE_FORMATS;

  console.log(1313131313, { defaultExcludedDays });
  const formattedDefaultExcludedDays = defaultExcludedDays.map((date) =>
    date
      .split("-")
      .map((el) => Number(el))
      .join("-")
  );

  let currDay = _startDate;
  while (currDay <= _stopDate) {
    console.log(2323232323, { currDay });
    const [year, month, day] = currDay
      .format(JALAALI_DATE_FORMAT)
      .split("-")
      .map((el) => Number(el));

    // TODO
    // - check if day exists in excluded day
    //   then  make `isIncluded` false
    const date = `${year}-${month}-${day}`;
    resultDays[date] = {
      isIncluded:
        formattedDefaultExcludedDays.findIndex((el) => el === date) === -1
          ? true
          : false,
      forceIncluded: false,
      isInSequence: false,
    };
    currDay = currDay.add(1, "day");
  }

  // console.log(JSON.stringify(resultDays, null, 2));

  return resultDays;
};

export default computeJalaaliDaysInRange;
