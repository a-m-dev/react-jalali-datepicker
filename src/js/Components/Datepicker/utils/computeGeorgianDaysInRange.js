const computeGeorgianDaysInRange = ({ _startDate, _stopDate }) => {
  const resultDays = {};

  let currDay = _startDate;
  while (currDay < _stopDate) {
    const [year, month, day] = currDay
      .toISOString()
      .slice(0, 10)
      .split("-")
      .map((el) => Number(el));

    resultDays[`${year}-${month}-${day}`] = {
      isIncluded: true,
      forceIncluded: false,
    };

    currDay = currDay.add(1, "day");
  }

  console.log(JSON.stringify(resultDays, null, 2));

  return resultDays;
};

export default computeGeorgianDaysInRange;
