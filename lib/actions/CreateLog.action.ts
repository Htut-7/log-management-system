"use server";

import Log, { ILog } from "@/database/models/log.model";
import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import LogSchema from "../schema/LogSchema";
import { actionError } from "../response";

export async function CreateLog(params: ILog): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();
  const validatedData = validateBody(params, LogSchema);
  try {
    await Log.create(validatedData.data);

    return {
      success: true,
      message: "Log created Successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
