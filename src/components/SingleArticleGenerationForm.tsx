"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { generateSingleArticle } from "@/actions/article-actions";

const FormSchema = z.object({
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    generateSingleArticle(data.articleTitle, data.generationMode).then((res) => {
      if (!res) {
        toast.error("An error occurred while generating the article. Please try again.");
      } else {
        toast.message("You submitted the following values:", {
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        });
      }
      return res;
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="generationMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generation Mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Input placeholder="Enter the article title you want Nextword to write about" {...field} />
              </FormControl>
              <FormDescription className={cn("text-xs")}>
                <Link href="/">Show Article Settings</Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Generate
        </Button>
      </form>
    </Form>
  );
}
