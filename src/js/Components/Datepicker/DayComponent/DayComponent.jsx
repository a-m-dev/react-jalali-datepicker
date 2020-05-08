import React from "react";

import "./styles.scss";

const DayComponent = ({ monthId, day }) => {
  return <div className="range-picker__day">{day}</div>;
};

export default DayComponent;
