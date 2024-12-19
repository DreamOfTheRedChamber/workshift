// src/form-component/FormInputText.tsx
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl, FormLabel } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export const FormInputTextWithAdorment = ({
  name,
  control,
  label,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={""}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl component="fieldset">
          <FormLabel component="legend">{label}</FormLabel>
          <TextField
            onChange={onChange}
            value={value}
            fullWidth
            variant="outlined"
            helperText="" // disable helpertext manually otherwise helpertext will duplicate
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">小时</InputAdornment>
                ),
              },
            }}
          />
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
