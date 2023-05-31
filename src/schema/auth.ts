import z from "zod";

export const registerInputSchema = z.object({
  email: z.string().email("Invalid email").describe("Email of the user"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .describe("Password"),
  name: z.string().describe("Name for the user"),
});

export const loginInputSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
