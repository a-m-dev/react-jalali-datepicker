import React, { useCallback } from "react";
import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";

import "./styles.scss";

const DayComponent = ({
  day,
  monthId,
  isJalaali,
  selectedRange,
  isDayExcluded,
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
    let baseClassName = "range-picker__day";
    if (!day) return baseClassName;

    let className = baseClassName;

    const { startDate = "", stopDate = "" } = selectedRange;
    const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

    let today_unix;
    let crrentDate_unix;
    let startDate_unix;
    let stopDate_unix;

    const [year, month] = monthId.split("__").map((el) => Number(el));

    const today = isJalaali
      ? jMoment(new Date().toISOString(), GEORGIAN_DATE_FORMAT).format(
          JALAALI_DATE_FORMAT
        )
      : new Date().toISOString();

    today_unix = getDateUnixTime(today.slice(0, 10));
    crrentDate_unix = getDateUnixTime(`${year}-${month}-${day}`);
    if (startDate) startDate_unix = getDateUnixTime(startDate);
    if (stopDate) stopDate_unix = getDateUnixTime(stopDate);

    if (crrentDate_unix === today_unix) className += ` ${baseClassName}--today`;

    if (isDayExcluded) className += ` ${baseClassName}--excluded`;

    if (crrentDate_unix === startDate_unix)
      className += ` ${baseClassName}--start-date-selected`;

    if (crrentDate_unix === stopDate_unix)
      className += ` ${baseClassName}--stop-date-selected`;

    if (crrentDate_unix > startDate_unix && crrentDate_unix < stopDate_unix)
      className += ` ${baseClassName}--in-selected-range`;

    return className;
  };

  // private funcs
  const getDateUnixTime = (date) => {
    const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

    const [year, month, day] = date.split("-").map((el) => Number(el));

    return isJalaali
      ? jMoment(`${year}-${month}-${day}`, JALAALI_DATE_FORMAT).unix()
      : jMoment(`${year}-${month}-${day}`, GEORGIAN_DATE_FORMAT).unix();
  };

  return (
    <div className={generateClassName(day)} onClick={handleDaySelect}>
      {day}
    </div>
  );
};

export default DayComponent;
