import { IngestLog } from "@/lib/actions/IngestLog.action";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await IngestLog(body);

  return NextResponse.json(result);
}
