import jMoment from "moment-jalaali";
import { DATE_FORMATS } from "../Constants";
import computeGeorgianDaysInRange from "./computeGeorgianDaysInRange";
import computeJalaaliDaysInRange from "./computeJalaaliDaysInRange";

const computeDaysInRange = ({ startDate, stopDate, isJalaali }) => {
  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  const _startDate = isJalaali
    ? jMoment(startDate, JALAALI_DATE_FORMAT)
    : jMoment(startDate, GEORGIAN_DATE_FORMAT);

  const _stopDate = isJalaali
    ? jMoment(stopDate, JALAALI_DATE_FORMAT)
    : jMoment(stopDate, GEORGIAN_DATE_FORMAT);

  return isJalaali
    ? computeJalaaliDaysInRange({ _startDate, _stopDate })
    : computeGeorgianDaysInRange({ _startDate, _stopDate });
};

export default computeDaysInRange;
