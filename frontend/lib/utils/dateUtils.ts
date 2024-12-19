import dayjs from "dayjs";

export function createDayjsFromYear(year: number)
{
    const dayjsObject = dayjs(Date.now());
    dayjsObject.set("year", year);
    return dayjsObject;
}

export function getYesterday(){
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};

export function getTime(date: string){
  let dateObject = dayjs(date);
  let timeString = String(dateObject.hour()).padStart(2, '0') + ":" + String(dateObject.minute()).padStart(2, '0');
  return timeString;
}

export function getTimeFromDate(date: Date | undefined){
  if (date == undefined)
    {
      return "";      
    }
  
  let dateObject = dayjs(date);
  let timeString = String(dateObject.hour()).padStart(2, '0') + ":" + String(dateObject.minute()).padStart(2, '0');
  return timeString;
}

export function createDate(time: string | undefined)
{
  if (time == "" || time == undefined)
    {
      return undefined;
    }
  let myDate = new Date();
  myDate.setHours(Number(time.substring(0, 2)));
  myDate.setMinutes(Number(time.substring(3,5)));
  return myDate;
}