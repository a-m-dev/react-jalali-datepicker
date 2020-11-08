import React from "react";

import RangePickerPreview from "./RangePickerPreview/RangePickerPreview";
import SinglePickerPreview from "./SinglePickerPreview/SinglePickerPreview";

const DatePickersPreview = () => {
  return (
    <article className="routes container box">
      <div>
        <header>
          <h1>Date Pickers Preview (range and single)</h1>
        </header>
      </div>
      <SinglePickerPreview />
      <RangePickerPreview />
    </article>
  );
};

export default DatePickersPreview;
