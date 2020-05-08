import { useState, useEffect } from "react";
import generateMonth from "../utils/generateMonth";

const RangePickerManager = (props) => {
  // props Values
  const { isJalaali, numberOfMonths } = props;

  // local States
  const [visibleDatesRange, setVisibleDatesRange] = useState();

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

  useEffect(() => {
    console.log(JSON.stringify({ visibleDatesRange }, null, 2));
  }, [visibleDatesRange]);

  // return the result
  return {
    data: { monthsToShow: numberOfMonths, visibleDatesRange },
    actions: {},
  };
};

export default RangePickerManager;
