import {
  handleGenerateWeeklyRequest,
} from "@/lib/generate/route-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: Request) {
  return handleGenerateWeeklyRequest(request);
}

export async function POST(request: Request) {
  return handleGenerateWeeklyRequest(request);
}