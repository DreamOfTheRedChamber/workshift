
type DayEntry =
{
    date: Date,
    dayType: number,
    shiftCount: number,
};

export type MonthEntry =
{
    month: number,
    days: DayEntry[],
};

export type MonthEntryList = MonthEntry[];