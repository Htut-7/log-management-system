"use server";

import { actionError } from "../response";
import { CreateLog } from "./CreateLog.action";
import { parseSysLog } from "../utils/parseSysLog";
import validateBody from "../validateBody";
import IngestSysLogSchema from "../schema/IngestSysLogSchema";
import { NormalizeLog } from "../normalizers/NormalizeLog";
import { DetectAlert } from "./DetectAlert.action";

export async function IngestSysLog(params: {
  source: string;
  message: string;
}) {
  try {
    const validatedData = validateBody(params, IngestSysLogSchema);
    const { source, message } = validatedData.data;

    const parsedData = parseSysLog(message);

    const normalizedLog = NormalizeLog(source, parsedData);

    const result = await CreateLog({
      ...normalizedLog,
      raw: message,
    });

    if (result.success) {
      await DetectAlert();
    }

    return result;
  } catch (e) {
    return actionError(e);
  }
}
