import { z } from "zod";

export const updateArticleSchema = z.object({
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "title must be a string",
  }),
  content: z.string({
    required_error: "content is required",
    invalid_type_error: "content must be a string",
  }),
});

export type UpdateArticle = z.infer<typeof updateArticleSchema>;
