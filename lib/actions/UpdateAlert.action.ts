"use server";

import dbConnect from "@/database/dbConnect";
import { Types } from "mongoose";
import validateBody from "../validateBody";
import UpdateAlertSchema from "../schema/UpdateAlertSchema";
import { actionError } from "../response";
import Alert, { IAlert } from "@/database/models/alert.model";

export async function UpdateAlert(params: {
  alertId: string;
  user?: Types.ObjectId;
  rule?: Types.ObjectId;
  severity?: string;
  title?: string;
  message?: string;
  status?: string;
  log?: Types.ObjectId;
}): Promise<{
  success: boolean;
  data?: IAlert;
}> {
  await dbConnect();
  const validatedData = validateBody(params, UpdateAlertSchema);
  const { alertId, user, rule, severity, title, message, status, log } =
    validatedData.data;

  try {
    const newAlert = await Alert.findByIdAndUpdate(
      alertId,
      {
        user,
        rule,
        severity,
        title,
        message,
        status,
        log,
      },
      { new: true },
    );

    if (!newAlert) {
      throw new Error("Alert not found");
    }

    return {
      success: true,
      data: newAlert,
    };
  } catch (e) {
    return actionError(e);
  }
}
