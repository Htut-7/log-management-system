"use server";

import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import AlertRuleSchema from "../schema/AlertRuleSchema";
import { actionError } from "../response";
import AlertRule from "@/database/models/alert-rules.model";

export async function CreateAlertRule(params: {
  name: string;
  description?: string;
  event: string;
  threshold: number;
  timeWindow: number;
  severity: string;
  isActive: boolean;
}) {
  await dbConnect();
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
    });

    return {
      success: true,
      message: "AlertRule create successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
