import { z } from "zod";

export const findArticlesSchema = z.array(
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    content: z.string(),
    author_id: z.string().uuid(),
    created_at: z.date(),
    updated_at: z.date(),
  })
);

export type findArticles = z.infer<typeof findArticlesSchema>;
