import { CreateAlert } from "@/lib/actions/CreateAlert.action";
import { GetAlerts } from "@/lib/actions/GetAlerts.action";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await CreateAlert({
    user: new Types.ObjectId("6a997f1eafb8fc3fdaea5450"),
    rule: new Types.ObjectId("6a998473afb8fc3fdaea5453"),
    severity: "HIGH",
    title: "Multiple Failed Logins",
    message: "A user has failed to log in multiple times.",
    status: "ACTIVE",
  });

  return NextResponse.json(result);
}

export async function GET() {
  const result = await GetAlerts();

  return NextResponse.json(result);
}
