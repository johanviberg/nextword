"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { generateSingleArticle } from "@/actions/article-actions";

import { SingleArticleGenerationSchema } from "@/types/articles";

export function SingleArticleGenerationForm() {
  const form = useForm<z.infer<typeof SingleArticleGenerationSchema>>({
    resolver: zodResolver(SingleArticleGenerationSchema),
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onGenerateArticle = async (data: z.infer<typeof SingleArticleGenerationSchema>) => {
    try {
      setLoading(true);

      const resp = await generateSingleArticle(data.title, data.mode);
      if (!resp) {
        toast.error("An unknown error occurred while generating the article. Please try again.");
      } else {
        if (resp.status === "error") {
          toast.error(`An error occurred while generating the article. Please try again. ${resp.message}`);
        } else {
          if (resp.article) {
            toast.message("Great News", {
              description: "Your article is being generated 🎉",
              action: {
                label: "Create Another",
                onClick: () => router.push("/generate/single"),
              },
            });
            router.push(`/articles/${resp.article.guid}`);
          } else {
            toast.error("An unexpected error occurred while generating the article. Please try again.");
          }
        }
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
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generation Mode</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select how you want to generate the article" />
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
            name="title"
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
            {loading ? "Scheduling..." : "Generate"}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
