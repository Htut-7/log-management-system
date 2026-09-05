import { DeleteAlertRule } from "@/lib/actions/DeleteAlertRule.action";
import { UpdateAlertRule } from "@/lib/actions/UpdateAlertRule.action";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  const result = await UpdateAlertRule({
    alertRuleId: id,
    ...body,
  });

  return NextResponse.json(result);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const result = await DeleteAlertRule({
    alertRuleId: id,
  });

  return NextResponse.json(result);
}
