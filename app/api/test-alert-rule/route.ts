import { CreateAlertRule } from "@/lib/actions/CreateAlertRule.action";
import { GetAlertRules } from "@/lib/actions/GetAlert-Rules.action";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await CreateAlertRule({
    name: "test",
    description: "Testing",
    event: "LOGIN_FAILED",
    threshold: 5,
    timeWindow: 5,
    severity: "HIGH",
    isActive: true,
  });

  return NextResponse.json(result);
}

export async function GET() {
  const result = await GetAlertRules();

  return NextResponse.json(result);
}
