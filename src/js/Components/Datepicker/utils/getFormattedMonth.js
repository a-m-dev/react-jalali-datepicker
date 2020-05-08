const getFormattedMonth = (rawDates) => {
  const formattedMonths = {};

  for (let i = 0; i < rawDates.length; i++) {
    // generate key for month and year
    const key = `${Number(rawDates[i].year)}__${Number(rawDates[i].month)}`;

    // generate month key
    if (!Array.isArray(formattedMonths[key])) {
      formattedMonths[key] = [];
    }

    // push days
    formattedMonths[key].push(Number(rawDates[i].day));
  }

  // console.log({ formattedMonths });

  return formattedMonths;
};

export default getFormattedMonth;
