import { duration } from "moment";
import { z } from "zod";

export const itemValidate = z.object({
  body: z.object({
    sectionName: z.string().regex(/^(?:[A-Z&](?:[a-z0-9&]| )*)+$/, {
      message: "Invalid section name format!",
    }),
    sectionDescription: z
      .string()
      .min(6, { message: "Password must be at least 6 chars!" }),
    duration: z.coerce.number(),
    isMainTask: z.coerce.boolean().optional().nullable(),
    course: z
      .string({
        message: "Course must be a required field!",
      })
      .min(1, {
        message: "Course must be a required field!",
      }),
  }),
});
