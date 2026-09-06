import { IngestSysLog } from "@/lib/actions/IngestSysLog.action";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await IngestSysLog(body);

  return NextResponse.json(result);
}
