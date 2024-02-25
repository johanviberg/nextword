"use client";

import React, { createContext, useState } from "react";

import { SingleArticleGenerationForm } from "@/components/SingleArticleGenerationForm";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: Consider adding a completion value to enable the user to know when the article is ready
export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);
export const SingleArticleGeneration = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LoadingContext.Provider value={{ loading: loading, setLoading }}>
        <div>
          <SingleArticleGenerationForm />
        </div>
        <div className="mt-12">
          {loading && (
            <div className="flex flex-col items-center">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Generating article... You can safely leave this page while the article is being prepared.
              </p>
              <LoadingSpinner className="w-16 h-16 text-gray-500 mt-8" />
            </div>
          )}
        </div>
      </LoadingContext.Provider>
    </>
  );
};
