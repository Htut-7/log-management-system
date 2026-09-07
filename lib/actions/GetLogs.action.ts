"use server";

import dbConnect from "@/database/dbConnect";
import Log, { ILog } from "@/database/models/log.model";
import { actionError } from "../response";
import { auth } from "@/auth";

export async function GetLogs(params?: {
  tenant?: string;
  source?: string;
  eventType?: string;
  user?: string;
  srcIp?: string;
  severity?: number;
  from?: Date;
  to?: Date;
}): Promise<{
  success: boolean;
  data?: ILog[];
}> {
  await dbConnect();

  const session = await auth();

  if (!session) {
    return {
      success: false,
      data: [],
    };
  }

  try {
    const query: Record<string, unknown> = {};

    query.tenant = session?.user.tenant;

    if (params?.source) {
      query.source = params.source;
    }

    if (params?.eventType) {
      query.eventType = params.eventType;
    }

    if (params?.user) {
      query.user = params.user;
    }

    if (params?.srcIp) {
      query.srcIp = params.srcIp;
    }

    if (params?.severity !== undefined) {
      query.severity = params.severity;
    }

    if (params?.from || params?.to) {
      query.timestamp = {};
    }

    if (params?.from) {
      (query.timestamp as Record<string, Date>).$gte = params.from;
    }

    if (params?.to) {
      (query.timestamp as Record<string, Date>).$lte = params.to;
    }

    const logs = await Log.find(query);

    return {
      success: true,
      data: logs,
    };
  } catch (e) {
    return actionError(e);
  }
}
