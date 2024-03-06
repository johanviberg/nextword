import { NextResponse } from "next/server";

// TODO: Define a zod schema for the response (extract to separate file)
// No sensitive data should be returned to the client e.g. actual ID

export async function GET() {
  // TODO: Query the article status based on UUID and return a limited set of data to the client (security, perf)
  // Use Prisma feature to select only the fields we need based on a zod schema or return 404 if no article is found

  const statuses = ["PENDING", "COMPLETE", "ERROR"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return NextResponse.json({ status: randomStatus });
}
