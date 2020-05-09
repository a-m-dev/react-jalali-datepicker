import { useState, useEffect, useCallback } from "react";
import generateMonth from "../utils/generateMonth";

const RangePickerManager = (props) => {
  // props Values
  const { isJalaali, numberOfMonths } = props;

  // local States
  const [visibleDatesRange, setVisibleDatesRange] = useState([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    stopDate: null,
  });

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
    setCurrentMonthIndex(getMonthIndex(Object.keys(datesRange)[0]));
  }, []);

  // handlers
  const handleNavigateMonth = useCallback((e) => {
    const target = e.currentTarget.dataset.name;

    switch (target) {
      case "NEXT":
        console.log("NEXT_CLICKED");
        break;
      case "PREV":
        console.log("PREV_CLICKED");
        break;

      default:
        break;
    }
  }, []);

  const updateSelectedRange = useCallback(
    (date) => {
      console.log({ date });
    },
    [selectedRange, setSelectedRange]
  );

  // private functions
  const getMonthIndex = (monthId) => Number(monthId.split("__")[1]);

  // return the result
  return {
    data: {
      isJalaali,
      monthsToShow: numberOfMonths,
      visibleDatesRange,
      selectedRange,
    },
    actions: { handleNavigateMonth, updateSelectedRange },
  };
};

export default RangePickerManager;
