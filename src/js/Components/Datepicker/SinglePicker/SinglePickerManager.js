import { useState, useEffect, useCallback } from "react";
import { EVENTS, RANGE_SELECT_TYPES } from "../Constants";
import { generateMonth, convertDate, calcuateNextAndPrevMonth } from "../utils";

const SinglePickerManager = (props) => {
  /**
   *
   * props Values
   */
  const {
    isJalaali,
    numberOfMonths,
    shouldDisableBeforeToday,

    // event handlers
    onChangeDate,

    //defaults
    defaultSelectedDay,
  } = props;

  const isInitiatedWithDefaults = !!defaultSelectedDay;

  /**
   *
   * local States
   */
  const [visibleDatesRange, setVisibleDatesRange] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  // DEFAULTS SETUP
  useEffect(() => {
    if (isInitiatedWithDefaults) {
      console.log("xxxxx", defaultSelectedDay);
      setSelectedDay(defaultSelectedDay);
    }
  }, [isInitiatedWithDefaults]);
  // ------------------------------------------------

  useEffect(() => {
    console.log("SELECTED_DAY", selectedDay);
  }, [selectedDay]);

  /**
   *
   * Event listeners
   * TODO:
   *  -
   */
  useEffect(() => {
    window.addEventListener(EVENTS.SINGLE_PICKER.CLEAR, onClearFunction);

    return () => {
      window.removeEventListener(EVENTS.SINGLE_PICKER.CLEAR, onClearFunction);
    };
  }, []);

  /**
   *
   * Effects
   */

  useEffect(() => {
    const today = new Date();

    const datesRange = generateMonth({
      indexDate: today,
      numberOfMonths,
      isJalaali,
    });

    setVisibleDatesRange(datesRange);

    // convert selectedDay and update it
    let { convertedStartDate } = convertSelectedRange(selectedDay);

    setSelectedDay(convertedStartDate);

    // AWARE OUTSIDE
    onChangeDate({
      date: convertedStartDate,
    });
  }, [isJalaali]);

  /**
   * ON Number of month change
   */
  useEffect(() => {
    const today = new Date();

    const datesRange = generateMonth({
      indexDate: today,
      numberOfMonths,
      isJalaali,
    });

    setVisibleDatesRange(datesRange);

    setSelectedDay(selectedDay);
  }, [numberOfMonths]);

  /**
   *
   * handlers
   */
  const handleNavigateMonth = useCallback(
    (e) => {
      const target = e.currentTarget.dataset.name;
      handlePrevAndNextMonth(target);
    },
    [visibleDatesRange]
  );

  const onSelectDate = useCallback(
    (...args) => {
      updateSelectedRange(...args);
    },
    [selectedDay]
  );

  const updateSelectedRange = useCallback(
    ({ e, year, month, day }) => {
      const { START_DATE } = RANGE_SELECT_TYPES;

      setSelectedDay(`${year}-${month}-${day}`);

      // AWARE OUTSIDE
      onChangeDate({ date: `${year}-${month}-${day}` });
    },
    [selectedDay]
  );

  /**
   *
   * Custome Event Dispatche Functions
   */
  const onClearFunction = useCallback(() => {
    setSelectedDay(null);

    onChangeDate({ date: null });
  }, []);

  /**
   *
   * privateFuncs
   */
  const handlePrevAndNextMonth = (type) => {
    const monthId = Object.keys(visibleDatesRange)[0];

    const calculatedNextMonth =
      type === "NEXT" ? numberOfMonths : numberOfMonths * -1;

    const resultDate = calcuateNextAndPrevMonth({
      monthId,
      isJalaali,
      numberOfMonths: calculatedNextMonth,
    });

    setVisibleDatesRange(
      generateMonth({
        indexDate: new Date(resultDate),
        numberOfMonths,
        isJalaali,
      })
    );
  };

  const convertSelectedRange = (day) => {
    let convertedStartDate = null;

    if (day) {
      convertedStartDate = convertDate({
        date: day,
        isJalaali: !isJalaali,
      });
    }

    return { convertedStartDate };
  };

  /**
   *
   * return the result
   */
  return {
    data: {
      isJalaali,
      visibleDatesRange,
      selectedDay,
      shouldDisableBeforeToday,
    },
    actions: { handleNavigateMonth, onSelectDate },
  };
};

export default SinglePickerManager;
