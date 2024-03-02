import { notFound } from "next/navigation";
import React from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";

const uuidSchema = z.object({
  uuid: z.string().uuid(),
});

type UuidParams = z.infer<typeof uuidSchema>;

type ArticlePageProps = {
  params: UuidParams;
};

export default function ArticlePage({ params }: ArticlePageProps) {
  let guid: string;
  try {
    const result = uuidSchema.parse(params);
    guid = result.uuid;
  } catch (error) {
    // TODO: Replace with logging library
    console.log("Warning: guid not found: ", error);
    notFound();
  }
  // TODO: Replace with logging library
  console.log("guid", guid);

  // TODO: Fetch article matching the guid from the db

  return (
    <>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-10">Article Page</h4>
      <div className="flex flex-col mt-5 space-y-2.5">
        {/* TODO: Replace with dynamic values from the fetched article */}
        <div>Generation Mode: Article Title</div>
        <div>Article Title: "How to make a website"</div>
        <div>Created: February 25, 2024 at 9:12 am (local time)</div>
        {/* TODO: Add an animated icon to show an article in progress, failed, success */}
        {/* TODO: Add dynamically updated badge (use button variant depending on result) */}
        <div>Status: Completed Successfully</div>
        <div className="pt-8">
          {/* TODO: Add an event handler to show a modal with the markdown article */}
          <Button>Show Article</Button>
          {/* TODO: Add other actions that are relevant to an article (CRUD, push to WordPress, etc.) */}
        </div>
      </div>
    </>
  );
}