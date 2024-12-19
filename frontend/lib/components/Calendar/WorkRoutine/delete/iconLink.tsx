import { GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useWorkRoutineDS } from "../../../../store/workRoutineDataStore";

export function DeleteWorkRoutineIcon(id: GridRowId) {
  const setSelectedRowId = useWorkRoutineDS.use.setWorkRoutineRowId();
  const setOpenWorkRoutineDelete = useWorkRoutineDS.use.setDeleteWorkRoutineDialog();

  const onClickDelete = (id: GridRowId) => () => {
    setOpenWorkRoutineDelete(true);
    setSelectedRowId(id);
  };

  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={onClickDelete(id)}
      color="inherit"
    />
  );
}
