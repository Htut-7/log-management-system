"use server";

import Log, { ILog } from "@/database/models/log.model";
import dbConnect from "@/database/dbConnect";
import validateBody from "../validateBody";
import LogSchema from "../schema/LogSchema";
import { actionError } from "../response";
import { auth } from "@/auth";

export async function CreateLog(params: ILog): Promise<{
  success: boolean;
  message: string;
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  if (session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Forbidden",
    };
  }

  const validatedData = validateBody(params, LogSchema);
  try {
    await Log.create({
      ...validatedData.data,
      tenant: session.user.tenant,
    });

    return {
      success: true,
      message: "Log created Successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
