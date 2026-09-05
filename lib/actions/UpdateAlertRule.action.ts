"use server";

import dbConnect from "@/database/dbConnect";
import AlertRule, { IAlertRule } from "@/database/models/alert-rules.model";
import validateBody from "../validateBody";
import UpdateAlertRuleSchema from "../schema/UpdateAlertRuleSchema";
import { actionError } from "../response";

export async function UpdateAlertRule(params: {
  alertRuleId: string;
  name?: string;
  description?: string;
  event?: string;
  threshold?: number;
  timeWindow?: number;
  severity?: string;
  isActive?: boolean;
}): Promise<{
  success: boolean;
  data?: IAlertRule;
}> {
  await dbConnect();
  const validatedData = validateBody(params, UpdateAlertRuleSchema);
  const {
    alertRuleId,
    name,
    description,
    event,
    threshold,
    timeWindow,
    severity,
    isActive,
  } = validatedData.data;

  try {
    const newRule = await AlertRule.findByIdAndUpdate(
      alertRuleId,
      {
        name,
        description,
        event,
        threshold,
        timeWindow,
        severity,
        isActive,
      },
      { new: true },
    );

    if (!newRule) {
      throw new Error("Alert rule not found");
    }

    return {
      success: true,
      data: newRule,
    };
  } catch (e) {
    return actionError(e);
  }
}
