import { CreateAlertRule } from "@/lib/actions/CreateAlertRule.action";
import { GetAlertRules } from "@/lib/actions/GetAlert-Rules.action";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await CreateAlertRule(body);

  return NextResponse.json(result);
}

export async function GET() {
  const result = await GetAlertRules();

  return NextResponse.json(result);
}
