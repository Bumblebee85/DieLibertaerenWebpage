import {
  handleGenerateDailyRequest,
} from "@/lib/generate/route-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: Request) {
  return handleGenerateDailyRequest(request);
}

export async function POST(request: Request) {
  return handleGenerateDailyRequest(request);
}