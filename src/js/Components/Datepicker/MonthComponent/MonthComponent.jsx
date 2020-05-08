import React, { useState, useEffect } from "react";
import PersianMonthNames from "../Constants/PersianMonthNames";
import refineDaysForRendering from "../utils/refineDaysForRendering";
import DayComponent from "../DayComponent";
import "./styles.scss";

const MonthComponent = ({ monthId, days }) => {
  const [refinedDays, setRefinedDays] = useState([]);
  const [year, month] = monthId.split("__").map((el) => Number(el));

  useEffect(() => {
    setRefinedDays(refineDaysForRendering(monthId, days));
  }, []);

  return (
    <article className="range-picker__month">
      <section className="range-picker__month-heading">
        <h2>
          {PersianMonthNames.get(month)} {year}
        </h2>
      </section>

      {refinedDays.length > 0 &&
        refinedDays.map((day, index) => (
          <React.Fragment key={index}>
            <DayComponent monthId={monthId} day={day} />
          </React.Fragment>
        ))}
    </article>
  );
};

export default MonthComponent;
