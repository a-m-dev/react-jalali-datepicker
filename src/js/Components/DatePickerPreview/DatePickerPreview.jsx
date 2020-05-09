import React from "react";
import Checkbox from "../Checkbox";
import { RangePicker } from "../Datepicker";

class Routes extends React.Component {
  render() {
    return (
      <article className="routes container box">
        <header>
          <h1>Date Picker Preview</h1>
        </header>

        <section>
          <RangePicker
            isJalaali={true}
            numberOfMonths={2}
            shouldShowExcludeMode={true}
            // excludeModeComponent={Checkbox}
            excludeModeComponentProps={{ label: "EXCLUDE_MODE" }}
            onExclude={(days) => console.log({ days })}
          />
        </section>
      </article>
    );
  }
}

export default Routes;
