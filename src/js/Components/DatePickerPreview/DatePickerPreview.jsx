import React, { useState } from "react";
import Checkbox from "../Datepicker/Checkbox";
import { RangePicker } from "../Datepicker";

// TODO:
// - Checkbox
// - reset Btn
// - exclude custome days handler
// - syncing data jalaali to georgian
//    - convert dates
//    - excluded dates
// - checkbox default label
// - make getUnixUtil , convert ot georgian , convert to jalaali public

const Routes = (props) => {
  const [isJalaali, setIsJalaali] = useState(true);

  return (
    <article className="routes container box">
      <header>
        <h1>Date Picker Preview</h1>
      </header>

      <button onClick={() => setIsJalaali((state) => !state)}>change</button>

      <section>
        <RangePicker
          isJalaali={isJalaali}
          numberOfMonths={2}
          shouldShowExcludeMode={true}
          shouldDisableBeforeToday={true}
          excludeModeComponent={Checkbox}
          excludeModeComponentProps={{ label: "EXCLUDE_MODE" }}
          onExclude={(days) => console.log({ days })}
        />
      </section>
    </article>
  );
};

export default Routes;
