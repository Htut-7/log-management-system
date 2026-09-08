import { ILog } from "@/database/models/log.model";

export function NormalizeLog(
  source: string,
  data: Record<string, unknown>,
): Omit<ILog, "tenant"> {
  switch (source.toLowerCase()) {
    case "firewall":
      return {
        timestamp: data["@timestamp"]
          ? new Date(data["@timestamp"] as string)
          : new Date(),
        source: "firewall",
        vendor: data.vendor as string | undefined,
        product: data.product as string | undefined,
        eventType: "NETWORK_EVENT",
        action: data.action as string | undefined,
        srcIp: data.src as string | undefined,
        srcPort: data.spt as number | undefined,
        dstIp: data.dst as string | undefined,
        dstPort: data.dpt as number | undefined,
        protocol: data.proto as string | undefined,
        raw: data,
        tags: ["firewall"],
      };

    case "api":
      return {
        timestamp: data["@timestamp"]
          ? new Date(data["@timestamp"] as string)
          : new Date(),
        source: "api",
        eventType:
          data.event_type === "app_login_failed"
            ? "LOGIN_FAILED"
            : (data.event_type as string),
        user: data.user as string | undefined,
        srcIp: data.ip as string | undefined,
        raw: data,
        tags: ["api"],
      };

    case "aws":
      return {
        timestamp: data["@timestamp"]
          ? new Date(data["@timestamp"] as string)
          : new Date(),
        source: "aws",
        eventType: data.event_type as string,
        user: data.user as string | undefined,
        raw: data,
        tags: ["aws"],
      };

    case "ad":
      return {
        timestamp: data["@timestamp"]
          ? new Date(data["@timestamp"] as string)
          : new Date(),
        source: "ad",
        eventType:
          data.event_id === 4625
            ? "LOGIN_FAILED"
            : data.event_id === 4624
              ? "LOGIN_SUCCESS"
              : (data.event_type as string),
        user: data.user as string | undefined,
        host: data.host as string | undefined,
        srcIp: data.ip as string | undefined,
        raw: data,
        tags: ["ad"],
      };

    default:
      return {
        timestamp: data["@timestamp"]
          ? new Date(data["@timestamp"] as string)
          : new Date(),
        source,
        eventType: (data.event_type as string) || "UNKNOWN",
        raw: data,
        tags: [source],
      };
  }
}
