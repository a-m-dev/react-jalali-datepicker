import React from "react";
import PropTypes from "prop-types";

import MonthComponent from "../MonthComponent";

import RangePickerContext from "./RangePickerContext";
import RangePickerManager from "./RangePickerManager";
import "./styles.scss";

const RangePicker = (props) => {
  const {
    data,
    actions,
    data: { visibleDatesRange, isJalaali },
  } = RangePickerManager(props);

  return (
    <RangePickerContext.Provider value={{ data, actions }}>
      <article className="range-picker">
        {!!visibleDatesRange &&
          Object.entries(visibleDatesRange).map(([monthId, days]) => (
            <React.Fragment key={monthId}>
              <MonthComponent
                days={days}
                monthId={monthId}
                isJalaali={isJalaali}
              />
            </React.Fragment>
          ))}
      </article>
    </RangePickerContext.Provider>
  );
};

RangePicker.defaultProps = {
  numberOfMonths: 1,
  isJalaali: false,
};

RangePicker.propTypes = {
  numberOfMonths: PropTypes.number,
  isJalaali: PropTypes.bool,
};

export default RangePicker;
