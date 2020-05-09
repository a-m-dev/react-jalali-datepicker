import React from "react";

import "./styles.scss";

const DayComponent = ({ monthId, day }) => {
  const generateClassName = () => {
    return "range-picker__day";
  };

  return <div className={generateClassName()}>{day}</div>;
};

export default DayComponent;
