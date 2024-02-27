import { z } from "zod";

// TODO: Consider replacing with a Prisma model later
export const ArticleSchema = z.object({
  guid: z.string().uuid(),
  title: z.string(),
  mode: z.enum(["title", "keyword"]),
  content: z.string().nullable(),
  status: z.enum(["pending", "completed", "error"]),
});

export type Article = z.infer<typeof ArticleSchema>;
export const SingleArticleGenerationSchema = z.object({
  // TODO: Change to enum: ["title", "keyword"] (re-use keys and values in the select input options)
  mode: z
    .string({
      required_error: "Please select a generation mode to use.",
    })
    .transform((val) => val.trim()),
  title: z
    .string({
      required_error: "Please enter your article title.",
    })
    .min(3, "Your article title must be at least 3 characters long.")
    .max(100, "Your article title can be at most 100 characters long.")
    .transform((val) => val.trim()),
});
