"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { LoadingContext } from "@/components/SingleArticleGeneration";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { generateSingleArticle } from "@/actions/article-actions";

const SingleArticleGenerationSchema = z.object({
  generationMode: z.string({
    required_error: "Please select a generation mode to use.",
  }),
  articleTitle: z
    .string({
      required_error: "Please enter your article title.",
    })
    .min(3, "Your article title must be at least 3 characters long."),
});

export function SingleArticleGenerationForm() {
  const form = useForm<z.infer<typeof SingleArticleGenerationSchema>>({
    resolver: zodResolver(SingleArticleGenerationSchema),
  });

  const context = useContext(LoadingContext);

  if (!context) {
    console.log("Error: No context found when generating single article");
    throw new Error("LoadingContext is undefined. Ensure the component is wrapped in a LoadingContext.Provider.");
  }

  const { loading, setLoading } = context;
  const onGenerateArticle = async (data: z.infer<typeof SingleArticleGenerationSchema>) => {
    try {
      setLoading(true);

      const resp = await generateSingleArticle(data.articleTitle, data.generationMode);
      if (!resp) {
        toast.error("An error occurred while generating the article. Please try again.");
      } else {
        toast.message("Success! Here is the article:", {
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(resp.message, null, 2)}</code>
            </pre>
          ),
        });
      }
    } catch (error) {
      toast.error("An error occurred while generating the article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onGenerateArticle)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="generationMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generation Mode</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a content generation mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="title">Article Title</SelectItem>
                    <SelectItem value="keyword" disabled>
                      Keyword (Not Yet Supported)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className={cn("text-xs")}>
                  You can learn more about generation modes in our <Link href="/">help</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="articleTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the article title you want Nextword to write about" {...field} disabled={loading} />
                </FormControl>
                <FormDescription className={cn("text-xs")}>
                  <Link href="/">Show Article Settings</Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" disabled={!form.formState.isValid || loading} loading={loading}>
            Generate
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
