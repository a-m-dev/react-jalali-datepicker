import { createContext, useContext } from "react";

const SinglePickerContext = createContext();

export const useSinglePickerContext = () => useContext(SinglePickerContext);

export default SinglePickerContext;
