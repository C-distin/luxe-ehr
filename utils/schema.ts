import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3, "Name is required"),
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
  role: z.string().min(3, "Role is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type signUpData = z.infer<typeof signUpSchema>
