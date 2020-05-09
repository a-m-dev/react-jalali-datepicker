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
    actions: { handleNavigateMonth },
    data: { visibleDatesRange, isJalaali },
  } = RangePickerManager(props);

  console.log({ isJalaali });

  return (
    <RangePickerContext.Provider value={{ data, actions }}>
      <article
        className={`range-picker range-picker--${
          isJalaali ? "jalaali" : "georgian"
        }`}
      >
        <section className="range-picker range-picker__navigators">
          <div
            className="range-picker__navigator"
            onClick={handleNavigateMonth}
            data-name={`${isJalaali ? "PREV" : "NEXT"}`}
          >
            <span>‹</span>
          </div>
          <div
            className="range-picker__navigator"
            onClick={handleNavigateMonth}
            data-name={`${isJalaali ? "NEXT" : "PREV"}`}
          >
            <span>›</span>
          </div>
        </section>

        <section className="range-picker range-picker__container">
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
        </section>
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
