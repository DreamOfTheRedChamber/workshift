import { z } from "../../../localization/zodValidation";
import { FieldErrors } from "react-hook-form";
import dayjs from "dayjs";

export const workRoutineSchema = z
  .object({
    templateName: z
      .string({
        invalid_type_error: "此模板名必填",
        required_error: "此模板名必填",
      })
      .trim()
      .min(3, {
        message: "作息模板名至少有三个字符"
      })
      .max(10, {
        message: "作息模板名至多有十个字符"
      }),

    templateType: z
      .string({
        message: "排班模板必选"
      }),

    numOfShifts: z
      .string({
        message: "班次数量必选"
      }),

    // 1. There is no time type in typescript, MUI passed back an object. 
    // Either parse it as Date or String, opt for date() here. 
    // 2. Theoretically, firstStart/EndTime should be required here.
    // Define them as optional to be consistent with second*/third*
    firstStartTime: z.coerce.date().optional(),
    firstEndTime:  z.coerce.date().optional(),
    firstTotalTime: z.coerce
      .number({
        invalid_type_error: "必须为数字",
      }),

    secondStartTime: z.coerce.date().optional(),
    secondEndTime:  z.coerce.date().optional(),
    secondTotalTime: z.coerce
      .number({
        invalid_type_error: "必须为数字",
      })
      .optional(),

    thirdStartTime: z.coerce.date().optional(),
    thirdEndTime:  z.coerce.date().optional(),
    thirdTotalTime: z.coerce
      .number({
        required_error: "必须为数字",
      })
      .optional(),

    remark: z
      .string({
        invalid_type_error: "此模板名必填",
        required_error: "此模板名必填",
      })
      .trim(),      
  })
  .superRefine((data, ctx) => {
    if (data.templateType == "")
    {        
        ctx.addIssue({
            path: ["templateType"],
            code: z.ZodIssueCode.custom,
            message: "排班模板必选"
        });
    }  
    if (data.numOfShifts == "" || data.numOfShifts == null)
    {        
        ctx.addIssue({
            path: ["numOfShifts"],
            code: z.ZodIssueCode.custom,
            message: "班次数量必选"
        });
    }

    let firstStartTime = dayjs(data.firstStartTime);
    let firstEndTime = dayjs(data.firstEndTime);
    let firstTotalTime = data.firstTotalTime;
    if (firstStartTime.isAfter(firstEndTime) || firstStartTime.isSame(firstEndTime))
      {
        ctx.addIssue({
            path: ["firstStartTime"],
            code: z.ZodIssueCode.custom,
            message: "开始时间应小于结束时间"
        });
      }
    if (firstTotalTime == 0)
      {
        ctx.addIssue({
            path: ["firstTotalTime"],
            code: z.ZodIssueCode.custom,
            message: "工作时长必填,应大于0"
        });
      }
    if (firstStartTime.add(firstTotalTime, 'hour').isAfter(firstEndTime))
      {
        ctx.addIssue({
            path: ["firstTotalTime"],
            code: z.ZodIssueCode.custom,
            message: "工作时长不应大于结束时间与结束时间之差"
        });
      }

    let secondStartTime = dayjs(data.secondStartTime);
    let secondEndTime = dayjs(data.secondEndTime);
    let secondTotalTime = data.secondTotalTime ? data.secondTotalTime : 0;
    if (data.numOfShifts == "2" || data.numOfShifts == "3")
      {
        // Only validate if secondStartTime & secondEndTime have been modified
        if (secondStartTime.isBefore(firstEndTime))
          {
            ctx.addIssue({
                path: ["firstEndTime"],
                code: z.ZodIssueCode.custom,
                message: "第二班开始时间应大于第一班结束时间"
            });
          }
        if (secondStartTime.isAfter(secondEndTime) || secondStartTime.isSame(secondEndTime))
          {
            ctx.addIssue({
                path: ["secondStartTime"],
                code: z.ZodIssueCode.custom,
                message: "开始时间应小于结束时间"
            });
          }
          if (secondStartTime.add(secondTotalTime, 'hour').isAfter(secondEndTime))
          {
            ctx.addIssue({
                path: ["secondTotalTime"],
                code: z.ZodIssueCode.custom,
                message: "工作时长不应大于结束时间与结束时间之差"
            });
          }
          if (secondTotalTime == 0)
          {
            ctx.addIssue({
                path: ["secondTotalTime"],
                code: z.ZodIssueCode.custom,
                message: "工作时长必填,应大于0"
            });
          }
      }  

    let thirdStartTime = dayjs(data.thirdStartTime);
    let thirdEndTime = dayjs(data.thirdEndTime);
    let thirdTotalTime = data.thirdTotalTime ? data.thirdTotalTime : 0;
    if (data.numOfShifts == "3")
      {
        // Only validate if thirdStartTime & thirdEndTime have been modified
        if (thirdStartTime.isBefore(secondEndTime))
          {
            ctx.addIssue({
                path: ["secondEndTime"],
                code: z.ZodIssueCode.custom,
                message: "第三班开始时间应大于第二班结束时间"
            });
          }
        if (thirdStartTime.isAfter(thirdEndTime) || thirdStartTime.isSame(thirdEndTime))
          {
            ctx.addIssue({
                path: ["thirdStartTime"],
                code: z.ZodIssueCode.custom,
                message: "开始时间应小于结束时间"
            });
          }
        if (thirdStartTime.add(thirdTotalTime, 'hour').isAfter(thirdEndTime))
          {
            ctx.addIssue({
                path: ["thirdTotalTime"],
                code: z.ZodIssueCode.custom,
                message: "工作时长不应大于结束时间与结束时间之差"
            });
          }
        if (thirdTotalTime == 0)
          {
            ctx.addIssue({
                path: ["thirdTotalTime"],
                code: z.ZodIssueCode.custom,
                message: "工作时长必填,应大于0"
            });
          }
      }  
  });
  
export type WorkRoutineFormData = z.infer<typeof workRoutineSchema>;

export function generateFormErrorMessages(errors: FieldErrors)
{
    if (errors?.root != undefined)
    {
        return String(errors?.root?.message);
    }
    else
    {
        return "";
    }
}