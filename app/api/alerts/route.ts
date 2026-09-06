import { GetAlerts } from "@/lib/actions/GetAlerts.action";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GetAlerts();

  return NextResponse.json(result);
}
