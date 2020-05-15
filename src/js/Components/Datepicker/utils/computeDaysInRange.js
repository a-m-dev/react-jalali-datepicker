import jMoment from "moment-jalaali";
import { DATE_FORMATS } from "../Constants";
import computeGeorgianDaysInRange from "./computeGeorgianDaysInRange";
import computeJalaaliDaysInRange from "./computeJalaaliDaysInRange";

const computeDaysInRange = ({ startDate, stopDate, isJalaali }) => {
  if (startDate == null || stopDate == null) return;

  const { JALAALI_DATE_FORMAT, GEORGIAN_DATE_FORMAT } = DATE_FORMATS;

  const [startYear, startMonth, startDay] = startDate
    .split("-")
    .map((el) => Number(el));
  const [stopYear, stopMonth, stopDay] = stopDate
    .split("-")
    .map((el) => Number(el));

  const _startDate = isJalaali
    ? jMoment(`${startYear}-${startMonth}-${startDay}`, JALAALI_DATE_FORMAT)
    : jMoment(`${startYear}-${startMonth}-${startDay}`, GEORGIAN_DATE_FORMAT);

  const _stopDate = isJalaali
    ? jMoment(`${stopYear}-${stopMonth}-${stopDay}`, JALAALI_DATE_FORMAT)
    : jMoment(`${stopYear}-${stopMonth}-${stopDay}`, GEORGIAN_DATE_FORMAT);

  return isJalaali
    ? computeJalaaliDaysInRange({ _startDate, _stopDate })
    : computeGeorgianDaysInRange({ _startDate, _stopDate });
};

export default computeDaysInRange;
