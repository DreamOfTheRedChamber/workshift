import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import { zhCN } from "@mui/x-date-pickers/locales";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl, FormLabel } from "@mui/material";
import dayjs from "dayjs";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export const FormInputTime = ({
  name,
  control,
  label,
  setValue,
}: FormInputProps) => {
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
            <FormLabel component="legend">{label}</FormLabel>
            <TimePicker
              value={value ? dayjs(value) : null} // Type conversion needed here otherwise RHF setValue call will fail
              onChange={onChange}
              inputRef={ref}
              ampm={false}
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
