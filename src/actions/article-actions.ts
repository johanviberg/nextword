"use server";

export type ActionResponse = {
  status: "success";
  message: string;
} | null;

export async function getFullName(prevState: ActionResponse | null, data: FormData): Promise<ActionResponse> {
  // we're going put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    status: "success",
    message: `Welcome, ${data.get("firstName")} ${data.get("lastName")}!`,
  };
}

export async function generateSingleArticle(title: string, mode: string): Promise<ActionResponse> {
  // we're going put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    status: "success",
    message: `Article generated successfully with title: ${title} and mode: ${mode}!`,
  };
}
