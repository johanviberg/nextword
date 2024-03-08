import { Article } from "@prisma/client";

export type ActionResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T | null;
} | null;

// TODO: Revisit this since we want to avoid exposing the entire Article model to the client
export type CreateArticleActionResponse = ActionResponse<Article>;
