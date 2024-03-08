import OpenAI from "openai";

import logger from "@/lib/logger";

import { ArticleLLMGenerationResponse, ArticleLLMGenerationResponseSchema } from "@/types/schemas/article";

export const generateLLMArticle = async (title: string, wordCount = 1500): Promise<ArticleLLMGenerationResponse | null> => {
  const openai = new OpenAI({
    // TODO: Consider using zod or similar to validate the API key (required to run)
    apiKey: process.env["OPENAI_API_KEY"],
  });

  // TODO: Consider extracting the system prompt to a separate file (models/prompts.ts)
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
        return ArticleLLMGenerationResponseSchema.parse(articleResponseAsJson);
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
