"use server";

import Log from "@/database/models/log.model";
import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import { Types } from "mongoose";
import LogSchema from "../schema/LogSchema";
import { actionError } from "../response";

export async function CreateLog(params: {
  user: Types.ObjectId;
  status: string;
  message: string;
  action: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();
  const validatedData = validateBody(params, LogSchema);
  const { user, status, action, message } = validatedData.data;
  try {
    await Log.create({
      user,
      status,
      action,
      message,
    });

    return {
      success: true,
      message: "Log created Successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
