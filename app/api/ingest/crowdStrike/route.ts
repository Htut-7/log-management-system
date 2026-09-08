import { IngestCrowdStrike } from "@/lib/actions/IngestCrowdStrike.action";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await IngestCrowdStrike(body);

  return NextResponse.json(result);
}
