import jMoment from "moment-jalaali";
import { DATE_FORMATS } from "../Constants";

const getWeekDayName = ({ date, isJalaali }) => {
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  const dayName = isJalaali
    ? jMoment(date, JALAALI_DATE_FORMAT).format("dddd")
    : jMoment(date, GEORGIAN_DATE_FORMAT).format("dddd");

  return dayName;
};

export default getWeekDayName;
