"use server";

import { actionError } from "../response";
import LogIngestSchema from "../schema/LogIngestSchema";
import validateBody from "../validateBody";
import { CreateLog } from "./CreateLog.action";

export async function IngestLog(params: {
  tenant: string;
  source: string;
  data: unknown;
}) {
  try {
    const validatedData = validateBody(params, LogIngestSchema);
    const { tenant, source, data } = validatedData.data;

    const logData = data as Record<string, unknown>;

    const result = await CreateLog({
      timestamp: new Date(),
      tenant,
      source,
      eventType: "network",
      action: logData.action as string | undefined,
      srcIp: logData.src as string | undefined,
      srcPort: logData.spt as number | undefined,
      dstIp: logData.dst as string | undefined,
      dstPort: logData.dpt as number | undefined,
      protocol: logData.proto as string | undefined,
      raw: data,
      tags: [source],
    });

    return result;
  } catch (e) {
    return actionError(e);
  }
}
