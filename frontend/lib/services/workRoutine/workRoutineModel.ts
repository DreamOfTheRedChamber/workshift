import { GenericResponseModel } from "../genericResponseModel";

export type WorkRoutineEntry =
{
    id: number,
    templateName: string,
    templateType: number,
    numOfShifts: number,
    firstStartTime: string | undefined,
    firstEndTime: string | undefined,
    firstTotalTime: number,
    secondStartTime: string | undefined,
    secondEndTime: string | undefined,
    secondTotalTime: number | undefined,
    thirdStartTime: string | undefined,
    thirdEndTime: string | undefined,
    thirdTotalTime: number | undefined,
    remark: string
};

export const dummyWorkRoutineEntry: WorkRoutineEntry = 
{
    id: 0,
    templateName: "",
    templateType: 0,
    numOfShifts: 0,
    firstStartTime: "07:00",
    firstEndTime: "15:00",
    firstTotalTime: 8,
    secondStartTime: "16:00",
    secondEndTime: "20:00",
    secondTotalTime: 0,
    thirdStartTime: "21:00",
    thirdEndTime: "23:00",
    thirdTotalTime: 0,
    remark: ""
};

export const dummyWorkRoutineGenericResponse: GenericResponseModel<WorkRoutineEntry> = 
{
    succeed: false,
    message: "",
    messageDetail: "",
    data: dummyWorkRoutineEntry
};

export type WorkRoutineList = WorkRoutineEntry[];