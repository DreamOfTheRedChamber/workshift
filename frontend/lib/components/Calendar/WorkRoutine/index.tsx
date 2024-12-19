import { MainPageAppBar } from "../../MainPageAppBar";
import { hfTheme } from "../../../themes/hfDefaultTheme";
import { BreadcrumbNavigation } from "../../BreadcrumbNavigation";
import { WorkRoutineData } from "./WorkRoutineData";
import { ThemeProvider } from "@mui/material/styles";
import {
  ComponentFallback,
  LogFallbackErrors,
} from "../../ErrorPages/componentFallback";
import { ErrorBoundary } from "react-error-boundary";

export function WorkRoutinePage() {
  return (
    <ErrorBoundary
      FallbackComponent={ComponentFallback}
      onError={LogFallbackErrors}
    >
      <ThemeProvider theme={hfTheme}>
        <MainPageAppBar></MainPageAppBar>
        <BreadcrumbNavigation
          levelNames={["日历班次管理", "工作日历管理", "作息模板管理"]}
          levelLinks={["/ShiftManagement/index", "/Calendar/index"]}
        ></BreadcrumbNavigation>
        <WorkRoutineData></WorkRoutineData>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
