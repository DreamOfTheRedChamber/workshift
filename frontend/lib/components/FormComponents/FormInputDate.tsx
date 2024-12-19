import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { zhCN } from "@mui/x-date-pickers/locales";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        zhCN.components.MuiLocalizationProvider.defaultProps.localeText
      }
      adapterLocale="zh-cn"
    >
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <FormControl>
            <DatePicker
              value={value}
              onChange={onChange}
              inputRef={ref}
              disablePast
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
    </LocalizationProvider>
  );
};
