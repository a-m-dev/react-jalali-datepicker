import convertToGeorgian from "./convertToGeorgian";

const calcuateNextAndPrevMonth = ({ monthId, isJalaali, numberOfMonths }) => {
  console.log(99999, { monthId });
  const [year, month] = monthId.split("__").map((el) => Number(el));

  const calculatedMonth = month + numberOfMonths - 1;

  const indexDate = isJalaali
    ? new Date(year, calculatedMonth, 1, 12, 0, 0)
    : new Date(year, calculatedMonth, 1);

  const _date = `${indexDate.getFullYear()}-${
    indexDate.getMonth() + 1
  }-${indexDate.getDate()}`;

  return isJalaali ? convertToGeorgian(_date) : _date;
};

export default calcuateNextAndPrevMonth;
