"use server";

import { ArticleStatus } from "@prisma/client";

import logger from "@/lib/logger";

import { generateLLMArticle } from "@/ai/openai";
import { createArticleWithTitle, updateArticleWithContent } from "@/db/crud/article";

import { CreateArticleActionResponse } from "@/types/action-response";
import { ArticleLLMGenerationResponse, SingleArticleGenerationSchema } from "@/types/schemas/article";

// TODO: Consider refactoring the function to handle both new articles and existing articles with re-generation
export async function generateSingleArticle(title: string, mode: string): Promise<CreateArticleActionResponse> {
  logger.debug(`Generating article using OpenAI with title: "${title}" and mode: "${mode}"`);
  let validatedInput;
  try {
    validatedInput = SingleArticleGenerationSchema.parse({
      title: title,
      mode: mode,
    });
  } catch (error) {
    logger.error("Server-side validation failed for the article generation request", error);
    return { status: "error", message: `Invalid form input provided: ${error}`, data: null };
  }

  try {
    const newArticle = await createArticleWithTitle(validatedInput.title, ArticleStatus.PENDING);
    logger.debug(`Created new article in the database: ${JSON.stringify(newArticle, null, 2)}`);

    try {
      const targetWordCount = 1500; // TODO: Extract to constants file (and allow user to specify with limits)
      const articleLLMGenerationResp: ArticleLLMGenerationResponse | null = await generateLLMArticle(validatedInput.title, targetWordCount);

      if (!articleLLMGenerationResp) {
        return { status: "error", message: "Failed to generate content for the article", data: newArticle };
      }
      logger.debug(`Generated article OpenAI response: ${JSON.stringify(articleLLMGenerationResp, null, 2)}`);

      try {
        const updatedArticle = await updateArticleWithContent(
          newArticle.uuid,
          articleLLMGenerationResp.content,
          ArticleStatus.COMPLETE,
          new Date(),
        );
        logger.debug(`Updated article in the database: ${JSON.stringify(updatedArticle, null, 2)}`);

        return {
          status: "success",
          message: "The article was successfully scheduled to be generated",
          data: updatedArticle,
        };
      } catch (error) {
        logger.error("Failed to update the article in the database", error);
        return {
          status: "error",
          message: "Failed to update the article in the database",
          data: newArticle,
        };
      }
    } catch (error) {
      logger.error("Failed to generate content for the article using OpenAI", error);
      return {
        status: "error",
        message: "Failed to generate content for the article",
        data: newArticle,
      };
    }
  } catch (error) {
    logger.error("Failed to create a new article in the database", error);
    return { status: "error", message: "Failed to create a new article", data: null };
  }
}
