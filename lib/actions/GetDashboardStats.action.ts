"use server";

import { auth } from "@/auth";
import dbConnect from "@/database/dbConnect";
import Log from "@/database/models/log.model";
import validateBody from "../validateBody";
import DashboardStatsSchema from "../schema/DashboardStatsSchema";
import { actionError } from "../response";

export async function GetDashboardStats(params?: {
  from?: Date;
  to?: Date;
}): Promise<{
  success: boolean;
  data?: {
    totalLogs: number;
    topIps: {
      name: string;
      count: number;
    }[];
    topUsers: {
      name: string;
      count: number;
    }[];
    topEventTypes: {
      name: string;
      count: number;
    }[];
    timeline: {
      time: string;
      count: number;
    }[];
  };
  message?: string;
}> {
  await dbConnect();

  const session = await auth();

  if (!session?.user?.tenant) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const validatedData = validateBody(params || {}, DashboardStatsSchema);

  const { from, to } = validatedData.data;

  const filterQuery: Record<string, unknown> = {
    tenant: session.user.tenant,
  };

  if (from || to) {
    filterQuery.timestamp = {};
  }

  if (from) {
    (filterQuery.timestamp as Record<string, Date>).$gte = from;
  }

  if (to) {
    (filterQuery.timestamp as Record<string, Date>).$lte = to;
  }

  try {
    const totalLogs = await Log.countDocuments(filterQuery);

    const topIps = await Log.aggregate([
      {
        $match: {
          ...filterQuery,
          srcIp: {
            $nin: [null, ""],
          },
        },
      },
      {
        $group: {
          _id: "$srcIp",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const topUsers = await Log.aggregate([
      {
        $match: {
          ...filterQuery,
          user: {
            $nin: [null, ""],
          },
        },
      },
      {
        $group: {
          _id: "$user",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const topEventTypes = await Log.aggregate([
      {
        $match: {
          ...filterQuery,
          eventType: {
            $nin: [null, ""],
          },
        },
      },
      {
        $group: {
          _id: "$eventType",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const timeline = await Log.aggregate([
      {
        $match: filterQuery,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d %H:00",
              date: "$timestamp",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return {
      success: true,

      data: {
        totalLogs,

        topIps: topIps.map((item) => ({
          name: item._id,
          count: item.count,
        })),

        topUsers: topUsers.map((item) => ({
          name: item._id,
          count: item.count,
        })),

        topEventTypes: topEventTypes.map((item) => ({
          name: item._id,
          count: item.count,
        })),

        timeline: timeline.map((item) => ({
          time: item._id,
          count: item.count,
        })),
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
