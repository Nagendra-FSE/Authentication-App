export const getCurrentDate = () => {
    return new Date();
};
export const addDaysToDate = (days) => {
    const result = new Date().getTime() + days;
    return new Date(result);
};
export const isDateExpired = (date) => {
    return date.getTime() < new Date().getTime();
};
export const formatDateToISO = (date) => {
    return date.toISOString();
};
export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // milliseconds in one day
export const addtimeEgo = (time) => {
    const result = new Date().getTime() - time;
    return new Date(result);
};
//# sourceMappingURL=date.js.map