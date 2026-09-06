import { DetectAlert } from "@/lib/actions/DetectAlert.action";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await DetectAlert();

  return NextResponse.json(result);
}
