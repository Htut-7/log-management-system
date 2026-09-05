"use server";

import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import DeleteAlertSchema from "../schema/DeleteAlertSchema";
import { actionError } from "../response";
import Alert from "@/database/models/alert.model";

export async function DeleteAlert(params: { alertId: string }): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();
  const validatedData = validateBody(params, DeleteAlertSchema);
  const { alertId } = validatedData.data;

  try {
    const deletedAlert = await Alert.findByIdAndDelete(alertId);

    if (!deletedAlert) {
      throw new Error("Alert not found");
    }

    return {
      success: true,
      message: "Alert deleted successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
