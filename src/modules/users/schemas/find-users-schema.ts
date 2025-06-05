import { z } from "zod";

export const findUsersSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    birth_date: z.date(),
    created_at: z.date(),
    updated_at: z.date(),
  })
);

export type findUsers = z.infer<typeof findUsersSchema>;
