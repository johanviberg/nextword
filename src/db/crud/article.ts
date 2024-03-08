import { Article, ArticleStatus } from "@prisma/client";

import prisma from "@/lib/db";

export const getArticleByUuid = async (uuid: string): Promise<Article | null> => {
  return prisma.article.findUnique({ where: { uuid } });
};

export const createArticleWithTitle = async (title: string, status: ArticleStatus = ArticleStatus.PENDING) => {
  return prisma.article.create({
    data: {
      title: title,
      status: status,
    },
  });
};

export const updateArticleWithContent = async (uuid: string, content: string, status: ArticleStatus, generatedAt: Date) => {
  return prisma.article.update({
    data: {
      content: content,
      status: status,
      generatedAt: generatedAt.toISOString(),
    },
    where: { uuid: uuid },
  });
};
