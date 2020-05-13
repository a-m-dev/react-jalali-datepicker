import { useState, useEffect, useCallback } from "react";
import jMoment from "moment-jalaali";
import { DATE_FORMATS, RANGE_SELECT_TYPES, Events } from "../Constants";
import {
  generateMonth,
  getDateUnix,
  getUnixOfDate,
  convertDate,
  calcuateNextAndPrevMonth,
  computeDaysInRange,
} from "../utils";

const RangePickerManager = (props) => {
  /**
   *
   * props Values
   */
  const {
    isJalaali,
    numberOfMonths,
    excludeModeComponent,
    excludeModeComponentProps,
    onExclude,
    shouldDisableBeforeToday,
    onChangeRange,
    appendExcludeWeekDays,
    onExcludeStatusChange,
  } = props;

  /**
   *
   * local States
   */
  const [visibleDatesRange, setVisibleDatesRange] = useState([]);
  const [isExcludedMode, setIsExcludedMode] = useState(false);
  const [isExclutionEnabled, setIsExclutionEnabled] = useState(true);
  const [excludedDates, setExcludedDates] = useState([]);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    stopDate: null,
  });
  const [computedSelectedRange, setComputedSelectedRange] = useState({});

  useEffect(() => {
    window.addEventListener(Events.RANGE_PICKER.CLEAR, onClearFunction);
    window.addEventListener(
      Events.RANGE_PICKER.TOGGLE_EXCLUDE_MODE,
      handleExcludeMode
    );

    return () => {
      window.removeEventListener(Events.RANGE_PICKER.CLEAR, onClearFunction);
      window.removeEventListener(
        Events.RANGE_PICKER.TOGGLE_EXCLUDE_MODE,
        handleExcludeMode
      );
    };
  }, []);

  /**
   *
   * Effects
   */
  useEffect(() => {
    console.log("EFFECT: ", { computedSelectedRange });
  }, [computedSelectedRange]);

  useEffect(() => {
    const today = new Date();

    const datesRange = generateMonth({
      indexDate: today,
      numberOfMonths,
      isJalaali,
    });

    setVisibleDatesRange(datesRange);

    // convert selectedRange and update it
    const { convertedStartDate, convertedStopDate } = convertSelectedRange(
      selectedRange
    );
    setSelectedRange({
      startDate: convertedStartDate,
      stopDate: convertedStopDate,
    });

    // convert computedSelectedRange and update it
    setComputedSelectedRange((computedSelectedRange) => {
      console.log("OLD", { computedSelectedRange });
      return manageComputedSelectedRange({
        oldState: computedSelectedRange,
        newState: computeDaysInRange({
          startDate: convertedStartDate,
          stopDate: convertedStopDate,
          isJalaali,
        }),
      });
    });

    // convert exclusion days
    // const convertedExcludedDays = excludedDates.map((date) =>
    //   convertDate({ date: date, isJalaali: !isJalaali })
    // );
    // setExcludedDates(convertedExcludedDays);
    // onExclude(convertedExcludedDays);

    // call onChange Range
    // onChangeRange({
    //   startDate: convertedStartDate,
    //   stopDate: convertedStopDate,
    // });
  }, [isJalaali]);

  // exclude
  useEffect(() => {
    if (isExcludedMode) {
      const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

      const ONE_DAY_IN_UNIX = 24 * 60 * 60;

      const { startDate, stopDate } = selectedRange;
      const startDate_unix = getDateUnix({ date: startDate, isJalaali });
      const stopDate_unix = getDateUnix({ date: stopDate, isJalaali });

      const targetDaysTracer = [];

      for (
        let i = startDate_unix + ONE_DAY_IN_UNIX;
        i < stopDate_unix;
        i = i + ONE_DAY_IN_UNIX
      ) {
        const iterationDate = getUnixOfDate({ unix: i, isJalaali });
        const dayName = jMoment(
          iterationDate,
          isJalaali ? JALAALI_DATE_FORMAT : GEORGIAN_DATE_FORMAT
        ).format("dddd");

        const foundIndex = appendExcludeWeekDays.findIndex(
          (weekDay) => weekDay === dayName
        );

        if (foundIndex !== -1)
          targetDaysTracer.push(
            iterationDate
              .split("-")
              .map((el) => Number(el))
              .join("-")
          );
      }

      console.log({ targetDaysTracer });

      setComputedSelectedRange((computedSelectedRange) =>
        toggleComputedSelectedRangeItems(
          computedSelectedRange,
          targetDaysTracer,
          "BULK"
        )
      );

      // setExcludedDates((excludedDates) => [
      //   ...excludedDates,
      //   ...targetDaysTracer,
      // ]);
    }
  }, [appendExcludeWeekDays, selectedRange]);

  // useEffect(() => {
  //   onExclude(excludedDates);
  // }, [excludedDates]);

  // api to aware user of exclude status change
  useEffect(() => {
    onExcludeStatusChange({ isExclutionEnabled, isExcludedMode });
  }, [isExclutionEnabled, isExcludedMode]);

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
      if (isExcludedMode && !isExclutionEnabled) {
        handleExcludeDays(...args);
      } else {
        updateSelectedRange(...args);
      }
    },
    [selectedRange, isExcludedMode, isExclutionEnabled]
  );

  const updateSelectedRange = useCallback(
    ({ e, year, month, day }) => {
      const { START_DATE, STOP_DATE } = RANGE_SELECT_TYPES;

      const { startDate, stopDate } = selectedRange;

      const targetDate = `${year}-${month}-${day}`;
      let resultedStartDate = startDate;
      let resultedStopDate = stopDate;

      let type;
      if (startDate !== null && stopDate !== null) {
        type = START_DATE;

        resultedStartDate = targetDate;
        resultedStopDate = null;
      } else if (startDate !== null) {
        const selectedDate_unix = getDateUnix({ date: targetDate, isJalaali });
        const startDate_unix = getDateUnix({ date: startDate, isJalaali });

        if (selectedDate_unix < startDate_unix) {
          type = START_DATE;

          resultedStartDate = targetDate;
          resultedStopDate = null;
        } else {
          type = STOP_DATE;
          // start remains the same value, no need to change it
          resultedStopDate = targetDate;
        }
      } else if (startDate == null) {
        type = START_DATE;

        resultedStartDate = targetDate;
        resultedStopDate = null;
      } else if (startDate !== null && stopDate == null) {
        type = STOP_DATE;

        // start remain the same
        resultedStopDate = targetDate;
      }

      // check for exclusion mode
      if (type === STOP_DATE && resultedStopDate !== null)
        setIsExclutionEnabled(false);
      else if (type === START_DATE) {
        setIsExclutionEnabled(true);
        setIsExcludedMode(false);
        setExcludedDates([]);
      }

      // set State
      setSelectedRange({
        startDate: resultedStartDate,
        stopDate: resultedStopDate,
      });

      if (resultedStartDate !== null && resultedStopDate !== null) {
        // console.log(
        setComputedSelectedRange(
          computeDaysInRange({
            startDate: resultedStartDate,
            stopDate: resultedStopDate,
            isJalaali,
          })
        );
        // );
      }

      // onChangeRange({
      //   startDate: resultedStartDate,
      //   stopDate: resultedStopDate,
      // });
    },
    [selectedRange]
  );

  const handleExcludeDays = useCallback(
    (args) => {
      const { e, year, month, day } = args;
      const { startDate, stopDate } = selectedRange;

      const date = `${year}-${month}-${day}`;

      const currentDateUnix = getDateUnix({ date, isJalaali });
      const startDateUnix = getDateUnix({ date: startDate, isJalaali });
      const stopDateUnix = getDateUnix({ date: stopDate, isJalaali });

      if (currentDateUnix <= startDateUnix || currentDateUnix >= stopDateUnix)
        return;

      console.log({ date });

      // find if already added
      // setExcludedDates((excludedDates) =>
      //   manageExcludedState(excludedDates, date)
      // );

      // TODO:
      // - find target day from hash
      // - make isIncluded to toggle
      setComputedSelectedRange((computedSelectedRange) =>
        toggleComputedSelectedRangeItems(
          computedSelectedRange,
          [date],
          "SINGLE"
        )
      );
    },
    [selectedRange, computedSelectedRange /*excludedDates*/]
  );

  /**
   *
   * Custome Event Dispatche Functions
   */
  const onClearFunction = useCallback(() => {
    setSelectedRange({ startDate: null, stopDate: null });
    setExcludedDates([]);
    setIsExclutionEnabled(true);
    setIsExcludedMode(false);
    setComputedSelectedRange({});
  }, []);

  const handleExcludeMode = useCallback(
    (event) => {
      setIsExcludedMode(event.detail.isExcludedMode);
    },
    [setIsExcludedMode, selectedRange]
  );

  /**
   *
   * privateFuncs
   */
  const handlePrevAndNextMonth = (type) => {
    const monthId = Object.keys(visibleDatesRange)[0];

    const resultDate = calcuateNextAndPrevMonth({
      monthId,
      isJalaali,
      numberOfMonths: type === "NEXT" ? numberOfMonths : numberOfMonths * -1,
    });

    setVisibleDatesRange(
      generateMonth({
        indexDate: new Date(resultDate),
        numberOfMonths,
        isJalaali,
      })
    );
  };

  // const manageExcludedState = (days, selectedDay) => {
  //   const foundIndex = days.findIndex(
  //     (el) =>
  //       getDateUnix({ date: el, isJalaali }) ===
  //       getDateUnix({ date: selectedDay, isJalaali })
  //   );

  //   if (foundIndex < 0) {
  //     return [...days, selectedDay];
  //   } else {
  //     return [
  //       ...days.slice(0, foundIndex),
  //       ...days.slice(foundIndex + 1, days.length),
  //     ];
  //   }
  // };

  const toggleComputedSelectedRangeItems = (
    oldState,
    dates,
    type = "SINGLE"
  ) => {
    console.log("OLD -->>", { oldState });

    // const newState = { ...oldState };

    // dates.forEach((date) => {
    //   newState[date] = {
    //     ...newState[date],
    //     isIncluded: !newState[date]["isIncluded"],
    //   };
    // });

    let x = {};

    Object.entries(oldState).forEach(([date, state]) => {
      const isExsists = dates.some((dt) => dt === date);

      if (isExsists && type === "SINGLE") {
        state.isIncluded = !state.isIncluded;
        if (state.isInSequence && state.isIncluded) {
          state.forceIncluded = true;
        }
        Object.assign(x, { [date]: state });
      } else if (!isExsists && type === "BULK" && state.isInSequence) {
        state.isIncluded = true;
        state.isInSequence = false;
        if (state.forceIncluded) {
          state.forceIncluded = false;
        }
        Object.assign(x, { [date]: state });
      } else if (isExsists) {
        state.isIncluded = false;
        if (type === "BULK") {
          state.isInSequence = true;
          if (state.forceIncluded) {
            state.isIncluded = true;
            state.forceIncluded = true;
          }
        }
        Object.assign(x, { [date]: state });
      }
    });

    console.log("XXXX", { x });

    return { ...oldState, ...x };
  };

  const convertSelectedRange = ({ startDate, stopDate }) => {
    let convertedStartDate = null;
    let convertedStopDate = null;

    if (startDate) {
      convertedStartDate = convertDate({
        date: startDate,
        isJalaali: !isJalaali,
      });

      if (stopDate) {
        convertedStopDate = convertDate({
          date: stopDate,
          isJalaali: !isJalaali,
        });
      }
    }

    return { convertedStartDate, convertedStopDate };
  };

  const manageComputedSelectedRange = ({ oldState, newState }) => {
    if (oldState == null || newState == null) return;
    console.log({ oldState, newState });
    const result = {};
    Object.entries(newState).forEach(([key, value], i) => {
      return (result[key] = Object.values(oldState)[i]);
    });

    console.log({ result });

    return result;
  };

  /**
   *
   * return the result
   */
  return {
    data: {
      isJalaali,
      monthsToShow: numberOfMonths,
      visibleDatesRange,
      selectedRange,
      ExcludeModeComponent: excludeModeComponent,
      excludeModeComponentProps,
      isExcludedMode,
      excludedDates,
      shouldDisableBeforeToday,
      computedSelectedRange,
    },
    actions: { handleNavigateMonth, onSelectDate },
  };
};

export default RangePickerManager;
