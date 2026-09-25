import z from "zod";

export const signupSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    password: z.string(),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    error: "Passwords do not match",
    path: ["confirmpassword"],
  });
