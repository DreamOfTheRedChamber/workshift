import { create } from 'zustand';
import { createSelectors } from './createSelectors';
import { GridRowId } from "@mui/x-data-grid";

interface WorkRoutineDataStore {
    workRoutineRowId: GridRowId,
    setWorkRoutineRowId: (state: GridRowId) => void, 

    // WorkRoutine dialog windows in CRUD order
    // Needed to be in store because it will be accessed from delete icon column and delete dialog
    createWorkRoutineDialog: boolean,
    setCreateWorkRoutineDialog: (state: boolean) => void
    updateWorkRoutineDialog: boolean,
    setUpdateWorkRoutineDialog: (state: boolean) => void
    deleteWorkRoutineDialog: boolean,
   setDeleteWorkRoutineDialog: (state: boolean) => void
}

const useWorkRoutineDataStoreBase = create<WorkRoutineDataStore>(set => ({    
    workRoutineRowId: 0,
    setWorkRoutineRowId: (newState) => set({workRoutineRowId: newState}),

    // WorkRoutine dialog windows
    // Needed to be in store because it will be accessed from delete icon column and delete dialog
    createWorkRoutineDialog: false,
    setCreateWorkRoutineDialog: (newState) => set({createWorkRoutineDialog: newState}),
    updateWorkRoutineDialog: false,
    setUpdateWorkRoutineDialog: (newState) => set({updateWorkRoutineDialog: newState}),
    deleteWorkRoutineDialog: false,
    setDeleteWorkRoutineDialog: (newState) => set({deleteWorkRoutineDialog: newState}),
}));

export const useWorkRoutineDS = createSelectors(useWorkRoutineDataStoreBase);