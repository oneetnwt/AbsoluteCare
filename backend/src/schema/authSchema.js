import z from "zod";

export const signupSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmpassword: z.string(),
    captchaToken: z.string().min(1, "reCAPTCHA verification is required"),
    role: z
      .enum(["user", "therapist", "admin", "secretary"])
      .optional()
      .default("user"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  captchaToken: z.string().min(1, "reCAPTCHA verification is required"),
});
