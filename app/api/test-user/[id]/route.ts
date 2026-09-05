import { GetUserById } from "@/lib/actions/GetUsers.action";
import { NextResponse } from "next/server";
import { UpdateUser } from "@/lib/actions/UpdateUser.action";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const result = await GetUserById({
    userId: id,
  });

  return NextResponse.json(result);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const result = await UpdateUser({
    userId: id,
    ...body,
  });

  return NextResponse.json(result);
}
