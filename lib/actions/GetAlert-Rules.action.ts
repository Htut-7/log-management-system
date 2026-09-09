"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import AlertRule from "@/database/models/alert-rules.model";
import { auth } from "@/auth";

type AlertRuleData = {
  _id: string;
  name: string;
  description?: string;
  event: string;
  threshold: number;
  timeWindow: number;
  severity: string;
  isActive: boolean;
  tenant: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function GetAlertRules(): Promise<{
  success: boolean;
  data?: AlertRuleData[];
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  try {
    const rules = await AlertRule.find({
      tenant: session.user.tenant,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    const serializedRules: AlertRuleData[] = rules.map((rule) => ({
      _id: String(rule._id),
      name: rule.name,
      description: rule.description,
      event: rule.event,
      threshold: rule.threshold,
      timeWindow: rule.timeWindow,
      severity: rule.severity,
      isActive: rule.isActive,
      tenant: rule.tenant,
      createdAt: rule.createdAt
        ? new Date(rule.createdAt).toISOString()
        : undefined,
      updatedAt: rule.updatedAt
        ? new Date(rule.updatedAt).toISOString()
        : undefined,
    }));

    return {
      success: true,
      data: serializedRules,
    };
  } catch (e) {
    return actionError(e);
  }
}
