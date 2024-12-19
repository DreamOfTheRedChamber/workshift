import { GridColDef } from "@mui/x-data-grid";

export const constColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "序号",
    minWidth: 50,
    editable: false,
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "templateName",
    headerName: "模板名称",
    minWidth: 150,
    editable: false,
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "templateType",
    headerName: "模板类型",
    minWidth: 120,
    editable: false,
    align: "center",
    headerAlign: "center",
    flex: 1,
    valueGetter: (value) => {
      if (value === 0) {
        return "";
      } else if (value === 1) {
        return "工作日";
      } else if (value === 2) {
        return "休息日";
      } else if (value === 3) {
        return "节假日";
      } else if (value === 4) {
        return "通用";
      }
    },
  },
  {
    field: "numOfShifts",
    headerName: "班次数量",
    type: "number",
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    editable: false,
    flex: 1,
  },
  {
    field: "firstStartTime",
    headerName: "第一班开始时间",
    type: "string",
    minWidth: 160,
    editable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "firstEndTime",
    headerName: "第一班结束时间",
    minWidth: 140,
    editable: false,
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "firstTotalTime",
    headerName: "第一班时长",
    minWidth: 120,
    editable: false,
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 1,
    valueGetter: (value) => {
      if (value === 0) {
        return "";
      } else {
        return value;
      }
    },
  },
  {
    field: "secondStartTime",
    headerName: "第二班开始时间",
    type: "string",
    minWidth: 140,
    editable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "secondEndTime",
    headerName: "第二班结束时间",
    minWidth: 140,
    editable: false,
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "secondTotalTime",
    headerName: "第二班时长",
    minWidth: 120,
    editable: false,
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 1,
    valueGetter: (value) => {
      if (value === 0) {
        return "";
      } else {
        return value;
      }
    },
  },
  {
    field: "thirdStartTime",
    headerName: "第三班开始时间",
    type: "string",
    minWidth: 140,
    editable: false,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "thirdEndTime",
    headerName: "第三班结束时间",
    minWidth: 140,
    editable: false,
    type: "string",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "thirdTotalTime",
    headerName: "第三班时长",
    minWidth: 120,
    editable: false,
    headerAlign: "center",
    type: "string",
    align: "center",
    flex: 1,
    valueGetter: (value) => {
      if (value === 0) {
        return "";
      } else {
        return value;
      }
    },
  },
  {
    field: "remark",
    headerName: "备注",
    minWidth: 150,
    editable: false,
    type: "string",
    headerAlign: "center",
    align: "center",
    sortable: false,
    flex: 1,
  }
];
