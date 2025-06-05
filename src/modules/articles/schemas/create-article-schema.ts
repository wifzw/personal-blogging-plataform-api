import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "title must be a string",
  }),
  content: z.string({
    required_error: "content is required",
    invalid_type_error: "content must be a string",
  }),
  author_id: z.string().uuid(),
});

export type CreateArticle = z.infer<typeof createArticleSchema>;
