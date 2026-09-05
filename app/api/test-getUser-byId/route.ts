import { GetUserById } from "@/lib/actions/GetUsers.action";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GetUserById({
    userId: "6a997f1eafb8fc3fdaea5450",
  });

  return NextResponse.json(result);
}
