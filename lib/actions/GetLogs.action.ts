"use server";

import dbConnect from "@/database/dbConnect";
import Log, { ILog } from "@/database/models/log.model";
import { actionError } from "../response";
import { auth } from "@/auth";

type LeanLog = ILog & {
  _id: unknown;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

type SerializedLog = Omit<ILog, "timestamp"> & {
  _id: string;
  timestamp: string;
  createdAt?: string;
  updatedAt?: string;
};

export async function GetLogs(params?: {
  source?: string;
  eventType?: string;
  user?: string;
  srcIp?: string;
  severity?: number;
  from?: Date;
  to?: Date;
}): Promise<{
  success: boolean;
  data?: SerializedLog[];
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      data: [],
    };
  }

  try {
    const query: Record<string, unknown> = {
      tenant: session.user.tenant,
    };

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

    const logs = (await Log.find(query)
      .sort({
        timestamp: -1,
      })
      .lean()) as LeanLog[];

    const serializedLogs: SerializedLog[] = logs.map((log) => ({
      ...log,

      _id: String(log._id),

      timestamp:
        log.timestamp instanceof Date
          ? log.timestamp.toISOString()
          : new Date(log.timestamp).toISOString(),

      createdAt: log.createdAt
        ? new Date(log.createdAt).toISOString()
        : undefined,

      updatedAt: log.updatedAt
        ? new Date(log.updatedAt).toISOString()
        : undefined,
    }));

    return {
      success: true,
      data: serializedLogs,
    };
  } catch (e) {
    return actionError(e);
  }
}
