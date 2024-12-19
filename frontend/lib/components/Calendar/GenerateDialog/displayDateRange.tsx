import React from "react";
import { GenerateCalendarFormData } from "./formSchema";
import { Control } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { FormInputDate } from "../../FormComponents/FormInputDate";

interface DisplayProps {
  control: Control<GenerateCalendarFormData, any>;
}

export const DisplayDateRange: React.FC<DisplayProps> = ({ control }) => {
  return (
    <Stack direction="row" paddingTop={1} spacing={1} alignItems={"center"}>
      <Typography variant="h6">开始日期</Typography>
      <FormInputDate name="startDate" control={control} label="开始日期" />
      <Typography variant="h6">结束日期</Typography>
      <FormInputDate name="endDate" control={control} label="结束日期" />
    </Stack>
  );
};
