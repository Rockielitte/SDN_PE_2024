import { z } from "zod";
export const registerValidate = z.object({
  body: z
    .object({
      username: z
        .string()
        .min(1, { message: "Username must be at least 1 chars!" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 chars!" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Password does not match!",
      path: ["confirmPassword"],
    }),
});
