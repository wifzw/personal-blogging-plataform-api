import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string({
    required_error: "name is required",
    invalid_type_error: "name must be a string",
  }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email(),
  birth_date: z.string()
});

export type CreateUser = z.infer<typeof createUserSchema>;
