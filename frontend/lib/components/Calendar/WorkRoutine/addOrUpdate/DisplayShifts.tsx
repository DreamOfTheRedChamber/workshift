import React from "react";
import { WorkRoutineFormData } from "../formSchema";
import { Control, UseFormWatch } from "react-hook-form";
import { FormInputRadio } from "../../../FormComponents/FormInputRadio";
import { DisplayTimeRange } from "./displayTimeRange";

const radioGroupOptions = [
  {
    label: "一班",
    value: "1",
  },
  {
    label: "二班",
    value: "2",
  },
  {
    label: "三班",
    value: "3",
  },
];

interface DisplayProps {
  control: Control<WorkRoutineFormData, any>;
  watch: UseFormWatch<WorkRoutineFormData>;
}

export const DisplayShifts: React.FC<DisplayProps> = ({ control, watch }) => {
  let numOfShifts = watch("numOfShifts");

  return (
    <>
      <FormInputRadio
        name={"numOfShifts"}
        control={control}
        label={"班次数量"}
        options={radioGroupOptions}
      ></FormInputRadio>
      {numOfShifts == "1" && (
        <>
          <DisplayTimeRange
            control={control}
            startTimeName="firstStartTime"
            startTimeLabel="第一班开始时间"
            endTimeName="firstEndTime"
            endTimeLabel="第一班结束时间"
            totalTimeName="firstTotalTime"
            totalTimeLabel="第一班时长"
          ></DisplayTimeRange>
        </>
      )}
      {numOfShifts == "2" && (
        <>
          <DisplayTimeRange
            control={control}
            startTimeName="firstStartTime"
            startTimeLabel="第一班开始时间"
            endTimeName="firstEndTime"
            endTimeLabel="第一班结束时间"
            totalTimeName="firstTotalTime"
            totalTimeLabel="第一班时长"
          ></DisplayTimeRange>
          <DisplayTimeRange
            control={control}
            startTimeName="secondStartTime"
            startTimeLabel="第二班开始时间"
            endTimeName="secondEndTime"
            endTimeLabel="第二班结束时间"
            totalTimeName="secondTotalTime"
            totalTimeLabel="第二班时长"
          ></DisplayTimeRange>
        </>
      )}
      {numOfShifts == "3" && (
        <>
          <DisplayTimeRange
            control={control}
            startTimeName="firstStartTime"
            startTimeLabel="第一班开始时间"
            endTimeName="firstEndTime"
            endTimeLabel="第一班结束时间"
            totalTimeName="firstTotalTime"
            totalTimeLabel="第一班时长"
          ></DisplayTimeRange>
          <DisplayTimeRange
            control={control}
            startTimeName="secondStartTime"
            startTimeLabel="第二班开始时间"
            endTimeName="secondEndTime"
            endTimeLabel="第二班结束时间"
            totalTimeName="secondTotalTime"
            totalTimeLabel="第二班时长"
          ></DisplayTimeRange>
          <DisplayTimeRange
            control={control}
            startTimeName="thirdStartTime"
            startTimeLabel="第三班开始时间"
            endTimeName="thirdEndTime"
            endTimeLabel="第三班结束时间"
            totalTimeName="thirdTotalTime"
            totalTimeLabel="第三班时长"
          ></DisplayTimeRange>
        </>
      )}
    </>
  );
};
