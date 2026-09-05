"use server";

import { actionError } from "../response";
import BatchIngestionSchema from "../schema/BatchIngestionSchema";
import validateBody from "../validateBody";
import { CreateLog } from "./CreateLog.action";

export async function BatchIngestion(param: {
  tenant: string;
  source: string;
  data: unknown[];
}): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const validatedData = validateBody(param, BatchIngestionSchema);
    const { tenant, source, data } = validatedData.data;

    for (const item of data) {
      const logData = item as Record<string, unknown>;

      await CreateLog({
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
        raw: item,
        tags: [source],
      });
    }

    return {
      success: true,
      message: `${data.length} logs created successfully`,
    };
  } catch (e) {
    return actionError(e);
  }
}
