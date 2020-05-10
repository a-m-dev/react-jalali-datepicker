import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";

const getUnixOfDate = ({ unix, isJalaali }) => {
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  return isJalaali
    ? jMoment.unix(unix).format(JALAALI_DATE_FORMAT)
    : jMoment.unix(unix).format(GEORGIAN_DATE_FORMAT);
};

export default getUnixOfDate;
