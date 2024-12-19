import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "dayjs/locale/zh-cn";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  workRoutineSchema,
  WorkRoutineFormData,
  generateFormErrorMessages,
} from "../../formSchema";
import { FormInputText } from "../../../../FormComponents/FormInputText";
import { useWorkRoutineDS } from "../../../../../store/workRoutineDataStore";
import { FormInputDropdown } from "../../../../FormComponents/FormDropdown";
import { DisplayShifts } from "../DisplayShifts";
import { getWorkRoutine } from "../../../../../services/workRoutine/workRoutineRequests";
import { DevTool } from "@hookform/devtools";
import { WorkRoutineEntry } from "../../../../../services/workRoutine/workRoutineModel";
import { useEffect } from "react";
import { createDate, getTimeFromDate } from "../../../../../utils/dateUtils";
import {
  shouldRenderErrorPages,
  renderErrorPages,
} from "../../../../ErrorPages/swrFallback";
import { WorkRoutineList } from "../../../../../services/workRoutine/workRoutineModel";

const dropdownOptions = [
  {
    label: "工作日模板",
    value: "1",
  },
  {
    label: "休息日模板",
    value: "2",
  },
  {
    label: "节假日模板",
    value: "3",
  },
  {
    label: "通用模板",
    value: "4",
  },
];

interface InputProps {
  workRoutineEntry: WorkRoutineEntry;
}

export const UpdateWorkRoutineDialog: React.FC<InputProps> = ({
  workRoutineEntry,
}) => {
  const setUpdateWorkRoutineDialog =
    useWorkRoutineDS.use.setUpdateWorkRoutineDialog();
  let updateWorkRoutineDialog = useWorkRoutineDS.use.updateWorkRoutineDialog();
  let workRoutineRowId = useWorkRoutineDS.use.workRoutineRowId();
  let { data, isLoading, error, updateWorkRoutine } = getWorkRoutine();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm<WorkRoutineFormData>({
    resolver: zodResolver(workRoutineSchema),
  });

  if (
    shouldRenderErrorPages<WorkRoutineList>(data, isLoading, error) ||
    data == undefined
  ) {
    return renderErrorPages<WorkRoutineList>(data, isLoading, error);
  }

  // Please see https://stackoverflow.com/questions/64306943/defaultvalues-of-react-hook-form-is-not-setting-the-values-to-the-input-fields-i
  // https://stackoverflow.com/questions/62242657/how-to-change-react-hook-form-defaultvalue-with-useeffect
  // Directly use SetValue in UpdateDialog component will cause infinite loops
  useEffect(() => {
    setValue("templateName", workRoutineEntry.templateName);
    setValue("templateType", String(workRoutineEntry.templateType));
    setValue("numOfShifts", String(workRoutineEntry.numOfShifts));
    setValue("firstStartTime", createDate(workRoutineEntry.firstStartTime));
    setValue("firstEndTime", createDate(workRoutineEntry.firstEndTime));
    setValue("firstTotalTime", workRoutineEntry.firstTotalTime);
    setValue("secondStartTime", createDate(workRoutineEntry.secondStartTime));
    setValue("secondEndTime", createDate(workRoutineEntry.secondEndTime));
    setValue("secondTotalTime", workRoutineEntry.secondTotalTime);
    setValue("thirdStartTime", createDate(workRoutineEntry.thirdStartTime));
    setValue("thirdEndTime", createDate(workRoutineEntry.thirdEndTime));
    setValue("thirdTotalTime", workRoutineEntry.thirdTotalTime);
    setValue("remark", workRoutineEntry.remark);
  }, [workRoutineEntry, setValue]);

  const onClickCloseDialog = () => {
    // Note: no need to reset() form here, it is different from add dialog
    // With SWR update, the entry will be updated to the value returned from external request.
    setUpdateWorkRoutineDialog(false);
  };

  const onSubmit: SubmitHandler<WorkRoutineFormData> = async (
    formData: WorkRoutineFormData
  ) => {
    // TODO: Whether there is more real-time way to display this duplicate name, no wait for click submit button.
    let templateNameArray = data.data.map((item) => item.templateName);
    if (
      templateNameArray.includes(formData.templateName) &&
      formData.templateName != workRoutineEntry.templateName
    ) {
      setError("templateName", { message: "此名称已存在" });
      return;
    }

    let firstStartString = getTimeFromDate(formData.firstStartTime);
    let firstEndString = getTimeFromDate(formData.firstEndTime);
    let secondStartString = getTimeFromDate(formData.secondStartTime);
    let secondEndString = getTimeFromDate(formData.secondEndTime);
    let thirdStartString = getTimeFromDate(formData.thirdStartTime);
    let thirdEndString = getTimeFromDate(formData.thirdEndTime);

    try {
      const response = await updateWorkRoutine({
        id: Number(workRoutineRowId),
        templateName: formData.templateName,
        templateType: Number(formData.templateType),
        numOfShifts: Number(formData.numOfShifts),
        firstStartTime: firstStartString,
        firstEndTime: firstEndString,
        firstTotalTime: formData.firstTotalTime,

        // The following ternary operator codes clear shift entries otherwise these will remain after changing numOfShifts
        secondStartTime:
          Number(formData.numOfShifts) > 1 ? secondStartString : undefined,
        secondEndTime:
          Number(formData.numOfShifts) > 1 ? secondEndString : undefined,
        secondTotalTime:
          Number(formData.numOfShifts) > 1
            ? formData.secondTotalTime
            : undefined,
        thirdStartTime:
          Number(formData.numOfShifts) > 2 ? thirdStartString : undefined,
        thirdEndTime:
          Number(formData.numOfShifts) > 2 ? thirdEndString : undefined,
        thirdTotalTime:
          Number(formData.numOfShifts) > 2
            ? formData.thirdTotalTime
            : undefined,
        remark: formData.remark,
      });

      if (!response.succeed) {
        console.log(formData);
        throw Error(response.message + ":" + response.messageDetail);
      } else {
        setUpdateWorkRoutineDialog(false);
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

  return (
    <>
      <Dialog
        open={updateWorkRoutineDialog}
        onClose={onClickCloseDialog}
        maxWidth="lg"
        sx={{ padding: 1 }}
      >
        {/*TODO: The font size of DialogTitle needs to be adjusted*/}
        <DialogTitle>新增作息模式</DialogTitle>
        <DialogContent>
          <form noValidate>
            <FormControl>
              <FormInputText
                name={"templateName"}
                label={"名称"}
                control={control}
              ></FormInputText>
              <FormInputDropdown
                name={"templateType"}
                control={control}
                label={"作息类型"}
                options={dropdownOptions}
              ></FormInputDropdown>
              <DisplayShifts control={control} watch={watch}></DisplayShifts>
              <FormInputText
                name={"remark"}
                label={"添加备注："}
                control={control}
              ></FormInputText>
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
          <DevTool control={control} /> {/* set up the dev tool */}
        </DialogContent>
      </Dialog>
    </>
  );
};
