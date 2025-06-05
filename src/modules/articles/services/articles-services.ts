import { prisma } from "../../../lib/prisma";
import { CreateArticle } from "../schemas/create-article-schema";
import { UpdateArticle } from "../schemas/update-article-schema";

export class ArticlesServices {
  constructor() {}
  async findAll() {
    return await prisma.articles.findMany();
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
