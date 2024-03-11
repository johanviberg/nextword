import { inngest } from "./client";

export const helloWorld = inngest.createFunction({ id: "hello-world" }, { event: "test/hello.world" }, async ({ event, step }) => {
  await step.sleep("wait-a-moment", "20s");
  return { event, body: "Hello, World V2!" };
});

// TODO: Add functions to handle article generation (write pseudo code first based on steps and error handling)
