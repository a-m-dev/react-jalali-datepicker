import React, { useEffect } from "react";
import PropTypes from "prop-types";

import MonthComponent from "../MonthComponent";

import RangePickerContext from "./RangePickerContext";
import RangePickerManager from "./RangePickerManager";
import "./styles.scss";

const RangePicker = (props) => {
  const {
    data,
    actions,
    actions: { handleNavigateMonth, onSelectDate },
    data: {
      visibleDatesRange,
      isJalaali,
      selectedRange,
      isExcludedMode,
      shouldDisableBeforeToday,
      computedSelectedRange = { computedSelectedRange },
    },
  } = RangePickerManager(props);

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
                  selectedRange={selectedRange}
                  isExcludedMode={isExcludedMode}
                  computedSelectedRange={computedSelectedRange}
                  onSelectDate={onSelectDate}
                  shouldDisableBeforeToday={shouldDisableBeforeToday}
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
  shouldDisableBeforeToday: true,
  onExclude: () => null,
  onChangeRange: () => null,
  onExcludeStatusChange: () => null,
  appendExcludeWeekDays: [],
  defaultSelectedRange: { startDate: null, stopDate: null },
};

RangePicker.propTypes = {
  numberOfMonths: PropTypes.number,
  isJalaali: PropTypes.bool,
  shouldDisableBeforeToday: PropTypes.bool,
  onExclude: PropTypes.func,
  onChangeRange: PropTypes.func,
  onExcludeStatusChange: PropTypes.func,
  appendExcludeWeekDays: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedRange: PropTypes.shape({
    startDate: PropTypes.string,
    stopDate: PropTypes.string,
  }),
};

export default RangePicker;
