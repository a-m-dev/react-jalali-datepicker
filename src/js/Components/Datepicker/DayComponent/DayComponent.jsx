import React, { useCallback } from "react";

import "./styles.scss";

const DayComponent = ({ day, monthId, onSelectDate }) => {
  const generateClassName = () => {
    return "range-picker__day";
  };

  const handleDaySelect = useCallback(
    (e) => {
      const [year, month] = monthId.split("__").map((el) => Number(el));
      onSelectDate({ e, year, month, day });
    },
    [onSelectDate]
  );

  return (
    <div className={generateClassName()} onClick={handleDaySelect}>
      {day}
    </div>
  );
};

export default DayComponent;
