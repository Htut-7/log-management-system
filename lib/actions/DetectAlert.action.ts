"use server";

import dbConnect from "@/database/dbConnect";
import { actionError } from "../response";
import AlertRule from "@/database/models/alert-rules.model";
import Log from "@/database/models/log.model";
import { CreateAlert } from "./CreateAlert.action";

export async function DetectAlert(): Promise<{
  success: boolean;
  message?: string;
}> {
  await dbConnect();

  try {
    const rules = await AlertRule.find({
      isActive: true,
    });

    for (const rule of rules) {
      const now = new Date();

      const startTime = new Date(now.getTime() - rule.timeWindow * 60 * 1000);

      const logs = await Log.find({
        eventType: rule.event,
        timestamp: {
          $gte: startTime,
          $lte: now,
        },
      });

      const ipCounts = new Map<string, number>();

      for (const log of logs) {
        if (!log.srcIp) continue;

        ipCounts.set(log.srcIp, (ipCounts.get(log.srcIp) || 0) + 1);
      }
      for (const [srcIp, count] of ipCounts) {
        if (count >= rule.threshold) {
          await CreateAlert({
            rule: rule._id,
            severity: rule.severity,
            title: rule.name,
            message: `${count} ${rule.event} events detected from ${srcIp} within ${rule.timeWindow} minutes`,
            status: "OPEN",
          });
        }
      }
    }

    return {
      success: true,
      message: "Alert detection completed successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
