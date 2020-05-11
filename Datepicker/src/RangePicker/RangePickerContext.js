import { createContext, useContext } from "react";

const RangePickerContext = createContext();

export const useRangePickerContext = () => useContext(RangePickerContext);

export default RangePickerContext;
