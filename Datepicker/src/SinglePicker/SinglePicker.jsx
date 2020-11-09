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
      shouldDisableAfterToday,
      computedSelectedRange = { computedSelectedRange },
      disabledBeforeDate,
      disabledAfterDate,
      isDateIncludeDisableBound,
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
                  shouldDisableAfterToday={shouldDisableAfterToday}
                  disabledBeforeDate={disabledBeforeDate}
                  disabledAfterDate={disabledAfterDate}
                  isDateIncludeDisableBound={isDateIncludeDisableBound}
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
  shouldDisableBeforeToday: false,
  shouldDisableAfterToday: false,
  onChangeDate: () => null,
  disabledBeforeDate: null,
  disabledAfterDate: null,
  defaultSelectedDay: null,
  isDateIncludeDisableBound: false,
};

SinglePicker.propTypes = {
  numberOfMonths: PropTypes.number,
  isJalaali: PropTypes.bool,
  shouldDisableBeforeToday: PropTypes.bool,
  shouldDisableAfterToday: PropTypes.bool,
  onChangeDate: PropTypes.func,
  disabledBeforeDate: PropTypes.string,
  disabledAfterDate: PropTypes.string,
  defaultSelectedDay: PropTypes.string,
  isDateIncludeDisableBound: PropTypes.bool,
};

export default SinglePicker;
