"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import Alert, { IAlert } from "@/database/models/alert.model";
import { auth } from "@/auth";

export async function GetAlerts(): Promise<{
  success: boolean;
  data?: IAlert[];
  message?: string;
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const alert = await Alert.find({
      tenant: session.user.tenant,
    });

    return {
      success: true,
      data: alert,
    };
  } catch (e) {
    return actionError(e);
  }
}
