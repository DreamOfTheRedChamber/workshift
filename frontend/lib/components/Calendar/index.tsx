import { CalendarData } from "./CalendarData";
import { CalendarColorLabel } from "./CalendarColorLabel";
import { MainPageAppBar } from "../MainPageAppBar";
import { hfTheme } from "../../themes/hfDefaultTheme";
import { ThemeProvider } from "@mui/material";
import { CalendarCRUD } from "./CalendarCRUD";
import { BreadcrumbNavigation } from "../BreadcrumbNavigation";
import {
  ComponentFallback,
  LogFallbackErrors,
} from "../ErrorPages/componentFallback";
import { ErrorBoundary } from "react-error-boundary";
import { useTracking } from "react-tracking";

export function CalendarPage() {
  const { Track } = useTracking({ subModule: "工作日历管理" });

  return (
    <Track>
      <ErrorBoundary
        FallbackComponent={ComponentFallback}
        onError={LogFallbackErrors}
      >
        <ThemeProvider theme={hfTheme}>
          <MainPageAppBar></MainPageAppBar>
          <BreadcrumbNavigation
            levelNames={["日历班次管理", "工作日历管理"]}
            levelLinks={["/ShiftManagement/index"]}
          ></BreadcrumbNavigation>
          <CalendarCRUD></CalendarCRUD>
          <CalendarData></CalendarData>
          <CalendarColorLabel></CalendarColorLabel>
        </ThemeProvider>
      </ErrorBoundary>
    </Track>
  );
}
