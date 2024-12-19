import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { zhCN } from "@mui/x-date-pickers/locales";
import "dayjs/locale/zh-cn";
import { useMonthListDS } from "../../store/monthListDataStore";
import { createDayjsFromYear } from "../../utils/dateUtils";
import { GenerateDialog } from "./GenerateDialog";
import { useTracking } from "react-tracking";

export function CalendarCRUD() {
  const { trackEvent } = useTracking();
  const selectedYear = useMonthListDS.use.year();
  const updateSelectedYear = useMonthListDS.use.setYear();
  const [searchYear, setSearchYear] = React.useState<Dayjs>(
    createDayjsFromYear(selectedYear)
  );

  return (
    <>
      <Grid container spacing={2} columns={12} margin={1} alignItems={"center"}>
        <Grid size={2}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={
              zhCN.components.MuiLocalizationProvider.defaultProps.localeText
            }
            adapterLocale="zh-cn"
          >
            <DatePicker
              openTo="year"
              views={["year"]}
              value={searchYear}
              onChange={(newValue) => {
                let updatedYear = newValue ? newValue : dayjs(Date.now());
                setSearchYear(updatedYear);
              }}
              sx={{
                mr: 1,
                minWidth: 60,
                border: 0,
                "& .MuiOutlinedInput-root": {
                  height: 40,
                  width: 100,
                },
              }}
            ></DatePicker>
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={(e) => {
              setSearchYear(searchYear);
              updateSelectedYear(searchYear.year());
              trackEvent({
                eventType: "搜索",
                timeStamp: dayjs().toString(),
              });
            }}
          >
            搜索
          </Button>
        </Grid>
        <Grid size="grow"></Grid>
        <Grid size="auto">
          <Button
            variant="contained"
            href="/Calendar/WorkRoutine/index"
            sx={{ margin: 1 }}
          >
            作息模式管理
          </Button>
          <Button variant="contained" href="/Calendar/Holiday/index">
            节假日管理
          </Button>
          <GenerateDialog></GenerateDialog>
        </Grid>
      </Grid>
    </>
  );
}
