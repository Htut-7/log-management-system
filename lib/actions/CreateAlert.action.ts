"use server";

import dbConnect from "@/database/dbConnect";
import { Types } from "mongoose";
import validateBody from "../validateBody";
import AlertSchema from "../schema/AlertSchema";
import { actionError } from "../response";
import Alert from "@/database/models/alert.model";

export async function CreateAlert(params: {
  user?: Types.ObjectId;
  rule: Types.ObjectId;
  severity: string;
  title: string;
  message: string;
  status: string;
  log?: Types.ObjectId;
}): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();
  const validatedData = validateBody(params, AlertSchema);
  const { user, rule, severity, title, message, status, log } =
    validatedData.data;

  try {
    await Alert.create({
      user,
      rule,
      severity,
      title,
      message,
      status,
      log,
    });

    return {
      success: true,
      message: "Alert created successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
