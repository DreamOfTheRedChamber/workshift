import * as React from "react";
import { Dialog, Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import "dayjs/locale/zh-cn";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  GenerateCalendarFormData,
  generateSchema,
  generateFormErrorMessages,
} from "./formSchema";
import { getWorkCalendar } from "../../../services/workCalendar/workCalendarRequests";
import { DisplayWorkRoutine } from "./displayWorkRoutine";
import { DisplayDateRange } from "./displayDateRange";
import { useMonthListDS } from "../../../store/monthListDataStore";
import {
  ComponentFallback,
  LogFallbackErrors,
} from "../../ErrorPages/componentFallback";
import { ErrorBoundary } from "react-error-boundary";

export function GenerateDialog() {
  const year = useMonthListDS.use.year();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
    watch,
  } = useForm<GenerateCalendarFormData>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      type: 0,
      allDayId: "",
      workDayId: "",
      weekendId: "",
      holidayId: "",
    },
  });
  let { generateWorkCalendar } = getWorkCalendar(year);

  const onSubmit: SubmitHandler<GenerateCalendarFormData> = async (
    formData: GenerateCalendarFormData
  ) => {
    try {
      const response = await generateWorkCalendar({
        startDate: formData.startDate,
        endDate: formData.endDate,
        type: formData.type,
        allDayId: formData.allDayId,
        weekendId: formData.weekendId,
        holidayId: formData.holidayId,
        workDayId: formData.workDayId,
        dateRangeError: "", // placeholder
      });

      if (!response) {
        console.log("Null response received. This should not happen");
      } else if (!response.succeed) {
        console.log(formData);
        throw Error(response.message + ":" + response.messageDetail);
      } else {
        setIsDialogOpen(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError("root", {
          message: e.message,
        });
      }
      console.log(e);
    }
  };

  const onClickOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const onClickCloseDialog = () => {
    reset(); // reset all the fields inside form
    setIsDialogOpen(false);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ComponentFallback}
      onError={LogFallbackErrors}
    >
      <Button
        variant="contained"
        onClick={onClickOpenDialog}
        sx={{ margin: 1 }}
      >
        生成工作日历
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={onClickCloseDialog}
        maxWidth="lg"
        sx={{ padding: 1 }}
      >
        {/*The font size of DialogTitle needs to be adjusted*/}
        <DialogTitle>生成工作日历</DialogTitle>
        <DialogContent>
          <form noValidate>
            <FormControl>
              <DisplayDateRange control={control}></DisplayDateRange>
              <DisplayWorkRoutine
                control={control}
                watch={watch}
              ></DisplayWorkRoutine>
              <DialogActions>
                <Button variant="contained" onClick={onClickCloseDialog}>
                  取消
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting ? "请求中" : "确认"}
                </Button>
              </DialogActions>
            </FormControl>
            <FormHelperText
              sx={{
                color: "error.main",
              }}
            >
              {generateFormErrorMessages(errors)}
            </FormHelperText>
          </form>
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  );
}
