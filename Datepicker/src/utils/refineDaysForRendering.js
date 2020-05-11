import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";
import WeekdayIndex from "../Constants/WeedayIndex";

const refineDaysForRendering = (monthId, days, isJalaali) => {
  // get desired format
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  const [year, month] = monthId.split("__");

  let firstDayBegansAt;
  let lastDayEndsAt;

  const firstDayOfMonth = jMoment(
    `${year}-${month}-${days[0]}`,
    isJalaali ? JALAALI_DATE_FORMAT : GEORGIAN_DATE_FORMAT
  );

  const lastDayOfMonth = jMoment(
    `${year}-${month}-${days[days.length - 1]}`,
    isJalaali ? JALAALI_DATE_FORMAT : GEORGIAN_DATE_FORMAT
  );

  firstDayBegansAt = firstDayOfMonth.format("dddd");
  lastDayEndsAt = lastDayOfMonth.format("dddd");

  return [
    ...new Array(WeekdayIndex.get(firstDayBegansAt)).fill(null),
    ...days,
    ...new Array(WeekdayIndex.size - WeekdayIndex.get(lastDayEndsAt) - 1).fill(
      null
    ),
  ];
};

export default refineDaysForRendering;
