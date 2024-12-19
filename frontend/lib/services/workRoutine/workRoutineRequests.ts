import axios from 'axios';
import { GenericResponseModel } from '../genericResponseModel';
import useSWR from 'swr';
import { WorkRoutineEntry, WorkRoutineList, dummyWorkRoutineGenericResponse } from './workRoutineModel';

const hostName = import.meta.env.VITE_HOSTNAME;
const api = axios.create({ baseURL: hostName });
export const getWorkRoutine = () => 
{
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR<GenericResponseModel<WorkRoutineList>, Error>(
                                        hostName + "/api/WorkRoutine/GetAll",
                                        fetcher, 
                                        { revalidateOnFocus: true, revalidateOnReconnect: false });

  const createWorkRoutine = async ({
                              id,
                              templateName,
                              templateType,
                              numOfShifts,
                              firstStartTime,
                              firstEndTime,
                              firstTotalTime,
                              secondStartTime,
                              secondEndTime,
                              secondTotalTime,
                              thirdStartTime,
                              thirdEndTime,
                              thirdTotalTime,
                              remark}: WorkRoutineEntry) => 
  {
    if (!data)
      {
        return dummyWorkRoutineGenericResponse;
      }                            

    let modifiedWorkRoutineEntry = {
              id: id,
              templateName: templateName,
              templateType: templateType,
              numOfShifts: numOfShifts,
              firstStartTime: firstStartTime,
              firstEndTime: firstEndTime,
              firstTotalTime: firstTotalTime,
              secondStartTime: secondStartTime ? secondStartTime : "",
              secondEndTime: secondEndTime ? secondEndTime : "",
              secondTotalTime: secondTotalTime ? secondTotalTime : 0,
              thirdStartTime: thirdStartTime ? thirdStartTime : "",
              thirdEndTime: thirdEndTime ? thirdEndTime : "",
              thirdTotalTime: thirdTotalTime ? thirdTotalTime : 0,
              remark: remark
    };  
    const response = await api.post<GenericResponseModel<WorkRoutineEntry>>(
                                hostName + "/api/WorkRoutine/Save", 
                                modifiedWorkRoutineEntry);                                  
    if (response.data.succeed)
      {
        let dataAfterAdd = [...data.data, modifiedWorkRoutineEntry];

        mutate({...data, data: dataAfterAdd} );
      }
      
    return response.data;
  }

  const updateWorkRoutine = async (workRoutineEntry: WorkRoutineEntry) => 
  {
    if (!data)
      {
        return dummyWorkRoutineGenericResponse;
      }                            

    const response = await api.post<GenericResponseModel<WorkRoutineEntry>>(
                                hostName + "/api/WorkRoutine/Save", 
                                workRoutineEntry);                                  
    if (response.data.succeed)
      {
        let originalWorkRoutineList = data.data;
        let dataAfterUpdate = originalWorkRoutineList.map(
                      (task) => (task.id === workRoutineEntry.id ? workRoutineEntry: task));
        mutate({...data, data: dataAfterUpdate} );
      }
      
    return response.data;
  }
  
  const deleteWorkRoutine = async (id: number) =>
  {
    if (!data)
      {
        return dummyWorkRoutineGenericResponse;
      }

    const response = await api.delete<GenericResponseModel<WorkRoutineEntry>>(
                                  hostName + "/api/WorkRoutine/Delete", 
                                  {
                                    params: { id: id }
                                  });

    if (response.data.succeed)
      {
        let dataAfterDelete = data ? data.data.filter((item) => item.id == id, false) : [];

        mutate({...data, data: dataAfterDelete} )
      }

    return response.data;
  }

  return {data, error, isLoading, createWorkRoutine, updateWorkRoutine, deleteWorkRoutine}
}