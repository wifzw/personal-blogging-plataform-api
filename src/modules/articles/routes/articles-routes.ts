import { z } from "zod";
import { FastifyInstanceTypedZod } from "../../../types/fastify-instance-typed-zod";
import { ArticlesControllers } from "../controllers/articles-controllers";
import { createArticleSchema } from "../schemas/create-article-schema";
import { findArticlesSchema } from "../schemas/find-articles-schema";
import { updateArticleSchema } from "../schemas/update-article-schema";
import { ArticlesServices } from "../services/articles-services";
import { UsersServices } from "../../users/services/users-services";

export const articlesRoute = (app: FastifyInstanceTypedZod) => {
  const articlesServices = new ArticlesServices();
  const usersServices = new UsersServices();

  const articlesControllers = new ArticlesControllers(
    articlesServices,
    usersServices
  );

  app.get(
    "/articles",
    {
      schema: {
        tags: ["articles"],
        response: {
          200: findArticlesSchema,
          400: z.object({ error: z.string() }),
          500: z
            .object({ error: z.string() })
            .describe("error to get articles"),
        },
      },
    },
    articlesControllers.findArticles.bind(articlesControllers)
  );

  app.post(
    "/articles",
    {
      schema: {
        tags: ["articles"],
        description: "Create new article",
        body: createArticleSchema,
        response: {
          201: z.null().describe("Article created"),
          400: z.object({ error: z.string() }),
          500: z
            .object({ error: z.string() })
            .describe("error to create article"),
        },
      },
    },
    articlesControllers.createArticle.bind(articlesControllers)
  );

  app.put(
    "/articles/:articleId",
    {
      schema: {
        tags: ["articles"],
        description: "Update article",
        body: updateArticleSchema,
        response: {
          200: z.null().describe("Article updated"),
          400: z.object({ error: z.string() }),
          500: z
            .object({ error: z.string() })
            .describe("error to update article"),
        },
      },
    },
    articlesControllers.updateArticle.bind(articlesControllers)
  );

  app.delete(
    "/articles/:articleId",
    {
      schema: {
        tags: ["articles"],
        description: "Remove article",
        response: {
          200: z.null().describe("Article removed"),
          400: z.object({ error: z.string() }),
          500: z
            .object({ error: z.string() })
            .describe("error to remove article"),
        },
      },
    },
    articlesControllers.deleteArticle.bind(articlesControllers)
  );
};
