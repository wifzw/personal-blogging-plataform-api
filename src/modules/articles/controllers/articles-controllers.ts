import { FastifyReply, FastifyRequest } from "fastify";
import { CreateArticle } from "../schemas/create-article-schema";
import { UpdateArticle } from "../schemas/update-article-schema";
import { ArticlesServices } from "../services/articles-services";
import { UsersServices } from "../../users/services/users-services";
import { findArticlesSchemaWithFilters } from "../schemas/find-articles-schema";

export class ArticlesControllers {
  constructor(
    readonly articlesServices: ArticlesServices,
    readonly usersServices: UsersServices
  ) {}

  async findArticles(
    request: FastifyRequest<{ Querystring: findArticlesSchemaWithFilters}>, 
    reply: FastifyReply)
 {
    try {
      const articles = await this.articlesServices.findAll(request.query);
      return reply.code(200).send(articles);
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to get articles" });
    }
  }

  async createArticle(
    request: FastifyRequest<{ Body: CreateArticle }>,
    reply: FastifyReply
  ) {
    try {
      const { title, content, author_id } = request.body;

      const author = await this.usersServices.find(author_id);

      if(!author) {
        return reply.code(400).send({ error: "author not found" });
      }

      await this.articlesServices.create({
        title,
        content,
        author_id,
      });

      return reply.code(201).send();
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to create article" });
    }
  }

  async updateArticle(
    request: FastifyRequest<{
      Params: { articleId: string };
      Body: UpdateArticle;
    }>,
    reply: FastifyReply
  ) {
    try {
      const { title, content } = request.body;

      const article = await this.articlesServices.find(
        request.params.articleId
      );

      if (!article) {
        return reply.code(400).send({ error: "article not found" });
      }

      await this.articlesServices.update(request.params.articleId, {
        title,
        content,
      });

      return reply.code(200).send();
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to update article" });
    }
  }

  async deleteArticle(
    request: FastifyRequest<{ Params: { articleId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const article = await this.articlesServices.find(
        request.params.articleId
      );

      if (!article) {
        return reply.code(400).send({ error: "article not found" });
      }

      await this.articlesServices.delete(request.params.articleId);

      return reply.code(200).send();
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: "error to remove article" });
    }
  }
}
