import React from "react";
import { Stack } from "@mui/material";
import { GenerateCalendarFormData } from "./formSchema";
import { Control, UseFormWatch } from "react-hook-form";
import { WorkRoutineList } from "../../../services/workRoutine/workRoutineModel";
import {
  FormInputDropdown,
  SelectOption,
} from "../../FormComponents/FormDropdown";
import { FormInputRadio } from "../../FormComponents/FormInputRadio";
import { getWorkRoutine } from "../../../services/workRoutine/workRoutineRequests";
import {
  shouldRenderErrorPages,
  renderErrorPages,
} from "../../ErrorPages/swrFallback";

interface DisplayProps {
  control: Control<GenerateCalendarFormData, any>;
  watch: UseFormWatch<GenerateCalendarFormData>;
}

const radioGroupOptions = [
  {
    label: "全部日期采用相同模板",
    value: "0",
  },
  {
    label: "采用不同模板",
    value: "1",
  },
];

const generateDropdownOptions = (
  workRoutineList: WorkRoutineList,
  templateType: string
) => {
  const dropDownOptions: SelectOption[] = [];
  for (let i = 0; i < workRoutineList.length; i++) {
    if (workRoutineList[i].templateType == Number(templateType)) {
      dropDownOptions.push({
        label: workRoutineList[i].templateName,
        value: String(workRoutineList[i].id),
      });
    }
  }

  return dropDownOptions;
};

export const DisplayWorkRoutine: React.FC<DisplayProps> = ({
  control,
  watch,
}) => {
  let { data, isLoading, error } = getWorkRoutine();
  if (
    shouldRenderErrorPages<WorkRoutineList>(data, isLoading, error) ||
    data == undefined
  ) {
    return renderErrorPages<WorkRoutineList>(data, isLoading, error);
  }

  let workRoutineList = data.data;
  let templateType = watch("type");

  return (
    <>
      <FormInputRadio
        name={"type"}
        control={control}
        label={""}
        options={radioGroupOptions}
      ></FormInputRadio>
      {templateType == 0 && (
        <FormInputDropdown
          name={"allDayId"}
          control={control}
          label={"通用模板"}
          options={generateDropdownOptions(workRoutineList, "4")}
        ></FormInputDropdown>
      )}

      {templateType == 1 && (
        <Stack direction="row" paddingTop={1} spacing={1} alignItems={"center"}>
          <FormInputDropdown
            name={"workDayId"}
            control={control}
            label={"工作日模板"}
            options={generateDropdownOptions(workRoutineList, "1")}
          ></FormInputDropdown>
          <FormInputDropdown
            name={"weekendId"}
            control={control}
            label={"休息日模板"}
            options={generateDropdownOptions(workRoutineList, "2")}
          ></FormInputDropdown>
          <FormInputDropdown
            name={"holidayId"}
            control={control}
            label={"节假日模板"}
            options={generateDropdownOptions(workRoutineList, "3")}
          ></FormInputDropdown>
        </Stack>
      )}
    </>
  );
};
