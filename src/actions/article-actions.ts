"use server";

import OpenAI from "openai";

import prisma from "@/lib/db";
import logger from "@/lib/logger";

import { Article, SingleArticleGenerationSchema } from "@/types/articles";

// TODO: Refactor into a more generic type (possibly with a class hierarchy e.g. a base response)
export type CreateArticleActionResponse = {
  status: "success" | "error";
  message: string;
  article: Article | null;
} | null;

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

  // TODO: Persist the article to the database with a pending generation status

  // TODO: Review BF logic and use it to create the article including error handling
  const newArticle = await prisma.article.create({ data: { title: "Hello title", content: "Stuff" } });
  logger.debug(`Created new article in the database: ${JSON.stringify(newArticle, null, 2)}`);

  const wordCount = 1500; // TODO: Extract to constants file (and allow user to specify with limits)
  const articleResponse = await generateArticle(validatedInput.title, wordCount);
  logger.debug(`Generated article OpenAI response: ${JSON.stringify(articleResponse, null, 2)}`);

  // TODO: Update the article in the database with the generated content and completion status (or error)

  return {
    status: "success",
    message: "The article was successfully scheduled to be generated",
    article: {
      guid: "c9d69962-6d41-46d0-aadc-d54fc6207de0",
      title: title,
      mode: "title",
      content: null,
      //status: randomStatus as "pending" | "completed" | "error",
      status: "pending",
    },
  };
}

// TODO: Move to a separate file
const generateArticle = async (title: string, wordCount = 1500) => {
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
        Use the following JSON schema for the response:
        {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "title": "ArticleResponse",
          "type": "object",
          "properties": {
            "articleTitle": {
              "type": "string",
              "description": "The title of the generated article."
            },
            "wordCount": {
              "type": "number",
              "description": "The total word count of the generated article."
            },
            "articleContent": {
              "type": "string",
              "description": "The Markdown formatted content of the article."
            },
            "subheadings": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "A list of subheadings used within the article."
            },
            "summary": {
              "type": "string",
              "description": "A brief summary of the key points covered in the article."
            },
            "completionStatus": {
              "type": "string",
              "enum": ["complete", "incomplete"],
              "description": "Indicates if the article content fully covers the prompt or if it was cut off due to token limit."
            }
          },
          "required": ["articleTitle", "wordCount", "articleContent", "summary", "completionStatus"]
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
      return JSON.parse(articleResponseAsJsonString);
    } catch (error) {
      logger.warn("Unable to parse and validate extracted content from OpenAI as JSON", error);
    }
  } else {
    logger.warn("Unexpected null response from OpenAI's chat completion API while generating article");
  }
  return null;
};
