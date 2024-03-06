import { notFound } from "next/navigation";
import React from "react";
import { z } from "zod";

import { getArticleByUuid } from "@/lib/crud/article";

import { ArticleDetails } from "@/components/articles/ArticleDetails";

const uuidSchema = z.object({
  uuid: z.string().uuid(),
});

type UuidParams = z.infer<typeof uuidSchema>;

type ArticlePageProps = {
  params: UuidParams;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  let uuid: string;
  try {
    const result = uuidSchema.parse(params);
    uuid = result.uuid;
  } catch (error) {
    // TODO: Replace with logging library
    console.log("Warning: guid not found: ", error);
    notFound();
  }
  // TODO: Replace with logging library
  console.log("guid", uuid);

  const article = await getArticleByUuid(uuid);
  if (!article) {
    notFound();
  }

  // TODO: Long poll the status of the article based on UUID and update the status badge and progress bar (SWR?)

  // TODO: Extract Markdown rendering to a separate client-side component and make the article page server-side rendered
  return (
    <ArticleDetails
      article={{
        uuid: article.uuid,
        title: article.title,
        status: article.status,
        content: article.content,
        createdAt: article.createdAt.toISOString(),
      }}
    />
  );
}
