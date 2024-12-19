import React from "react";
import { WorkRoutineFormData } from "../formSchema";
import { Control } from "react-hook-form";
import { Stack } from "@mui/material";
import { FormInputTime } from "../../../FormComponents/FormInputTime";
import { FormInputTextWithAdorment } from "../../../FormComponents/FormInputTextWithAdorment";

interface DisplayProps {
  control: Control<WorkRoutineFormData, any>;
  startTimeName: string;
  startTimeLabel: string;
  endTimeName: string;
  endTimeLabel: string;
  totalTimeName: string;
  totalTimeLabel: string;
}

export const DisplayTimeRange: React.FC<DisplayProps> = ({
  control,
  startTimeName,
  startTimeLabel,
  endTimeName,
  endTimeLabel,
  totalTimeName,
  totalTimeLabel,
}) => {
  return (
    <Stack direction="row" paddingTop={1} spacing={1} alignItems={"center"}>
      <FormInputTime
        name={startTimeName}
        control={control}
        label={startTimeLabel}
      />
      <FormInputTime
        name={endTimeName}
        control={control}
        label={endTimeLabel}
      />
      <FormInputTextWithAdorment
        name={totalTimeName}
        control={control}
        label={totalTimeLabel}
      ></FormInputTextWithAdorment>
    </Stack>
  );
};
