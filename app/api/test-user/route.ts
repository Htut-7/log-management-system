import { CreateUser } from "@/lib/actions/CreateUser.action";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await CreateUser({
    username: "testuser",
    email: "test@gmail.com",
    password: "1234sithUt@",
    role: "User",
    isActive: true,
  });

  return NextResponse.json(result);
}
