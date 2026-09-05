import { BatchIngestion } from "@/lib/actions/BatchIngestion.action";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await BatchIngestion(body);

  return NextResponse.json(result);
}
