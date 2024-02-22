import { SingleArticleGenerationForm } from "@/components/SingleArticleGenerationForm";

export default function SingleArticleGeneratorPage() {
  return (
    <>
      <h1 className="text-xl font-semibold mt-10">Single Article Generator</h1>
      <div className="mt-10">
        <SingleArticleGenerationForm />
      </div>
    </>
  );
}
