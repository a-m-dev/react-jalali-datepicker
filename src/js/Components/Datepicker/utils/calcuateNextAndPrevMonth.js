import convertToGeorgian from "./convertToGeorgian";

const calcuateNextAndPrevMonth = ({ monthId, isJalaali, numberOfMonths }) => {
  const [year, month] = monthId.split("__").map((el) => Number(el));

  const calculatedMonth = month + numberOfMonths - 1;

  const indexDate = isJalaali
    ? new Date(year, calculatedMonth, 1, 12, 0, 0).toISOString().slice(0, 10)
    : new Date(year, calculatedMonth, 1).toISOString().slice(0, 10);

  return isJalaali ? convertToGeorgian(indexDate) : indexDate;
};

export default calcuateNextAndPrevMonth;
