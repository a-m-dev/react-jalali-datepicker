import React from "react";
import PropTypes from "prop-types";

import RangePickerContext from "./RangePickerContext";
import RangePickerManager from "./RangePickerManager";
import "./styles.scss";

const RangePicker = (props) => {
  const { data, actions } = RangePickerManager(props);

  return (
    <RangePickerContext.Provider value={{ data, actions }}>
      <article className="range-picker">THIS_IS_RANGEPICKER</article>
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
