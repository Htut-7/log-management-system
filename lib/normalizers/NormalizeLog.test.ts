import { describe, expect, it } from "vitest";
import { NormalizeLog } from "./NormalizeLog";

describe("NormalizeLog", () => {
  it("normalizes API failed login logs", () => {
    const data = {
      "@timestamp": "2026-09-10T10:00:00Z",
      event_type: "app_login_failed",
      user: "testuser",
      ip: "203.0.113.10",
    };

    const result = NormalizeLog("api", data);

    expect(result).toMatchObject({
      source: "api",
      eventType: "LOGIN_FAILED",
      user: "testuser",
      srcIp: "203.0.113.10",
      tags: ["api"],
    });

    expect(result.timestamp).toEqual(
      new Date("2026-09-10T10:00:00Z"),
    );
  });

  it("normalizes Active Directory failed login logs", () => {
    const data = {
      "@timestamp": "2026-09-10T10:00:00Z",
      event_id: 4625,
      user: "john",
      host: "workstation-01",
      ip: "10.0.0.25",
    };

    const result = NormalizeLog("ad", data);

    expect(result).toMatchObject({
      source: "ad",
      eventType: "LOGIN_FAILED",
      user: "john",
      host: "workstation-01",
      srcIp: "10.0.0.25",
      tags: ["ad"],
    });
  });

  it("normalizes firewall logs", () => {
    const data = {
      "@timestamp": "2026-09-10T10:00:00Z",
      vendor: "Demo Firewall",
      product: "Firewall",
      action: "deny",
      src: "10.0.0.50",
      spt: 5353,
      dst: "8.8.8.8",
      dpt: 53,
      proto: "udp",
    };

    const result = NormalizeLog("firewall", data);

    expect(result).toMatchObject({
      source: "firewall",
      eventType: "NETWORK_EVENT",
      action: "deny",
      srcIp: "10.0.0.50",
      srcPort: 5353,
      dstIp: "8.8.8.8",
      dstPort: 53,
      protocol: "udp",
      tags: ["firewall"],
    });
  });

  it("normalizes AWS logs", () => {
    const data = {
      "@timestamp": "2026-09-10T10:00:00Z",
      event_type: "CONSOLE_LOGIN",
      user: "aws-user",
    };

    const result = NormalizeLog("aws", data);

    expect(result).toMatchObject({
      source: "aws",
      eventType: "CONSOLE_LOGIN",
      user: "aws-user",
      tags: ["aws"],
    });
  });
});