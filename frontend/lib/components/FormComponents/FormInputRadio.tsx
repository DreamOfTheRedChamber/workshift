import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

type RadioOption = {
  label: string;
  value: string;
};

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options: RadioOption[];
}

export const FormInputRadio: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption, index) => (
      <FormControlLabel
        key={index}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""} // Note: the default value could not be null
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup value={value} onChange={onChange}>
            <Stack direction="row" paddingTop={1}>
              {generateRadioOptions()}
            </Stack>
          </RadioGroup>
          <FormHelperText
            sx={{
              color: "error.main",
            }}
          >
            {error?.message ?? " "}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
