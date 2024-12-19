import { Routes, Route } from "react-router-dom";
import { MainPageAppBar } from "./components/MainPageAppBar/index";
import { CalendarPage } from "./components/Calendar/index";
import { HolidayPage } from "./components/Calendar/Holiday";
import { WorkRoutinePage } from "./components/Calendar/WorkRoutine";
import { ShiftManagementPage } from "./components/ShiftManagement";
import { useTracking } from "react-tracking";

export function RoutesSummry() {
  // TODO: investigate how to integrate decorate of react-tracking library
  const { Track } = useTracking(
    { Module: "日历班次管理" },
    {
      dispatch: (data) => {
        console.log(data);
      },
    }
  );

  return (
    <Track>
      <Routes>
        <Route
          path="/ShiftManagement/index"
          element={<ShiftManagementPage></ShiftManagementPage>}
        />
        <Route
          path="/AppBar/index"
          element={<MainPageAppBar></MainPageAppBar>}
        />
        <Route path="/Calendar/index" element={<CalendarPage></CalendarPage>} />
        <Route
          path="/Calendar/Holiday/index"
          element={<HolidayPage></HolidayPage>}
        />
        <Route
          path="/Calendar/WorkRoutine/index"
          element={<WorkRoutinePage></WorkRoutinePage>}
        />
        <Route
          path="ShiftManagement/index"
          element={<ShiftManagementPage></ShiftManagementPage>}
        ></Route>
      </Routes>
    </Track>
  );
}
