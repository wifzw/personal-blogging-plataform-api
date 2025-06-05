import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string({
    required_error: "name is required",
    invalid_type_error: "name must be a string",
  }),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
