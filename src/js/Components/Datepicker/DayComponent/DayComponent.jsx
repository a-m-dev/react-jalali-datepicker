import React, { useCallback } from "react";
import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";
import getDateUnix from "../utils/getDateUnix";

import "./styles.scss";

const DayComponent = ({
  day,
  monthId,
  isJalaali,
  selectedRange,
  isExcludedMode,
  isDayExcluded,
  onSelectDate,
  shouldDisableBeforeToday,
}) => {
  const { startDate = "", stopDate = "" } = selectedRange;
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  let today_unix;
  let crrentDate_unix;
  let startDate_unix;
  let stopDate_unix;

  console.log(55555, { monthId });

  const [year, month] = monthId.split("__").map((el) => Number(el));

  const today = isJalaali
    ? jMoment(new Date().toISOString(), GEORGIAN_DATE_FORMAT).format(
        JALAALI_DATE_FORMAT
      )
    : new Date().toISOString();

  const currentDate = `${year}-${month}-${day}`;

  today_unix = getDateUnix({ date: today.slice(0, 10), isJalaali });
  crrentDate_unix = getDateUnix({ date: currentDate, isJalaali });
  if (startDate) startDate_unix = getDateUnix({ date: startDate, isJalaali });
  if (stopDate) stopDate_unix = getDateUnix({ date: stopDate, isJalaali });

  const handleDaySelect = useCallback(
    (e) => {
      if (day === null) return;
      if (isDisabledBeforeToday()) return;

      console.log(66666, monthId);

      const [year, month] = monthId.split("__").map((el) => Number(el));
      onSelectDate({ e, year, month, day });
    },
    [onSelectDate]
  );

  const isDisabledBeforeToday = () =>
    shouldDisableBeforeToday && crrentDate_unix < today_unix;

  /**
   * generate class name for day
   */
  const generateClassName = (day) => {
    let baseClassName = "range-picker__day";
    if (!day) return baseClassName;

    let className = baseClassName;

    if (crrentDate_unix === today_unix) className += ` ${baseClassName}--today`;

    if (isDayExcluded) className += ` ${baseClassName}--excluded`;

    if (crrentDate_unix === startDate_unix)
      className += ` ${baseClassName}--start-date-selected`;

    if (crrentDate_unix === stopDate_unix)
      className += ` ${baseClassName}--stop-date-selected`;

    if (crrentDate_unix > startDate_unix && crrentDate_unix < stopDate_unix)
      className += ` ${baseClassName}--in-selected-range`;

    if (isDisabledBeforeToday()) className += ` ${baseClassName}--before-today`;

    if (
      isExcludedMode &&
      (crrentDate_unix < startDate_unix || crrentDate_unix > stopDate_unix)
    )
      return (className += ` ${baseClassName}--out-of-range`);

    return className;
  };

  return (
    <div className={generateClassName(day)} onClick={handleDaySelect}>
      {day}
    </div>
  );
};

export default DayComponent;
