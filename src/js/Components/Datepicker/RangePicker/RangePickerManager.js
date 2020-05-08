import { useState, useEffect } from "react";
import generateMonth from "../utils/generateMonth";

const RangePickerManager = (props) => {
  // props Values
  const { isJalaali, numberOfMonths } = props;

  // local States
  const [visibleDatesRange, setVisibleDatesRange] = useState([]);

  // Effects
  // initialize component with today
  useEffect(() => {
    const today = new Date();

    const datesRange = generateMonth({
      indexDate: today,
      numberOfMonths,
      isJalaali,
    });

    setVisibleDatesRange(datesRange);
  }, []);

  // return the result
  return {
    data: { monthsToShow: numberOfMonths, visibleDatesRange },
    actions: {},
  };
};

export default RangePickerManager;
