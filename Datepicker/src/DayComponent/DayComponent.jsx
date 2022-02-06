import React, { useCallback } from "react";
import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";
import getDateUnix from "../utils/getDateUnix";

import "./styles.scss";

const DayComponent = ({
  componentType,
  day,
  monthId,
  isJalaali,
  selectedRange,
  isExcludedMode,
  isDayExcluded,
  onSelectDate,
  shouldDisableBeforeToday,
  shouldDisableAfterToday,
  disabledBeforeDate,
  disabledAfterDate,
  isDateIncludeDisableBound,
}) => {
  const { startDate = "", stopDate = "" } = selectedRange;
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  let today_unix;
  let crrentDate_unix;
  let startDate_unix;
  let stopDate_unix;
  let disabledBeforeDate_unix;
  let disabledAfterDate_unix;

  const [year, month] = monthId.split("__").map((el) => Number(el));
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const localISOTodayTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
  const today = isJalaali
      ? jMoment(localISOTodayTime, GEORGIAN_DATE_FORMAT).format(
          JALAALI_DATE_FORMAT
      )
      : localISOTodayTime;
  const currentDate = `${year}-${month}-${day}`;

  today_unix = getDateUnix({ date: today.slice(0, 10), isJalaali });
  crrentDate_unix = getDateUnix({ date: currentDate, isJalaali });
  if (startDate) startDate_unix = getDateUnix({ date: startDate, isJalaali });
  if (stopDate) stopDate_unix = getDateUnix({ date: stopDate, isJalaali });
  if (disabledBeforeDate) disabledBeforeDate_unix = getDateUnix({ date: disabledBeforeDate, isJalaali });
  if (disabledAfterDate) disabledAfterDate_unix = getDateUnix({ date: disabledAfterDate, isJalaali });

  const handleDaySelect = useCallback(
    (e) => {
      if (day === null) return;
      if (isDisabledBeforeToday()) return;
      if (isDisabledAfterToday()) return;
      if (isDisabledBeforeDate()) return;
      if (isDisabledAfterDate()) return;

      const [year, month] = monthId.split("__").map((el) => Number(el));
      onSelectDate({ e, year, month, day });
    },
    [disabledBeforeDate, disabledAfterDate, onSelectDate]
  );

  const isDisabledBeforeToday = () =>
    shouldDisableBeforeToday && crrentDate_unix < today_unix;

  const isDisabledAfterToday = () =>
    shouldDisableAfterToday && crrentDate_unix > today_unix;

  const isDisabledBeforeDate = () =>
  {
    if(!disabledBeforeDate){
      return null;
    }
    if(isDateIncludeDisableBound){
      return crrentDate_unix <= disabledBeforeDate_unix;
    }
    return crrentDate_unix < disabledBeforeDate_unix;
  };

  const isDisabledAfterDate = () =>
  {
    if(!disabledAfterDate){
      return null;
    }
    if(isDateIncludeDisableBound){
      return crrentDate_unix >= disabledAfterDate_unix;
    }
    return crrentDate_unix > disabledAfterDate_unix;
  };

  /**
   * generate class name for day
   */
  const generateClassName = (day) => {
    let baseClassName = "range-picker__day";
    if (!day) return baseClassName;

    let className = baseClassName;

    if (crrentDate_unix === today_unix) className += ` ${baseClassName}--today`;

    if (crrentDate_unix === today_unix) className += ` ${baseClassName}--today`;

    if (isDayExcluded) className += ` ${baseClassName}--excluded`;

    if (crrentDate_unix === startDate_unix)
      className += ` ${baseClassName}--start-date-selected`;

    if (crrentDate_unix === stopDate_unix)
      className += ` ${baseClassName}--stop-date-selected`;

    if (crrentDate_unix > startDate_unix && crrentDate_unix < stopDate_unix)
      className += ` ${baseClassName}--in-selected-range`;

    if (isDisabledBeforeToday()) className += ` ${baseClassName}--before-today`;

    if (isDisabledAfterToday()) className += ` ${baseClassName}--after-today`;

    if (isDisabledBeforeDate() || isDisabledAfterDate()) className += ` ${baseClassName}--disabled`;

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
