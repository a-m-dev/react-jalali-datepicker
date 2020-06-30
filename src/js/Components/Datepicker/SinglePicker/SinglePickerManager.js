import { useState, useEffect, useCallback } from "react";
import {
    EVENTS,
    RANGE_SELECT_TYPES,
} from "../Constants";
import {
    generateMonth,
    getDateUnix,
    convertDate,
    calcuateNextAndPrevMonth,
    computeDaysInRange,
} from "../utils";

const SinglePickerManager = (props) => {
    /**
     *
     * props Values
     */
    const {
        isJalaali,
        numberOfMonths,
        shouldDisableBeforeToday,

        // event handlers
        onChangeDate,

        //defaults
        defaultSelectedRange: {
            startDate: defaultStartDate,
        },
    } = props;

    const isInitiatedWithDefaults = !!defaultStartDate;

    /**
     *
     * local States
     */
    const [visibleDatesRange, setVisibleDatesRange] = useState([]);
    const [selectedRange, setSelectedRange] = useState({
        startDate: null,
    });
    const [computedSelectedRange, setComputedSelectedRange] = useState({});

    // DEFAULTS SETUP
    useEffect(() => {
        if (isInitiatedWithDefaults) {
            // default selected range
            const defaultSelectedRange = {
                startDate: defaultStartDate,
            };

            setSelectedRange(defaultSelectedRange);

            // compute selected range
            const startDate = isJalaali
                ? defaultStartDate
                : convertDate({ date: defaultStartDate, isJalaali: true });

            setComputedSelectedRange(
                computeDaysInRange({
                    startDate,
                    isJalaali,
                })
            );
        }
    }, [isInitiatedWithDefaults]);
    // ------------------------------------------------

    /**
     *
     * Event listeners
     * TODO:
     *  -
     */
    useEffect(() => {
        window.addEventListener(EVENTS.SINGLE_PICKER.CLEAR, onClearFunction);

        return () => {
            window.removeEventListener(EVENTS.SINGLE_PICKER.CLEAR, onClearFunction);
        };
    }, []);

    /**
     *
     * Effects
     */

    useEffect(() => {
        const today = new Date();

        const datesRange = generateMonth({
            indexDate: today,
            numberOfMonths,
            isJalaali,
        });

        setVisibleDatesRange(datesRange);

        // convert selectedRange and update it
        let { convertedStartDate } = convertSelectedRange(
            selectedRange
        );

        setSelectedRange({
            startDate: convertedStartDate,
        });

        // convert computedSelectedRange and update it
        setComputedSelectedRange((computedSelectedRange) => {
            return manageComputedSelectedRange({
                oldState: computedSelectedRange,
                newState: computeDaysInRange({
                    startDate: convertedStartDate,
                    isJalaali,
                }),
            });
        });

        // AWARE OUTSIDE
        onChangeDate({
            date: convertedStartDate,
        });
    }, [isJalaali]);

    /**
     * ON Number of month change
     */
    useEffect(() => {
        const today = new Date();

        const datesRange = generateMonth({
            indexDate: today,
            numberOfMonths,
            isJalaali,
        });

        setVisibleDatesRange(datesRange);

        setSelectedRange(selectedRange);
    }, [numberOfMonths]);

    /**
     *
     * handlers
     */
    const handleNavigateMonth = useCallback(
        (e) => {
            const target = e.currentTarget.dataset.name;
            handlePrevAndNextMonth(target);
        },
        [visibleDatesRange]
    );

    const onSelectDate = useCallback(
        (...args) => {
                updateSelectedRange(...args);
        },
        [selectedRange]
    );

    const updateSelectedRange = useCallback(
        ({ e, year, month, day }) => {
            const { START_DATE } = RANGE_SELECT_TYPES;

            const { startDate } = selectedRange;

            const targetDate = `${year}-${month}-${day}`;
            let resultedStartDate = startDate;

            let type;
            if (startDate !== null) {
                type = START_DATE;

                resultedStartDate = targetDate;
            } else if (startDate !== null) {
                const selectedDate_unix = getDateUnix({ date: targetDate, isJalaali });
                const startDate_unix = getDateUnix({ date: startDate, isJalaali });

                if (selectedDate_unix < startDate_unix) {
                    type = START_DATE;

                    resultedStartDate = targetDate;
                }
            } else if (startDate == null) {
                type = START_DATE;

                resultedStartDate = targetDate;
            }
            if (type === START_DATE) {
                setComputedSelectedRange({});
            }

            // set State
            setSelectedRange({
                startDate: resultedStartDate,
            });

            if (resultedStartDate !== null) {
                setComputedSelectedRange(
                    computeDaysInRange({
                        startDate: resultedStartDate,
                        isJalaali,
                    })
                );
            }

            // AWARE OUTSIDE
            onChangeDate({
                date: resultedStartDate,
            });
        },
        [selectedRange]
    );

    /**
     *
     * Custome Event Dispatche Functions
     */
    const onClearFunction = useCallback(() => {
        setSelectedRange({ startDate: null });
        setComputedSelectedRange({});

        onChangeDate({ date: null });
    }, [computedSelectedRange]);

    /**
     *
     * privateFuncs
     */
    const handlePrevAndNextMonth = (type) => {
        const monthId = Object.keys(visibleDatesRange)[0];

        const calculatedNextMonth =
            type === "NEXT" ? numberOfMonths : numberOfMonths * -1;

        const resultDate = calcuateNextAndPrevMonth({
            monthId,
            isJalaali,
            numberOfMonths: calculatedNextMonth,
        });

        setVisibleDatesRange(
            generateMonth({
                indexDate: new Date(resultDate),
                numberOfMonths,
                isJalaali,
            })
        );
    };

    const convertSelectedRange = ({ startDate }) => {
        let convertedStartDate = null;

        if (startDate) {
            convertedStartDate = convertDate({
                date: startDate,
                isJalaali: !isJalaali,
            });
        }

        return { convertedStartDate };
    };

    const manageComputedSelectedRange = ({ oldState, newState }) => {
        if (oldState == null || newState == null) return;

        const result = {};
        Object.entries(newState).forEach(([key, value], i) => {
            return (result[key] = Object.values(oldState)[i]);
        });

        return result;
    };

    /**
     *
     * return the result
     */
    return {
        data: {
            isJalaali,
            visibleDatesRange,
            selectedRange,
            shouldDisableBeforeToday,
            computedSelectedRange,
        },
        actions: { handleNavigateMonth, onSelectDate },
    };
};

export default SinglePickerManager;
