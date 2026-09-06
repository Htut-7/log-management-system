"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import AlertRule, { IAlertRule } from "@/database/models/alert-rules.model";

export async function DetectAlert(): Promise<{
  success: boolean;
  data?: IAlertRule[];
}> {
  await dbConnect();

  try {
    const rules = await AlertRule.find({
      isActive: true,
    });

    console.log(rules);

    return {
      success: true,
      data: rules,
    };
  } catch (e) {
    return actionError(e);
  }
}
