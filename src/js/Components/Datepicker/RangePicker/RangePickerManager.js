import { useState, useEffect, useCallback } from "react";
import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";
import RANGE_SELECT_TYPES from "../Constants/RangeSelectTypes";
import generateMonth from "../utils/generateMonth";
import calcuateNextAndPrevMonth from "../utils/calcuateNextAndPrevMonth";

const RangePickerManager = (props) => {
  // props Values
  const {
    isJalaali,
    numberOfMonths,
    shouldShowExcludeMode,
    excludeModeComponent,
    excludeModeComponentProps,
    onExclude,
  } = props;

  // local States
  const [visibleDatesRange, setVisibleDatesRange] = useState([]);
  const [isExcludedMode, setIsExcludedMode] = useState(false);
  const [isExclutionEnabled, setIsExclutionEnabled] = useState(true);
  const [excludedDates, setExcludedDates] = useState([]);
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
  }, []);

  useEffect(() => {
    onExclude(excludedDates);
  }, [excludedDates]);

  // IMPORTANT
  // TODO:
  useEffect(() => {
    // TODO:
    //  - call on Exclude with array of spesifica locale
    // onExclude()
  }, [isJalaali]);

  // handlers
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
    [
      selectedRange,
      setSelectedRange,
      isExcludedMode,
      setIsExcludedMode,
      isExclutionEnabled,
      setIsExclutionEnabled,
    ]
  );

  const updateSelectedRange = useCallback(
    ({ e, year, month, day }) => {
      const { START_DATE, STOP_DATE } = RANGE_SELECT_TYPES;
      const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

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
        const selectedDate_unix = isJalaali
          ? jMoment(`${year}-${month}-${day}`, JALAALI_DATE_FORMAT).unix()
          : jMoment(`${year}-${month}-${day}`, GEORGIAN_DATE_FORMAT).unix();

        const [_year, _month, _day] = startDate
          .split("-")
          .map((el) => Number(el));
        const startDate_unix = isJalaali
          ? jMoment(`${_year}-${_month}-${_day}`, JALAALI_DATE_FORMAT).unix()
          : jMoment(`${_year}-${_month}-${_day}`, GEORGIAN_DATE_FORMAT).unix();

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

      setSelectedRange({
        startDate: resultedStartDate,
        stopDate: resultedStopDate,
      });
    },
    [selectedRange, setSelectedRange]
  );

  const handleExcludeDays = useCallback(
    (args) => {
      const { e, year, month, day } = args;
      const { startDate, stopDate } = selectedRange;

      const currentDateUnix = getDateUnixTime(`${year}-${month}-${day}`);
      const startDateUnix = getDateUnixTime(startDate);
      const stopDateUnix = getDateUnixTime(stopDate);

      if (currentDateUnix <= startDateUnix || currentDateUnix >= stopDateUnix)
        return;

      setExcludedDates((excludedDates) => [
        ...excludedDates,
        `${year}-${month}-${day}`,
      ]);
    },
    [selectedRange, excludedDates, setExcludedDates]
  );

  const handleExcludeMode = useCallback(
    (event) => {
      if (!selectedRange.startDate && !selectedRange.stopDate) return;
      setIsExcludedMode(event.target.checked);
    },
    [isExcludedMode, setIsExcludedMode, selectedRange]
  );

  // privateFuncs
  const handlePrevAndNextMonth = (type) => {
    const monthId = Object.keys(visibleDatesRange)[0];

    // TODO:
    //  - call generate date for this
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

  const getDateUnixTime = (date) => {
    const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

    const [year, month, day] = date.split("-").map((el) => Number(el));

    return isJalaali
      ? jMoment(`${year}-${month}-${day}`, JALAALI_DATE_FORMAT).unix()
      : jMoment(`${year}-${month}-${day}`, GEORGIAN_DATE_FORMAT).unix();
  };

  // return the result
  return {
    data: {
      isJalaali,
      monthsToShow: numberOfMonths,
      visibleDatesRange,
      selectedRange,
      shouldShowExcludeMode,
      ExcludeModeComponent: excludeModeComponent,
      excludeModeComponentProps,
      isExcludedMode,
      isExclutionEnabled,
      excludedDates,
    },
    actions: { handleNavigateMonth, onSelectDate, handleExcludeMode },
  };
};

export default RangePickerManager;
