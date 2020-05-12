const computeJalaaliDaysInRange = ({ _startDate, _stopDate }) => {
  const resultDays = {};

  console.log({ _startDate, _stopDate });

  let currDay = _startDate;
  while (currDay < _stopDate) {
    const [year, month, day] = currDay
      .toISOString()
      .slice(0, 10)
      .split("-")
      .map((el) => Number(el));

    console.log({ year, month, day });
    resultDays[`${year}-${month}-${day}`] = {
      isIncluded: true,
      forceIncluded: false,
    };
    currDay = currDay.add(1, "day");
  }

  console.log(resultDays);
};

export default computeJalaaliDaysInRange;
