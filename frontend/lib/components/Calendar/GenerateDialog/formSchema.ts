import { z } from "../../../localization/zodValidation";
import { getYesterday } from "../../../utils/dateUtils";
import { FieldErrors } from "react-hook-form";

export const generateSchema = z
  .object({
    startDate: z.coerce
      .date({
        invalid_type_error: "应能够强制转化为日期Date类型",
        required_error: "此日期必填",
      })      
      .min(getYesterday(), "计划日期不应晚于当天日期"),

    endDate: z.coerce
      .date({
        invalid_type_error: "应能够强制转化为日期Date类型",
        required_error: "此日期必填",
      })
      .min(getYesterday(), "计划日期不应晚于当天日期"),

    type: z.coerce.number(),

    allDayId: z.string().optional(),

    workDayId: z.string().optional(),

    weekendId: z.string().optional(),

    holidayId: z.string().optional(),
    })
  .refine((data) => data.startDate <= data.endDate, {
    message: "开始日期不应晚于结束日期",
    path: ["dateRangeError"],
  })
  .superRefine((data, ctx) => {

    if (data.type == 0)
      {
        if (data.allDayId == "")
          {
            ctx.addIssue({
              path: ["allDayId"],
              code: z.ZodIssueCode.custom,
              message: "通用模板必选"
            });
          }
      }

    if (data.type == 1)
      {
        if (data.workDayId == "")
          {
            ctx.addIssue({
              path: ["workDayId"],
              code: z.ZodIssueCode.custom,
              message: "工作日模板必选"
            });
          }
        if (data.weekendId == "")
          {
            ctx.addIssue({
              path: ["weekendId"],
              code: z.ZodIssueCode.custom,
              message: "休息日模板必选"
            });
          }
        if (data.weekendId == "")
          {
            ctx.addIssue({
              path: ["holidayId"],
              code: z.ZodIssueCode.custom,
              message: "节假日模板必选"
            });
          }
      }
  });
  
export type GenerateCalendarFormData = {dateRangeError: string} & z.infer<typeof generateSchema>;

export function generateFormErrorMessages(errors: FieldErrors)
{
    if (errors?.dateRangeError != undefined)
    {
        return String(errors.dateRangeError.message);
    }
    else if (errors?.root != undefined)
    {
        return String(errors?.root?.message);
    }
    else
    {
        return "";
    }
}