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
import { getTimeFromDate } from "../../../../../utils/dateUtils";
import { DisplayShifts } from "../DisplayShifts";
import { getWorkRoutine } from "../../../../../services/workRoutine/workRoutineRequests";
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

export const AddWorkRoutineDialog: React.FC = ({}) => {
  let workRoutineCreateDialog = useWorkRoutineDS.use.createWorkRoutineDialog();
  let setWorkRoutineCreateDialog =
    useWorkRoutineDS.use.setCreateWorkRoutineDialog();
  let { data, isLoading, error, createWorkRoutine } = getWorkRoutine();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
    watch,
  } = useForm<WorkRoutineFormData>({
    resolver: zodResolver(workRoutineSchema),
    defaultValues: {
      // https://github.com/react-hook-form/react-hook-form/issues/8250
      // set an initial value on the radio group to avoid dialog resizing due to rending shifts dialogs
      numOfShifts: "1",
    },
  });

  if (
    shouldRenderErrorPages<WorkRoutineList>(data, isLoading, error) ||
    data == undefined
  ) {
    return renderErrorPages<WorkRoutineList>(data, isLoading, error);
  }

  let workRoutineList = data.data;

  const onClickCloseDialog = () => {
    reset(); // reset all the fields inside form
    setWorkRoutineCreateDialog(false);
  };

  const onSubmit: SubmitHandler<WorkRoutineFormData> = async (
    formData: WorkRoutineFormData
  ) => {
    // TODO:Whether there is more real-time way to display this duplicate name, no wait for click submit button.
    let templateNameArray = workRoutineList.map((item) => item.templateName);
    if (templateNameArray.includes(formData.templateName)) {
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
      const response = await createWorkRoutine({
        id: 0,
        templateName: formData.templateName,
        templateType: Number(formData.templateType),
        numOfShifts: Number(formData.numOfShifts),
        firstStartTime: firstStartString,
        firstEndTime: firstEndString,
        firstTotalTime: formData.firstTotalTime,
        secondStartTime: secondStartString,
        secondEndTime: secondEndString,
        secondTotalTime: formData.secondTotalTime,
        thirdStartTime: thirdStartString,
        thirdEndTime: thirdEndString,
        thirdTotalTime: formData.thirdTotalTime,
        remark: formData.remark,
      });

      if (!response.succeed) {
        console.log(formData);
        throw Error(response.message + ":" + response.messageDetail);
      } else {
        setWorkRoutineCreateDialog(false);
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
        open={workRoutineCreateDialog}
        onClose={onClickCloseDialog}
        fullWidth
        maxWidth="md"
        sx={{ padding: 1 }}
      >
        {/*The font size of DialogTitle needs to be adjusted*/}
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
        </DialogContent>
      </Dialog>
    </>
  );
};
