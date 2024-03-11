import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions";

export const maxDuration = 60 * 5; // 5 minutes

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld],
});
