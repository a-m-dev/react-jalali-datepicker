import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";
import WeekdayIndex from "../Constants/WeedayIndex";

const refineDaysForRendering = (monthId, days) => {
  // get desired format
  const { JALAALI_DATE_FORMAT } = DATE_FORMATS;

  const [year, month] = monthId.split("__");

  // convert to jalali
  const jFirstDayOfMonth = jMoment(
    `${year}-${month}-${days[0]}`,
    JALAALI_DATE_FORMAT
  );
  const jLastDayOfMonth = jMoment(
    `${year}-${month}-${days[days.length - 1]}`,
    JALAALI_DATE_FORMAT
  );

  const firstDayBegansAt = jFirstDayOfMonth.format("dddd");
  const lastDayEndsAt = jLastDayOfMonth.format("dddd");

  // console.log({
  //   fdPush: WeekdayIndex.get(firstDayBegansAt),
  //   ldPush: WeekdayIndex.size - WeekdayIndex.get(lastDayEndsAt) - 1,
  // });

  return [
    ...new Array(WeekdayIndex.get(firstDayBegansAt)).fill(null),
    ...days,
    ...new Array(WeekdayIndex.size - WeekdayIndex.get(lastDayEndsAt) - 1).fill(
      null
    ),
  ];
};

export default refineDaysForRendering;
