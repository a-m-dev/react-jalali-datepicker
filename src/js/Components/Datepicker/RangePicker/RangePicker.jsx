import React from "react";
import PropTypes from "prop-types";

import MonthComponent from "../MonthComponent";

import Checkbox from "../Checkbox";
import RangePickerContext from "./RangePickerContext";
import RangePickerManager from "./RangePickerManager";
import "./styles.scss";

const RangePicker = (props) => {
  const {
    data,
    actions,
    actions: { handleNavigateMonth, onSelectDate, handleExcludeMode },
    data: {
      visibleDatesRange,
      isJalaali,
      selectedRange,
      shouldShowExcludeMode,
      ExcludeModeComponent,
      excludeModeComponentProps,
      isExcludedMode,
      isExclutionEnabled,
      excludedDates,
      shouldDisableBeforeToday,
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
                  excludedDates={excludedDates}
                  onSelectDate={onSelectDate}
                  shouldDisableBeforeToday={shouldDisableBeforeToday}
                />
              </React.Fragment>
            ))}
        </section>

        {shouldShowExcludeMode && (
          <ExcludeModeComponent
            {...excludeModeComponentProps}
            onChange={handleExcludeMode}
            checked={isExcludedMode}
            disabled={isExclutionEnabled}
          />
        )}
      </article>
    </RangePickerContext.Provider>
  );
};

RangePicker.defaultProps = {
  numberOfMonths: 1,
  isJalaali: false,
  shouldShowExcludeMode: false,
  excludeModeComponent: Checkbox,
  shouldDisableBeforeToday: true,
  onExclude: () => null,
  onChangeRange: () => null,
};

RangePicker.propTypes = {
  numberOfMonths: PropTypes.number,
  isJalaali: PropTypes.bool,
  shouldShowExcludeMode: PropTypes.bool,
  excludeModeComponent: PropTypes.any,
  shouldDisableBeforeToday: PropTypes.bool,
  onExclude: PropTypes.func,
  onChangeRange: PropTypes.func,
};

export default RangePicker;
