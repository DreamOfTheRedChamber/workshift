import { Box, Button } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useWorkRoutineDS } from "../../../store/workRoutineDataStore";
import AddIcon from "@mui/icons-material/Add";

export function CustomToolbar() {
  let setWorkRoutineCreateDialog = useWorkRoutineDS.use.setCreateWorkRoutineDialog();

  function onAddButtonClick() {
    setWorkRoutineCreateDialog(true);
  }

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ flexGrow: 1 }} />
      <Button startIcon={<AddIcon />} onClick={onAddButtonClick}>
        新增
      </Button>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}
