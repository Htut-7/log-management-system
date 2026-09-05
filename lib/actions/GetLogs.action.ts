"use server";

import dbConnect from "@/database/dbConnect";
import Log from "@/database/models/log.model";
import { actionError } from "../response";

export async function GetLogs() {
  await dbConnect();

  try {
    const logs = await Log.find();

    return {
      success: true,
      data: logs,
    };
  } catch (e) {
    return actionError(e);
  }
}
