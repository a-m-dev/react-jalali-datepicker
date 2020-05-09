import React, { useCallback } from "react";
import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";

import "./styles.scss";

const DayComponent = ({
  day,
  monthId,
  isJalaali,
  selectedRange,
  onSelectDate,
}) => {
  const handleDaySelect = useCallback(
    (e) => {
      const [year, month] = monthId.split("__").map((el) => Number(el));
      onSelectDate({ e, year, month, day });
    },
    [onSelectDate]
  );

  /**
   * generate class name for day
   */
  const generateClassName = (day) => {
    if (!day) return "range-picker__day";

    const { startDate = "", stopDate = "" } = selectedRange;
    const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

    let crrentDate_unix;
    let startDate_unix;
    let stopDate_unix;

    const [year, month] = monthId.split("__").map((el) => Number(el));

    crrentDate_unix = isJalaali
      ? jMoment(`${year}-${month}-${day}`, JALAALI_DATE_FORMAT).unix()
      : jMoment(`${year}-${month}-${day}`, GEORGIAN_DATE_FORMAT).unix();

    if (startDate) {
      const [stYear, stMonth, stDay] = startDate
        .split("-")
        .map((el) => Number(el));

      startDate_unix = isJalaali
        ? jMoment(`${stYear}-${stMonth}-${stDay}`, JALAALI_DATE_FORMAT).unix()
        : jMoment(`${stYear}-${stMonth}-${stDay}`, GEORGIAN_DATE_FORMAT).unix();
    }

    if (stopDate) {
      const [spYear, spMonth, spDay] = stopDate
        .split("-")
        .map((el) => Number(el));

      stopDate_unix = isJalaali
        ? jMoment(`${spYear}-${spMonth}-${spDay}`, JALAALI_DATE_FORMAT).unix()
        : jMoment(`${spYear}-${spMonth}-${spDay}`, GEORGIAN_DATE_FORMAT).unix();
    }

    if (crrentDate_unix === startDate_unix)
      return "range-picker__day range-picker__day--start-date-selected";

    if (crrentDate_unix === stopDate_unix)
      return "range-picker__day range-picker__day--stop-date-selected";

    if (crrentDate_unix > startDate_unix && crrentDate_unix < stopDate_unix)
      return "range-picker__day range-picker__day--in-selected-range";

    return "range-picker__day";
  };

  return (
    <div className={generateClassName(day)} onClick={handleDaySelect}>
      {day}
    </div>
  );
};

export default DayComponent;
