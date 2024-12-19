import { columns, monthsInText } from "./calendarTableHeader";
import { green, red, yellow, grey, common } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { DataGrid, GridCellParams, gridClasses } from "@mui/x-data-grid";
import { useMonthListDS } from "../../store/monthListDataStore";
import { getWorkCalendar } from "../../services/workCalendar/workCalendarRequests";
import {
  shouldRenderErrorPages,
  renderErrorPages,
} from "../ErrorPages/swrFallback";
import { MonthEntryList } from "../../services/workCalendar/workCalendarModel";

export function CalendarData() {
  const year = useMonthListDS.use.year();
  let { data, isLoading, error } = getWorkCalendar(year);
  if (
    shouldRenderErrorPages<MonthEntryList>(data, isLoading, error) ||
    data == undefined
  ) {
    return renderErrorPages<MonthEntryList>(data, isLoading, error);
  }

  let monthEntryList = data.data;
  const rows: Record<string | number, string | number | null>[] = [];
  const backgroundColors: number[][] = [];
  Object.entries(monthEntryList).forEach((entry) => {
    const [monthIndex, monthItem] = entry;

    // generate each row
    let rowBackgorund = [];
    let rowObject: Record<string | number, string | number | null> = {};
    rowObject["id"] = monthIndex;
    rowObject["月/日"] = monthsInText[Number(monthIndex)];
    for (let i = 0; i < monthItem.days.length; i++) {
      rowBackgorund.push(monthItem.days[i].dayType);
      if (monthItem.days[i].dayType === 0) {
        rowObject[i + 1] = null;
      } else {
        rowObject[i + 1] = monthItem.days[i].shiftCount;
      }
    }

    backgroundColors.push(rowBackgorund);
    rows.push(rowObject);
  });

  return (
    <Box
      sx={{
        minHeight: 600,
        maxHeight: "100%",
        minWidth: 1850,
        maxWidth: "100%",
        flexGrow: 1,
        justifyContent: "start",
        [`.${gridClasses.cell}.holiday`]: {
          backgroundColor: red[300],
          color: "#1a3e72",
        },
        [`.${gridClasses.cell}.weekday`]: {
          backgroundColor: green[300],
          color: "#1a3e72",
        },
        [`.${gridClasses.cell}.weekend`]: {
          backgroundColor: yellow[300],
          color: "#1a3e72",
        },
        [`.${gridClasses.cell}.notPlanned`]: {
          backgroundColor: grey[300],
          color: "#1a3e72",
        },
        [`.${gridClasses.cell}.empty`]: {
          backgroundColor: common.white,
          color: "#1a3e72",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableRowSelectionOnClick={true}
        hideFooter={true}
        getCellClassName={(params: GridCellParams<any, any, number>) => {
          let colIndex = parseInt(params.field) - 1;
          let rowIndex = params.id;
          let dayType = backgroundColors[Number(rowIndex)][colIndex];
          if (dayType === 0) {
            return "notPlanned";
          } else if (dayType === 1) {
            return "weekday";
          } else if (dayType === 2) {
            return "weekend";
          } else if (dayType === 3) {
            return "holiday";
          } else {
            return "empty";
          }
        }}
      />
    </Box>
  );
}
