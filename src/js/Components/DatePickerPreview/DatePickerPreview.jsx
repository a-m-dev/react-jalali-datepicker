import React from "react";
import { RangePicker } from "../Datepicker";

class Routes extends React.Component {
  render() {
    return (
      <article className="routes container box">
        <header>
          <h1>Date Picker Preview</h1>
        </header>

        <section style={{ width: 300 }}>
          <RangePicker isJalaali={true} numberOfMonths={2} />
        </section>
      </article>
    );
  }
}

export default Routes;
