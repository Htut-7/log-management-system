import { CreateUser } from "@/lib/actions/CreateUser.action";
import { GetUsers } from "@/lib/actions/GetUsers.action";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = await CreateUser(body);

  return NextResponse.json(result);
}

export async function GET() {
  const result = await GetUsers();

  return NextResponse.json(result);
}
