"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import Alert from "@/database/models/alert.model";
import { auth } from "@/auth";

export async function GetAlerts(): Promise<{
  success: boolean;
  data?: {
    _id: string;
    rule: string;
    severity: string;
    title: string;
    message: string;
    status: string;
    tenant: string;
    sourceIp?: string;
    createdAt?: string;
    updatedAt?: string;
  }[];
  message?: string;
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const alerts = await Alert.find({
      tenant: session.user.tenant,
    }).lean();

    const serializedAlerts = alerts.map((alert) => ({
      _id: String(alert._id),
      rule: String(alert.rule),
      severity: alert.severity,
      title: alert.title,
      message: alert.message,
      status: alert.status,
      tenant: alert.tenant,
      sourceIp: alert.sourceIp,
      createdAt: alert.createdAt?.toISOString(),
      updatedAt: alert.updatedAt?.toISOString(),
    }));

    return {
      success: true,
      data: serializedAlerts,
    };
  } catch (e) {
    return actionError(e);
  }
}
