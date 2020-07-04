import React, { useEffect, useState } from "react";
import useMediaQuery from "../../Datepicker/hooks/useMediaQuery";
import { SinglePicker } from "../../Datepicker";

const SinglePickerPreview = () => {
  const { isMobile, isTablet, isPc } = useMediaQuery();

  const [isJalaali, setIsJalaali] = useState(true);
  // temp
  const [defaultSelectedDay, setDefaultSelectedDay] = useState(null);
  const [disabledBeforeDate, setDisabledBeforeDate] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setDefaultSelectedDay(isJalaali ? "1399-5-28" : "2020-07-26");
      setDisabledBeforeDate(isJalaali ? "1399-5-26" : "2020-07-21");
    }, 2200);
  }, []);

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
          <h1>Single Date Picker Preview</h1>
        </header>

        <button onClick={() => setIsJalaali((state) => !state)}>
          {isJalaali ? "GEORGIAN" : "JALAALI"}
        </button>

        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("clearSinglePicker"));
          }}
        >
          Clear datepicker
        </button>

        <button onClick={() => console.clear()}>CConsole</button>
      </div>

      <section>
        <SinglePicker
          numberOfMonths={numberOfMonths}
          isJalaali={isJalaali}
          shouldDisableBeforeToday={false}
          // handlers
          onChangeDate={({ date }) =>
            console.log(" ON_CHANGE_SINGLE_DATE: ", { date })
          }
          defaultSelectedDay={defaultSelectedDay}
          disabledBeforeDate={disabledBeforeDate}
        />
      </section>
    </article>
  );
};

export default SinglePickerPreview;
