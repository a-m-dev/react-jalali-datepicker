import React, { useState } from "react";
import { RangePicker } from "../Datepicker";

// TODO:
// - make getUnixUtil , convert ot georgian , convert to jalaali public

const Routes = () => {
  const [isJalaali, setIsJalaali] = useState(true);
  const [excludeSequenceOfDays, setExcludeSequenceOfDays] = useState([]);
  const [isExclutionEnabled, setIsExclutionEnabled] = useState(true);
  const [isExcludedMode, setIsExcludedMode] = useState(false);

  return (
    <article className="routes container box">
      <header>
        <h1>Date Picker Preview</h1>
      </header>

      <button onClick={() => setIsJalaali((state) => !state)}>change</button>
      <button onClick={() => setExcludeSequenceOfDays(["Monday", "Saturday"])}>
        Set Monday and Saturday
      </button>

      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent("clearRangePicker"));
        }}
      >
        Clear datepicker
      </button>

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
        {/* <span>EXCLUDE MODE STATUS</span> */}
      </div>

      <section>
        <RangePicker
          numberOfMonths={2}
          isJalaali={isJalaali}
          shouldDisableBeforeToday={true}
          appendExcludeWeekDays={excludeSequenceOfDays}
          // exclude mode realtes states
          onExcludeStatusChange={({ isExclutionEnabled, isExcludedMode }) => {
            setIsExclutionEnabled(isExclutionEnabled);
            setIsExcludedMode(isExcludedMode);
          }}
          // handlers
          onExclude={(days) => console.log("EXCLUDE_DAYS: ", { days })}
          onChangeRange={({ startDate, stopDate }) =>
            console.log("ON_CHANGE_RANGE: ", { startDate, stopDate })
          }
        />
      </section>
    </article>
  );
};

export default Routes;
