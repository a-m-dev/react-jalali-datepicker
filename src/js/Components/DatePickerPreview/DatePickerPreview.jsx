import React, { useState, useEffect } from "react";
// import { RangePicker } from "react-jalali-datepicker";
import { RangePicker } from "../Datepicker";

// TODO:
//  - prune setted sequence of days to exclude

const DatePickerPreview = () => {
  const [isJalaali, setIsJalaali] = useState(true);
  const [excludeSequenceOfDays, setExcludeSequenceOfDays] = useState([]);
  const [isExclutionEnabled, setIsExclutionEnabled] = useState(true);
  const [isExcludedMode, setIsExcludedMode] = useState(false);
  // temp
  const [defaultSel, setDefaultSel] = useState({});
  const [defaultExcl, setDefaultExcl] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      console.log("HAPPENS");
      setDefaultSel({
        startDate: isJalaali ? "1399-02-12" : "2020-05-1",
        stopDate: isJalaali ? "1399-03-2" : "2020-05-22",
      });

      setDefaultExcl(
        isJalaali
          ? ["1399-2-14", "1399-02-17", "1399-2-22"]
          : ["2020-05-03", "2020-5-06", "2020-5-11"]
      );
      setExcludeSequenceOfDays(["Monday"]);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(excludeSequenceOfDays, null, 2));
  }, [excludeSequenceOfDays]);

  useEffect(() => {
    if (!isExcludedMode) {
      setExcludeSequenceOfDays([]);
    }
  }, [isExcludedMode]);

  const handleExcludeDay = (target) => {
    const foundIndex = excludeSequenceOfDays.findIndex((el) => el === target);

    if (foundIndex !== -1) {
      const newDays = [
        ...excludeSequenceOfDays.slice(0, foundIndex),
        ...excludeSequenceOfDays.slice(
          foundIndex + 1,
          excludeSequenceOfDays.length
        ),
      ];
      setExcludeSequenceOfDays(newDays);
    } else setExcludeSequenceOfDays((days) => [...days, target]);
  };

  return (
    <article className="routes container box">
      <header>
        <h1>Date Picker Preview</h1>
      </header>

      <button onClick={() => setIsJalaali((state) => !state)}>
        {isJalaali ? "GEORGIAN" : "JALAALI"}
      </button>
      <button
        disabled={isExclutionEnabled || !isExcludedMode}
        onClick={() => handleExcludeDay("Monday")}
      >
        EXCLUDE Monday
      </button>
      <button
        disabled={isExclutionEnabled || !isExcludedMode}
        onClick={() => handleExcludeDay("Sunday")}
      >
        EXCLUDE Sundays
      </button>

      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent("clearRangePicker"));
          setExcludeSequenceOfDays([]);
        }}
      >
        Clear datepicker
      </button>

      <button onClick={() => console.clear()}>CConsole</button>

      <div>
        {/* <input
          type="checkbox"
          checked={isExcludedMode}
          disabled={isExclutionEnabled}
          onChange={() => {
            window.dispatchEvent(
              new CustomEvent("toggleExcludeModeStatus", {
                detail: { isExcludedMode: !isExcludedMode },
              })
            );
          }}
        /> */}
        {/* <span>EXCLUDE MODE STATUS</span> */}
        <button
          disabled={isExclutionEnabled}
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("toggleExcludeModeStatus", {
                detail: { isExcludedMode: !isExcludedMode },
              })
            );
          }}
        >
          {isExcludedMode ? "disable " : "enable "} exclude mode
        </button>
      </div>

      <section>
        <RangePicker
          numberOfMonths={2}
          isJalaali={isJalaali}
          shouldDisableBeforeToday={false}
          appendExcludeWeekDays={excludeSequenceOfDays}
          // handlers
          // onExclude={(days) => console.log("ON_EXCLUDE: ", { days })}
          // onChangeRange={({ startDate, stopDate }) =>
          //   console.log("ON_CHANGE_RANGE: ", { startDate, stopDate })
          // }
          // exclude mode realtes states
          onExcludeStatusChange={({ isExclutionEnabled, isExcludedMode }) => {
            setIsExclutionEnabled(isExclutionEnabled);
            setIsExcludedMode(isExcludedMode);
          }}
          onExcludeDaysSeqChange={(targetDay) => {
            console.log("ON_EXCLUDE_DAYS_SEQ_CHANGE:", { targetDay });
            handleExcludeDay(targetDay);
          }}
          // // defaults
          defaultSelectedRange={defaultSel}
          defaultExcludedDays={defaultExcl}
        />
      </section>
    </article>
  );
};

export default DatePickerPreview;
