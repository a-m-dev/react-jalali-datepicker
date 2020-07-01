import React from "react";
import PropTypes from "prop-types";

import MonthComponent from "../MonthComponent";

import SinglePickerContext from "./SinglePickerContext";
import SinglePickerManager from "./SinglePickerManager";
import "./styles.scss";

const SinglePicker = (props) => {
  const {
    data,
    actions,
    actions: { handleNavigateMonth, onSelectDate },
    data: {
      visibleDatesRange,
      isJalaali,
      selectedDay,
      shouldDisableBeforeToday,
      computedSelectedRange = { computedSelectedRange },
      disabledBeforeDate,
    },
  } = SinglePickerManager(props);

  return (
    <SinglePickerContext.Provider value={{ data, actions }}>
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
                  componentType="SINGLE_PICKER"
                  days={days}
                  monthId={monthId}
                  isJalaali={isJalaali}
                  selectedRange={{
                    startDate: selectedDay,
                    stopDate: selectedDay,
                  }}
                  computedSelectedRange={computedSelectedRange}
                  onSelectDate={onSelectDate}
                  shouldDisableBeforeToday={shouldDisableBeforeToday}
                  disabledBeforeDate={disabledBeforeDate}
                />
              </React.Fragment>
            ))}
        </section>
      </article>
    </SinglePickerContext.Provider>
  );
};

SinglePicker.defaultProps = {
  numberOfMonths: 1,
  isJalaali: false,
  shouldDisableBeforeToday: true,
  onChangeDate: () => null,
  disabledBeforeDate: null,
  defaultSelectedDay: null,
};

SinglePicker.propTypes = {
  numberOfMonths: PropTypes.number,
  isJalaali: PropTypes.bool,
  shouldDisableBeforeToday: PropTypes.bool,
  onChangeDate: PropTypes.func,
  disabledBeforeDate: PropTypes.string,
  defaultSelectedDay: PropTypes.string,
};

export default SinglePicker;
