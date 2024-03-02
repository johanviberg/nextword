"use server";

import { Article, ArticleStatus } from "@prisma/client";
import OpenAI from "openai";
import { z } from "zod";

import prisma from "@/lib/db";
import logger from "@/lib/logger";

import { SingleArticleGenerationSchema } from "@/types/articles";

// TODO: Refactor into a more generic type (possibly with a class hierarchy e.g. a base response)
export type CreateArticleActionResponse = {
  status: "success" | "error";
  message: string;
  article: Article | null;
} | null;

const ArticleGenerationResponseSchema = z.object({
  title: z.string(),
  summary: z.string(),
  subheadings: z.array(z.string()),
  content: z.string(),
  estimatedWordCount: z.number(),
});

type ArticleGenerationResponse = z.infer<typeof ArticleGenerationResponseSchema>;

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
    return { status: "error", message: `Invalid form input provided: ${error}`, article: null };
  }

  try {
    const newArticle = await prisma.article.create({
      data: {
        title: validatedInput.title,
        status: ArticleStatus.PENDING,
      },
    });
    logger.debug(`Created new article in the database: ${JSON.stringify(newArticle, null, 2)}`);

    try {
      const wordCount = 1500; // TODO: Extract to constants file (and allow user to specify with limits)
      const articleGenerationResponse: ArticleGenerationResponse | null = await generateArticle(validatedInput.title, wordCount);

      if (!articleGenerationResponse) {
        return { status: "error", message: "Failed to generate content for the article", article: newArticle };
      }
      logger.debug(`Generated article OpenAI response: ${JSON.stringify(articleGenerationResponse, null, 2)}`);

      try {
        const updatedArticle = await prisma.article.update({
          data: {
            content: articleGenerationResponse.content,
            status: ArticleStatus.COMPLETE,
            generatedAt: new Date().toISOString(),
          },
          where: { id: newArticle.id },
        });
        logger.debug(`Updated article in the database: ${JSON.stringify(updatedArticle, null, 2)}`);

        return {
          status: "success",
          message: "The article was successfully scheduled to be generated",
          article: updatedArticle,
        } as CreateArticleActionResponse;
      } catch (error) {
        logger.error("Failed to update the article in the database", error);
        return { status: "error", message: "Failed to update the article in the database", article: newArticle };
      }
    } catch (error) {
      logger.error("Failed to generate content for the article using OpenAI", error);
      return { status: "error", message: "Failed to generate content for the article", article: newArticle };
    }
  } catch (error) {
    logger.error("Failed to create a new article in the database", error);
    return { status: "error", message: "Failed to create a new article", article: null };
  }
}

// TODO: Move to a separate file
const generateArticle = async (title: string, wordCount = 1500): Promise<ArticleGenerationResponse | null> => {
  const openai = new OpenAI({
    // TODO: Consider using zod or similar to validate the API key (required to run)
    apiKey: process.env["OPENAI_API_KEY"],
  });

  const systemPrompt = `
        Given the article title provided by the user, write a compelling and coherent article adhering strictly to a 
        word count provided by the user. Include relevant subheadings to organize the content effectively. Ensure the 
        article is engaging, informative, and tailored to the intended audience. Format the article in Markdown to 
        enhance readability and structure. Provide a concise introduction that sets the stage for the readers, followed 
        by a detailed body that delves into the topic with clarity and depth. Conclude the article with a strong 
        closing section that summarizes the key points and leaves the readers with a lasting impression. Remember, 
        the goal is to deliver value and insight on the subject matter within the specified word count constraint.
        Use the following JSON structure for the response but with the actual content filled in for the values of
        the JSON properties:
       {
        "title": "",
        "summary": "",
        "subheadings": [],
        "content": "",
        "estimatedWordCount": 0,
      }
    `;

  const userPrompt = `
      Title: ${title}
      Word Count: ${wordCount}
   `;

  // TODO: Handle errors (log to Slack log channel, etc.)
  // TODO: Replace with the latest GPT-4 model
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model: "gpt-4-turbo-preview",
    response_format: { type: "json_object" },
  });

  // TODO: Add OpenAI zod schema validation: https://www.npmjs.com/package/openai-zod-functions
  const articleResponseAsJsonString = chatCompletion.choices[0].message.content;
  if (articleResponseAsJsonString) {
    try {
      const articleResponseAsJson = JSON.parse(articleResponseAsJsonString);
      try {
        return ArticleGenerationResponseSchema.parse(articleResponseAsJson);
      } catch (error) {
        logger.warn("Failed to validate the validate content from OpenAI as JSON", error);
        return null;
      }
    } catch (error) {
      logger.warn("Unable to parse and validate extracted content from OpenAI as JSON", error);
    }
  } else {
    logger.warn("Unexpected null response from OpenAI's chat completion API while generating article");
  }
  return null;
};
