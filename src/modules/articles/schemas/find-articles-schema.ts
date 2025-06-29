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

export const filtersArticlesSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  author_id: z.string().uuid().optional(),
});

export type findArticlesSchemaWithFilters = z.infer<typeof filtersArticlesSchema>;

export type findArticles = z.infer<typeof findArticlesSchema>;
