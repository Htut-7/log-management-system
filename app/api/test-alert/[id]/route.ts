import { DeleteAlert } from "@/lib/actions/DeleteAlert.action";
import { UpdateAlert } from "@/lib/actions/UpdateAlert.action";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await request.json();
  const result = await UpdateAlert({
    alertId: id,
    ...body,
  });

  return NextResponse.json(result);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const result = await DeleteAlert({
    alertId: id,
  });

  return NextResponse.json(result);
}
