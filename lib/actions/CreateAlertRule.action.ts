"use server";

import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import AlertRuleSchema from "../schema/AlertRuleSchema";
import { actionError } from "../response";
import AlertRule from "@/database/models/alert-rules.model";
import { auth } from "@/auth";

export async function CreateAlertRule(params: {
  name: string;
  description?: string;
  event: string;
  threshold: number;
  timeWindow: number;
  severity: string;
  isActive: boolean;
}): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (session?.user?.role !== "ADMIN") {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const validatedData = validateBody(params, AlertRuleSchema);
  const {
    name,
    description,
    event,
    threshold,
    timeWindow,
    severity,
    isActive,
  } = validatedData.data;

  try {
    await AlertRule.create({
      name,
      description,
      event,
      threshold,
      timeWindow,
      severity,
      isActive,
      tenant: session?.user.tenant,
    });

    return {
      success: true,
      message: "AlertRule create successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
