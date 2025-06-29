import { prisma } from "../../../lib/prisma";
import { CreateArticle } from "../schemas/create-article-schema";
import { findArticlesSchemaWithFilters } from "../schemas/find-articles-schema";
import { UpdateArticle } from "../schemas/update-article-schema";

export class ArticlesServices {
  constructor() {}
  async findAll(filters?: findArticlesSchemaWithFilters) {
    if(!filters)  return await prisma.articles.findMany();

    const { title, content, author_id } = filters;

      return await prisma.articles.findMany({
        where: {
          title: title ? { contains: title, mode: 'insensitive' } : undefined,
          content: content ? { contains: content, mode: 'insensitive' } : undefined,
          author_id: author_id ? author_id : undefined,
        },
      });
  }

  async find(articleId: string) {
    return await prisma.articles.findUnique({ where: { id: articleId } });
  }

  async create(createArticle: CreateArticle) {
    return await prisma.articles.create({ data: createArticle });
  }

  async update(articleId: string, updateArticle: UpdateArticle) {
    return await prisma.articles.update({
      data: updateArticle,
      where: { id: articleId },
    });
  }

  async delete(articleId: string) {
    return await prisma.articles.delete({ where: { id: articleId } });
  }
}
