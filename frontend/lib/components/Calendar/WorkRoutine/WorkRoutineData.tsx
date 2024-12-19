import { constColumns } from "./workRoutineTableHeader";
import { StripeDataGrid } from "../../../themes/DataGridStriped";
import {
  GridRowClassNameParams,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridRowParams,
} from "@mui/x-data-grid";
import { zhCN } from "@mui/x-data-grid/locales";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomToolbar } from "./workRoutineDataToolbar";
import { getWorkRoutine } from "../../../services/workRoutine/workRoutineRequests";
import {
  shouldRenderErrorPages,
  renderErrorPages,
} from "../../ErrorPages/swrFallback";
import { WorkRoutineList } from "../../../services/workRoutine/workRoutineModel";
import { AddWorkRoutineDialog } from "./addOrUpdate/add";
import { DeleteWorkRoutineDialog } from "./delete/dialog";
import { DeleteWorkRoutineIcon } from "./delete/iconLink";
import { UpdateWorkRoutineDialog } from "./addOrUpdate/update";
import EditIcon from "@mui/icons-material/Edit";
import { useWorkRoutineDS } from "../../../store/workRoutineDataStore";
import { useState } from "react";
import { dummyWorkRoutineEntry } from "../../../services/workRoutine/workRoutineModel";
export const WorkRoutineData: React.FC = ({}) => {
  const setUpdateWorkRoutineDialog =
    useWorkRoutineDS.use.setUpdateWorkRoutineDialog();
  const setWorkRoutineRowId = useWorkRoutineDS.use.setWorkRoutineRowId();
  const [workRoutineEntry, setWorkRoutineEntry] = useState(
    dummyWorkRoutineEntry
  );
  const { data, isLoading, error } = getWorkRoutine();
  const theme = createTheme(
    {},
    zhCN // x-data-grid translations
  );

  if (
    shouldRenderErrorPages<WorkRoutineList>(data, isLoading, error) ||
    data == undefined
  ) {
    return renderErrorPages<WorkRoutineList>(data, isLoading, error);
  }

  const onClickUpdate = (id: GridRowId) => () => {
    setWorkRoutineRowId(id);
    setUpdateWorkRoutineDialog(true);

    let workRoutineList = data.data;
    let clickedEntry = workRoutineList?.filter((item) => item.id == id)[0];
    if (clickedEntry != undefined) {
      setWorkRoutineEntry(clickedEntry);
    }
  };

  const onRowDoubleClick = (params: GridRowParams) => {
    onClickUpdate(params.id)();
  };

  const columns: GridColDef[] = [
    ...constColumns,
    {
      flex: 1,
      field: "actions",
      type: "actions",
      headerName: "操作",
      minWidth: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          // the update dialog and delete dialog are structured in a different way
          // because update dialog needs to display row data.
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={onClickUpdate(id)}
            color="inherit"
          />,
          DeleteWorkRoutineIcon(id),
        ];
      },
    },
  ];

  let workRoutineList = data.data;
  return (
    <>
      <ThemeProvider theme={theme}>
        <StripeDataGrid
          rows={workRoutineList}
          columns={columns}
          editMode="row"
          slots={{
            toolbar: CustomToolbar,
          }}
          getRowClassName={(params: GridRowClassNameParams<any>) => {
            return params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd";
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 15, page: 0 },
            },
          }}
          onRowDoubleClick={onRowDoubleClick}
        ></StripeDataGrid>
        <AddWorkRoutineDialog></AddWorkRoutineDialog>
        <DeleteWorkRoutineDialog></DeleteWorkRoutineDialog>
        <UpdateWorkRoutineDialog
          workRoutineEntry={workRoutineEntry}
        ></UpdateWorkRoutineDialog>
      </ThemeProvider>
    </>
  );
};
