import { Article } from "@prisma/client";

import prisma from "@/lib/db";

export const getArticleByUuid = async (uuid: string): Promise<Article | null> => {
  return prisma.article.findUnique({ where: { uuid } });
};
