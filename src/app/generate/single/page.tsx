"use client";

import { SingleArticleGenerationForm } from "@/components/SingleArticleGenerationForm";

export default function SingleArticleGeneratorPage() {
  return (
    <>
      <h1 className="mt-10 text-xl font-semibold">Single Article Generator</h1>
      <div className="mt-10">
        <SingleArticleGenerationForm />
      </div>
    </>
  );
}
