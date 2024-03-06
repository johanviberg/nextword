"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "react-query";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// TODO: Consider passing a reduced article object to the component e.g. without primary key
interface ArticleDetailsProps {
  uuid: string;
  title: string;
  status: string;
  content?: string | null;
  generatedAt?: string | null;
  createdAt: string;
}

// TODO: Extract into utils directory
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return res.json();
};

// TODO: Extract into a hooks directory
// TODO: Use the Prisma enum for status checks instead of strings
// TODO: Add basic retry logic for 429 and >= 500 errors
const useArticleStatusWithQuery = (uuid: string, initialStatus: string) => {
  return useQuery<ArticleDetailsProps, Error>(["articleStatus", uuid], () => fetcher(`/api/articles/${uuid}`), {
    // Poll every 3 seconds if the query is enabled and the status is not 'complete' or 'error'
    refetchInterval: (data) => (data?.status === "COMPLETE" || data?.status === "ERROR" ? false : 3000),
    // Continue polling even if the browser tab is in the background
    refetchIntervalInBackground: true,
    // Enable the query if the initial status is not 'complete' or 'error', and stop polling if the fetched status is 'complete' or 'error'
    enabled: initialStatus !== "COMPLETE" && initialStatus !== "ERROR",
  });
};

export const ArticleDetails = ({ article }: { article: ArticleDetailsProps }) => {
  const [showArticle, setShowArticle] = React.useState(false);

  const { data, error } = useArticleStatusWithQuery(article.uuid, article.status);
  if (error) {
    toast.error("An error occurred while checking on the article.");
  }
  const toggleShowArticle = () => {
    setShowArticle(!showArticle);
  };

  return (
    <>
      <h4 className="mt-10 scroll-m-20 text-xl font-semibold tracking-tight">{article.title}</h4>
      <div className="mt-5 flex flex-col space-y-2.5">
        <div>Generation Mode: Article Title</div>
        <div>Created: {article.createdAt}</div>
        {/* TODO: Add an animated icon to show an article in progress, failed, success */}
        {/* TODO: Show progress bar with status labels */}
        {/* TODO: Add dynamically updated badge (use button variant depending on result) */}
        <div>Status: {!data ? article.status : data.status}</div>
        <div className="py-8">
          <Button className={cn(article.status === "COMPLETE" || data?.status === "COMPLETE" ? "" : "hidden")} onClick={toggleShowArticle}>
            {showArticle ? "Hide Article" : "Show Article"}
          </Button>
          {/* TODO: Add other actions that are relevant to an article (Rewrite, CRUD, push to WordPress, etc.) */}
        </div>
        <div className={cn(!showArticle && "hidden", "rounded border-2 border-gray-100 p-5 drop-shadow-sm")}>
          <ScrollArea className="h-96">
            <ReactMarkdown className="prose">{article.content || "No content available"}</ReactMarkdown>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};
