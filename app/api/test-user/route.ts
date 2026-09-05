import { CreateUser } from "@/lib/actions/CreateUser.action";
import { GetUsers } from "@/lib/actions/GetUsers.action";
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

export async function GET() {
  const result = await GetUsers();

  return NextResponse.json(result);
}
