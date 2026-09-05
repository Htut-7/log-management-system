"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import Alert, { IAlert } from "@/database/models/alert.model";

export async function GetAlerts(): Promise<{
  success: boolean;
  data?: IAlert[];
}> {
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
