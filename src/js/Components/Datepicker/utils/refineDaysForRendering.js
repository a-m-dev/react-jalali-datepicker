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

  const preEmptyDays = new Array(WeekdayIndex.get(firstDayBegansAt)).fill(null);
  const postEmptyDays =
    lastDayEndsAt === "Friday"
      ? []
      : new Array(
          WeekdayIndex.size / 2 - WeekdayIndex.get(lastDayEndsAt) - 1
        ).fill(null);

  // console.log({
  //   lastDayEndsAt,
  //   preEmptyDays,
  //   postEmptyDays,
  //   WeekdayIndex,
  //   WeekdayIndexx: WeekdayIndex.get(lastDayEndsAt) - 1,
  //   // _____ARRAY_____: [...preEmptyDays, ...days, ...postEmptyDays],
  // });

  return [...preEmptyDays, ...days, ...postEmptyDays];
};

export default refineDaysForRendering;
