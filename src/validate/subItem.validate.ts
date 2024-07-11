import { z } from "zod";

export const subItemSchema = z.object({
  body: z.object({
    courseName: z.string().min(1, {
      message: "Course name is required",
    }),
    courseDescription: z.string().min(1, {
      message: "Course description is required",
    }),
  }),
});
