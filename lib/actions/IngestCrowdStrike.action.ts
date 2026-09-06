"use server";

import { actionError } from "../response";
import IngestCrowdStrikeSchema from "../schema/IngestCrowdStrikeSchema";
import validateBody from "../validateBody";
import { CreateLog } from "./CreateLog.action";

export async function IngestCrowdStrik(params: {
  tenant: string;
  source: string;
  event_type: string;
  host: string;
  process: string;
  severity: number;
  sha256: string;
  action: string;
  "@timestamp": string;
}) {
  try {
    const validatedData = validateBody(params, IngestCrowdStrikeSchema);
    const {
      tenant,
      source,
      event_type,
      host,
      process,
      severity,
      action,
      "@timestamp": timestamp,
    } = validatedData.data;

    const logData = {
      timestamp,
      tenant,
      source,
      eventType: event_type,
      host,
      process,
      severity,
      action,
      raw: params,
      tags: [source],
    };

    return await CreateLog(logData);
  } catch (e) {
    return actionError(e);
  }
}
