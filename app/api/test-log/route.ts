import { GetLogs } from "@/lib/actions/GetLogs.action";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GetLogs();

  return NextResponse.json(result);
}
