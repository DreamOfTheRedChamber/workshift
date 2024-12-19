import { Box, Stack, Typography } from "@mui/material";
import { common, green, grey, red, yellow } from "@mui/material/colors";

export function CalendarColorLabel() {
  const holidayStyle = {
    bgcolor: red[300],
  };

  const weekdayStyle = {
    bgcolor: green[300],
  };

  const weekendStyle = {
    bgcolor: yellow[300],
  };
  const notPlannedStyle = {
    bgcolor: grey[300],
  };

  const EmptyStyle = {
    bgcolor: common.white,
  };
  return (
    <Stack direction="row" sx={{ gap: 1, mt: 2, ml: 2 }}>
      <Box sx={{ bgcolor: weekdayStyle.bgcolor, width: 40, height: 20 }} />
      <Typography variant="body2">工作日</Typography>

      <Box sx={{ bgcolor: weekendStyle.bgcolor, width: 40, height: 20 }} />
      <Typography variant="body2">周末</Typography>

      <Box sx={{ bgcolor: holidayStyle.bgcolor, width: 40, height: 20 }} />
      <Typography variant="body2">节假日</Typography>

      <Box sx={{ bgcolor: notPlannedStyle.bgcolor, width: 40, height: 20 }} />
      <Typography variant="body2">未排班</Typography>

      <Box
        sx={{
          bgcolor: EmptyStyle.bgcolor,
          width: 40,
          height: 20,
          border: "solid",
        }}
      />
      <Typography variant="body2">未有日期</Typography>
    </Stack>
  );
}
