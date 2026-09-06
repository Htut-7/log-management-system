"use server";

import { actionError } from "../response";
import { CreateLog } from "./CreateLog.action";
import { parseSysLog } from "../utils/parseSysLog";
import validateBody from "../validateBody";
import IngestSysLogSchema from "../schema/IngestSysLogSchema";

export async function IngestSysLog(params: {
  tenant: string;
  source: string;
  message: string;
}) {
  try {
    const validatedData = validateBody(params, IngestSysLogSchema);
    const { tenant, source, message } = validatedData.data;

    const parsedData = parseSysLog(message);

    const logData = {
      timestamp: new Date(),
      tenant,
      source,
      vendor: parsedData.vendor,
      product: parsedData.product,
      eventType: "network",
      action: parsedData.action,
      srcIp: parsedData.src,
      srcPort: Number(parsedData.spt),
      dstIp: parsedData.dst,
      dstPort: Number(parsedData.dpt),
      protocol: parsedData.proto,
      raw: message,
      tags: [source],
    };

    const result = await CreateLog(logData);
    return result;
  } catch (e) {
    return actionError(e);
  }
}
