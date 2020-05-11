import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";

const getDateUnix = ({ date, isJalaali }) => {
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  const [year, month, day] = date.split("-").map((el) => Number(el));

  return isJalaali
    ? jMoment(`${year}-${month}-${day}`, JALAALI_DATE_FORMAT).unix()
    : jMoment(`${year}-${month}-${day}`, GEORGIAN_DATE_FORMAT).unix();
};

export default getDateUnix;
