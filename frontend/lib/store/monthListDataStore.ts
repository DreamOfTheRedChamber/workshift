import { create } from 'zustand';
import { createSelectors } from './createSelectors';
import dayjs from 'dayjs';

interface MonthListDataStore {
    year: number;
    setYear: (year: number) => void;
}

const useMonthListDataStoreBase = create<MonthListDataStore>(set => ({
    year: (dayjs(Date.now()).year()),
    setYear: (newYear) => set({year: newYear}),
}));

export const useMonthListDS = createSelectors(useMonthListDataStoreBase);

