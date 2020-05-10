import jMoment from "moment-jalaali";
import DATE_FORMATS from "../Constants/DateFormats";

const convertDate = ({ date, isJalaali }) => {
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  const [year, month, day] = date.split("-").map((el) => Number(el));

  return isJalaali
    ? jMoment(`${year}-${month}-${day}`, JALAALI_DATE_FORMAT).format(
        GEORGIAN_DATE_FORMAT
      )
    : jMoment(`${year}-${month}-${day}`, GEORGIAN_DATE_FORMAT).format(
        JALAALI_DATE_FORMAT
      );
};

export default convertDate;
