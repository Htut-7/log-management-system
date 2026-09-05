"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import Alert from "@/database/models/alert.model";

export async function GetAlerts() {
  await dbConnect();

  try {
    const alert = await Alert.find();

    return {
      success: true,
      data: alert,
    };
  } catch (e) {
    return actionError(e);
  }
}
