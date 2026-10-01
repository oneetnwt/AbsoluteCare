import z from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    captchaToken: z.string().min(1, "reCAPTCHA verification is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  captchaToken: z.string().min(1, "reCAPTCHA verification is required"),
});

export const profileUpdateSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  phone: z.string().trim().max(30).optional().default(""),
  dateOfBirth: z.string().trim().max(30).nullable().optional(),
  address: z.string().trim().max(240).optional().default(""),
  profilePicture: z.string().trim().max(2_000_000).optional().default(""),
});
