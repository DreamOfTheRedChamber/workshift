/// <reference types="@emotion/styled" />
/// <reference types="@mui/system" />

import { alpha, styled } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.2;
export const StripeDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "rgb(43,127,223)",
    color: "white",
  },
  // This removes the cell click border
  "& .MuiDataGrid-cell:focus,.MuiDataGrid-cell:focus-within,.MuiDataGrid-columnHeader:focus,.MuiDataGrid-columnHeader:focus-within":
  {
    outline: "none",
  },
}));
