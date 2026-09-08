"use server";

import { NormalizeLog } from "../normalizers/NormalizeLog";
import { actionError } from "../response";
import BatchIngestionSchema from "../schema/BatchIngestionSchema";
import validateBody from "../validateBody";
import { CreateLog } from "./CreateLog.action";
import { DetectAlert } from "./DetectAlert.action";

export async function BatchIngestion(param: {
  source: string;
  data: unknown[];
}): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const validatedData = validateBody(param, BatchIngestionSchema);
    const { source, data } = validatedData.data;

    for (const item of data) {
      const logData = item as Record<string, unknown>;

      const normalizedLog = NormalizeLog(source, logData);

      await CreateLog(normalizedLog);
    }

    await DetectAlert();

    return {
      success: true,
      message: `${data.length} logs created successfully`,
    };
  } catch (e) {
    return actionError(e);
  }
}
