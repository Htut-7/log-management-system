"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import AlertRule from "@/database/models/alert-rules.model";

export async function GetAlertRules() {
  await dbConnect();

  try {
    const rules = await AlertRule.find();

    return {
      success: true,
      data: rules,
    };
  } catch (e) {
    return actionError(e);
  }
}
