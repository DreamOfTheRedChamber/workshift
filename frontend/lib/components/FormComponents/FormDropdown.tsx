import React from "react";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options: SelectOption[];
}

export type SelectOption = {
  label: string;
  value: string;
};

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateDropdownOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      defaultValue={""} // Note: the default value could not be null
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl sx={{ minWidth: 200, maxWidth: 200 }}>
          <FormLabel component="legend">{label}</FormLabel>
          <Select onChange={onChange} value={value}>
            {generateDropdownOptions()}
          </Select>
          <FormHelperText
            sx={{
              color: "error.main",
            }}
          >
            {error?.message ?? " "}
          </FormHelperText>
        </FormControl>
      )}
      control={control}
      name={name}
    />
  );
};
