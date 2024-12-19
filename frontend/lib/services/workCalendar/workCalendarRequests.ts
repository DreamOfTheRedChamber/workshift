import axios from 'axios';
import { MonthEntryList } from './workCalendarModel';
import { GenericResponseModel } from '../genericResponseModel';
import useSWR from 'swr';
import {GenerateCalendarFormData} from '../../components/Calendar/GenerateDialog/formSchema'

const hostName = import.meta.env.VITE_HOSTNAME;
const api = axios.create({ baseURL: hostName });

export const getWorkCalendar = (year: number) => 
{
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR<GenericResponseModel<MonthEntryList>, Error>(
                                        hostName + "/api/WorkCalendar/GetWorkCalendar?year="+year,
                                        fetcher, 
                                        { revalidateOnFocus: true, revalidateOnReconnect: false });


 const generateWorkCalendar = async({
                          startDate, 
                          endDate, 
                          type, 
                          workDayId, 
                          weekendId, 
                          holidayId, 
                          allDayId}: GenerateCalendarFormData) =>
{
    if (!data)
      {
        return data;
      }     

    // if null value is passed to server side, an error will be reported
    // propbably server side should handle the handle value and this conversion could be avoided. 
  const response = await api.post<GenericResponseModel<MonthEntryList>>(
                                    hostName + "/api/WorkCalendar/GenerateCalendar", 
                                    {
                                      startDate: startDate,
                                      endDate: endDate,
                                      type: type,
                                      workDayId: workDayId ? Number(workDayId) : 0,
                                      weekendId: weekendId ? Number(weekendId) : 0,
                                      holidayId: holidayId ? Number(holidayId) : 0,
                                      allDayId: allDayId ? Number(allDayId) : 0,
                                    });  

  if (response.data.succeed)
    {
      let updateMonthEntryList = response.data.data ? response.data.data: [];
      mutate({...data, data: updateMonthEntryList});
    }

  return response.data;
}

  return {data, error, isLoading, generateWorkCalendar}
}