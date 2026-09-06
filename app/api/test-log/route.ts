import { GetLogs } from "@/lib/actions/GetLogs.action";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const result = await GetLogs({
    tenant: searchParams.get("tenant") || undefined,
    source: searchParams.get("source") || undefined,
    eventType: searchParams.get("eventType") || undefined,
    user: searchParams.get("user") || undefined,
    srcIp: searchParams.get("srcIp") || undefined,
    severity: searchParams.get("severity")
      ? Number(searchParams.get("severity"))
      : undefined,
  });

  return NextResponse.json(result);
}
