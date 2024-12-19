import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useWorkRoutineDS } from "../../../../store/workRoutineDataStore";
import { GridRowId } from "@mui/x-data-grid";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import { getWorkRoutine } from "../../../../services/workRoutine/workRoutineRequests";

export const DeleteWorkRoutineDialog: React.FC = ({}) => {
  const [loading, setLoading] = React.useState(false);
  let { deleteWorkRoutine } = getWorkRoutine();

  const openWorkRoutineDelete = useWorkRoutineDS.use.deleteWorkRoutineDialog();
  const setOpenWorkRoutineDelete = useWorkRoutineDS.use.setDeleteWorkRoutineDialog();
  const selectedRowId = useWorkRoutineDS.use.workRoutineRowId();

  const handleCancel = () => {
    setOpenWorkRoutineDelete(false);
  };

  const handleConfirm = async (id: GridRowId) => {
    setLoading(true);
    deleteWorkRoutine(Number(id));
    setLoading(false);
    setOpenWorkRoutineDelete(false);
  };

  // TODO: whether the delete button could be displayed in error color
  return (
    <Dialog open={openWorkRoutineDelete} onClose={handleCancel} fullWidth>
      <DialogTitle id="alert-dialog-title" sx={{ justifyContent: "center" }}>
        确认删除？
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          删除后将无法恢复
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" variant="outlined">
          取消
        </Button>
        <Button
          onClick={() => handleConfirm(selectedRowId)}
          autoFocus
          variant="contained"
          disabled={loading}
        >
          确认
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: blue[500],
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};
