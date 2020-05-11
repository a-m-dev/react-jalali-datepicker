import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";

const convertToGeorgian = (date) => {
  if (!date instanceof jMoment) return;

  const { GEORGIAN_DATE_FORMAT, JALAALI_DATE_FORMAT } = DATE_FORMATS;

  const resultDate = jMoment(date, JALAALI_DATE_FORMAT).format(
    GEORGIAN_DATE_FORMAT
  );

  return resultDate;
};

export default convertToGeorgian;
