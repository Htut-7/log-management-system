"use server";

import { NormalizeLog } from "../normalizers/NormalizeLog";
import { actionError } from "../response";
import LogIngestSchema from "../schema/LogIngestSchema";
import validateBody from "../validateBody";
import { CreateLog } from "./CreateLog.action";
import { DetectAlert } from "./DetectAlert.action";

export async function IngestLog(params: { source: string; data: unknown }) {
  try {
    const validatedData = validateBody(params, LogIngestSchema);
    const { source, data } = validatedData.data;

    const logData = data as Record<string, unknown>;

    const normalizedLog = NormalizeLog(source, logData);

    const result = await CreateLog(normalizedLog);

    if (result.success) {
      await DetectAlert();
    }

    return result;
  } catch (e) {
    return actionError(e);
  }
}
