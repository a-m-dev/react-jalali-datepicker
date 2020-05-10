import React, { useState } from "react";
import Checkbox from "../Datepicker/Checkbox";
import { RangePicker } from "../Datepicker";

// TODO:
// - Checkbox
// - reset Btn
// - make getUnixUtil , convert ot georgian , convert to jalaali public

const Routes = (props) => {
  const [isJalaali, setIsJalaali] = useState(true);
  const [excludeSequenceOfDays, setExcludeSequenceOfDays] = useState([]);

  return (
    <article className="routes container box">
      <header>
        <h1>Date Picker Preview</h1>
      </header>

      <button onClick={() => setIsJalaali((state) => !state)}>change</button>
      <button onClick={() => setExcludeSequenceOfDays(["Monday", "Saturday"])}>
        Set Monday and Saturday
      </button>

      <section>
        <RangePicker
          isJalaali={isJalaali}
          numberOfMonths={1}
          shouldShowExcludeMode={true}
          shouldDisableBeforeToday={false}
          appendExcludeWeekDays={excludeSequenceOfDays}
          excludeModeComponent={Checkbox}
          excludeModeComponentProps={{ label: "Exclude" }}
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
