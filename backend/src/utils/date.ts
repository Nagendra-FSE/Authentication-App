export const getCurrentDate = (): Date => {
    return new Date();
}

export const addDaysToDate = (days: number): Date => {
    const result = new Date().getTime() + days;
    return new Date(result);
}

export const isDateExpired = (date: Date): boolean => {
    return date.getTime() < new Date().getTime();
}

export const formatDateToISO = (date: Date): string => {
    return date.toISOString();
}

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // milliseconds in one day