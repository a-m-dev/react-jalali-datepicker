import React, { useState, useEffect } from "react";
// import { RangePicker } from "react-jalali-datepicker";
import useMediaQuery from "../../Datepicker/hooks/useMediaQuery";
import { RangePicker } from "../../Datepicker";

// TODO:
//  - prune setted sequence of days to exclude

const RangePickerPreview = () => {
  const { isMobile, isTablet, isPc } = useMediaQuery();

  const [isJalaali, setIsJalaali] = useState(true);
  const [excludeSequenceOfDays, setExcludeSequenceOfDays] = useState([]);
  const [isExclutionEnabled, setIsExclutionEnabled] = useState(true);
  const [isExcludedMode, setIsExcludedMode] = useState(false);
  // temp
  const [defaultSel, setDefaultSel] = useState({});
  const [defaultExcl, setDefaultExcl] = useState([]);

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("2 happened");
    //   setNumberOfMonths(2);
    // }, 2 * 1000);
    // setTimeout(() => {
    //   console.log("3 happened");
    //   setNumberOfMonths(3);
    // }, 4 * 1000);
    setTimeout(() => {
      // console.log("HAPPENS");
      setDefaultSel({
        startDate: isJalaali ? "1399-06-12" : "2020-08-2",
        stopDate: isJalaali ? "1399-06-22" : "2020-08-12",
      });
      setDefaultExcl(
        isJalaali
          ? ["1399-6-14", "1399-06-17", "1399-6-22"]
          : ["2020-08-04", "2020-8-07", "2020-8-12"]
      );
      setExcludeSequenceOfDays(["Monday"]);
    }, 2200);
  }, []);

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

  let numberOfMonths = 0;

  switch (true) {
    case isMobile:
      numberOfMonths = 1;
      break;
    case isTablet:
      numberOfMonths = 2;
      break;
    case isPc:
      numberOfMonths = 3;
      break;
    default:
      numberOfMonths = 1;
  }

  return (
    <article className="routes container box">
      <div>
        <header>
          <h1>Range Date Picker Preview</h1>
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
      </div>

      <section>
        <RangePicker
          numberOfMonths={numberOfMonths}
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

export default RangePickerPreview;
