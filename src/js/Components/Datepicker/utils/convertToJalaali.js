import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";

const convertToJalaali = (date) => {
  if (!date instanceof Date) return;

  const { GEORGIAN_DATE_FORMAT, JALAALI_DATE_FORMAT } = DATE_FORMATS;

  return jMoment(date, GEORGIAN_DATE_FORMAT).format(JALAALI_DATE_FORMAT);
};

export default convertToJalaali;
