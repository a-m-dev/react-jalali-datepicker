import React, { useState, useEffect } from "react";
import DayNames from "../Constants/DayNames";
import MonthNames from "../Constants/MonthNames";
import refineDaysForRendering from "../utils/refineDaysForRendering";
import DayComponent from "../DayComponent";
import getDateUnix from "../utils/getDateUnix";
import "./styles.scss";

const MonthComponent = ({
  days,
  monthId,
  isJalaali = false,
  onSelectDate,
  selectedRange,
  isExcludedMode,
  computedSelectedRange,
  shouldDisableBeforeToday,
}) => {
  const [refinedDays, setRefinedDays] = useState([]);
  console.log(77777, monthId);
  const [year, month] = monthId.split("__").map((el) => Number(el));

  useEffect(() => {
    setRefinedDays(refineDaysForRendering(monthId, days, isJalaali));
  }, []);

  return (
    <article className="range-picker__month">
      <section className="range-picker__month-heading">
        <h3>
          {isJalaali
            ? `${MonthNames.get(month)[1]} ${year}`
            : `${MonthNames.get(month)[0]}, ${year}`}
        </h3>
      </section>

      <section className="range-picker__month-weekdays">
        {[...DayNames.keys()].map((dayIndex) => (
          <span key={dayIndex}>
            {isJalaali
              ? DayNames.get(dayIndex)[1].charAt(0)
              : DayNames.get(dayIndex)[0].slice(0, 3)}
          </span>
        ))}
      </section>

      <section className="range-picker__month-days">
        {refinedDays.length > 0 &&
          refinedDays.map((day, index) => {
            let isDayExcluded = false;

            if (
              computedSelectedRange[`${year}-${month}-${day}`] &&
              !computedSelectedRange[`${year}-${month}-${day}`]["isIncluded"]
            )
              isDayExcluded = true;

            return (
              <React.Fragment key={index}>
                <DayComponent
                  day={day}
                  monthId={monthId}
                  isJalaali={isJalaali}
                  onSelectDate={onSelectDate}
                  isExcludedMode={isExcludedMode}
                  isDayExcluded={isDayExcluded}
                  selectedRange={selectedRange}
                  shouldDisableBeforeToday={shouldDisableBeforeToday}
                />
              </React.Fragment>
            );
          })}
      </section>
    </article>
  );
};

export default MonthComponent;
