import { DATE_FORMATS } from "../Constants";

const computeGeorgianDaysInRange = ({
  _startDate,
  _stopDate,
  defaultExcludedDays,
}) => {
  const resultDays = {};

  const { GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  console.log(1212121212, { defaultExcludedDays });
  const formattedDefaultExcludedDays = defaultExcludedDays.map((date) =>
    date
      .split("-")
      .map((el) => Number(el))
      .join("-")
  );

  let currDay = _startDate;
  while (currDay <= _stopDate) {
    console.log(21212121, { currDay });
    const [year, month, day] = currDay
      .format(GEORGIAN_DATE_FORMAT)
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

export default computeGeorgianDaysInRange;
