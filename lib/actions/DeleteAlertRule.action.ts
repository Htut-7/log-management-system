"use server";

import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import DeleteAlertRuleSchema from "../schema/DeleteAlertRuleSchema";
import { actionError } from "../response";
import AlertRule from "@/database/models/alert-rules.model";

export async function DeleteAlertRule(params: {
  alertRuleId: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();
  const validatedData = validateBody(params, DeleteAlertRuleSchema);
  const { alertRuleId } = validatedData.data;

  try {
    const deletedRule = await AlertRule.findByIdAndDelete(alertRuleId);

    if (!deletedRule) {
      throw new Error("Alert rule not found");
    }

    return {
      success: true,
      message: "Alert rule deleted successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
