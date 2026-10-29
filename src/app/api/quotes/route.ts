import { handleCreateQuote } from "@/lib/http/create-quote";

export async function POST(request: Request) {
  return handleCreateQuote(request);
}
