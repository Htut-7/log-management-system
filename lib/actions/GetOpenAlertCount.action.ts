"use server";

import dbConnect from "@/database/dbConnect";
import { auth } from "@/auth";
import { actionError } from "../response";
import Alert from "@/database/models/alert.model";

export async function GetOpenAlertCount(): Promise<{
  success: boolean;
  count: number;
  message?: string;
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      count: 0,
      message: "Unauthorized",
    };
  }

  try {
    const count = await Alert.countDocuments({
      tenant: session.user.tenant,
      status: "OPEN",
    });

    return {
      success: true,
      count,
    };
  } catch (e) {
    const error = actionError(e);

    return {
      success: false,
      count: 0,
      message: error.message,
    };
  }
}
