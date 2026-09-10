import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  dbConnectMock,
  alertRuleFindMock,
  logFindMock,
  alertFindOneMock,
  createAlertMock,
} = vi.hoisted(() => ({
  dbConnectMock: vi.fn(),
  alertRuleFindMock: vi.fn(),
  logFindMock: vi.fn(),
  alertFindOneMock: vi.fn(),
  createAlertMock: vi.fn(),
}));

vi.mock("@/database/dbConnect", () => ({
  default: dbConnectMock,
}));

vi.mock("@/database/models/alert-rules.model", () => ({
  default: {
    find: alertRuleFindMock,
  },
}));

vi.mock("@/database/models/log.model", () => ({
  default: {
    find: logFindMock,
  },
}));

vi.mock("@/database/models/alert.model", () => ({
  default: {
    findOne: alertFindOneMock,
  },
}));

vi.mock("./CreateAlert.action", () => ({
  CreateAlert: createAlertMock,
}));

import { DetectAlert } from "./DetectAlert.action";

describe("DetectAlert", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    dbConnectMock.mockResolvedValue(undefined);
    alertFindOneMock.mockResolvedValue(null);
    createAlertMock.mockResolvedValue({
      success: true,
    });
  });

  it("does not create an alert when the threshold is not reached", async () => {
    alertRuleFindMock.mockResolvedValue([
      {
        _id: "rule-1",
        name: "Repeated Failed Login",
        event: "LOGIN_FAILED",
        threshold: 5,
        timeWindow: 5,
        severity: "HIGH",
        tenant: "tenantA",
        isActive: true,
      },
    ]);

    logFindMock.mockResolvedValue([
      { srcIp: "203.0.113.10" },
      { srcIp: "203.0.113.10" },
      { srcIp: "203.0.113.10" },
      { srcIp: "203.0.113.10" },
    ]);

    const result = await DetectAlert();

    expect(result.success).toBe(true);
    expect(createAlertMock).not.toHaveBeenCalled();
    expect(alertFindOneMock).not.toHaveBeenCalled();
  });

  it("creates an alert when the threshold is reached", async () => {
    alertRuleFindMock.mockResolvedValue([
      {
        _id: "rule-1",
        name: "Repeated Failed Login",
        event: "LOGIN_FAILED",
        threshold: 5,
        timeWindow: 5,
        severity: "HIGH",
        tenant: "tenantA",
        isActive: true,
      },
    ]);

    logFindMock.mockResolvedValue([
      { srcIp: "203.0.113.20" },
      { srcIp: "203.0.113.20" },
      { srcIp: "203.0.113.20" },
      { srcIp: "203.0.113.20" },
      { srcIp: "203.0.113.20" },
    ]);

    alertFindOneMock.mockResolvedValue(null);

    const result = await DetectAlert();

    expect(result.success).toBe(true);

    expect(createAlertMock).toHaveBeenCalledTimes(1);

    expect(createAlertMock).toHaveBeenCalledWith({
      rule: "rule-1",
      severity: "HIGH",
      title: "Repeated Failed Login",
      message:
        "5 LOGIN_FAILED events detected from 203.0.113.20 within 5 minutes",
      status: "OPEN",
      tenant: "tenantA",
      sourceIp: "203.0.113.20",
    });
  });

  it("does not create a duplicate open alert", async () => {
    alertRuleFindMock.mockResolvedValue([
      {
        _id: "rule-1",
        name: "Repeated Failed Login",
        event: "LOGIN_FAILED",
        threshold: 5,
        timeWindow: 5,
        severity: "HIGH",
        tenant: "tenantA",
        isActive: true,
      },
    ]);

    logFindMock.mockResolvedValue([
      { srcIp: "203.0.113.30" },
      { srcIp: "203.0.113.30" },
      { srcIp: "203.0.113.30" },
      { srcIp: "203.0.113.30" },
      { srcIp: "203.0.113.30" },
    ]);

    alertFindOneMock.mockResolvedValue({
      _id: "existing-alert",
      status: "OPEN",
    });

    const result = await DetectAlert();

    expect(result.success).toBe(true);

    expect(alertFindOneMock).toHaveBeenCalledWith({
      rule: "rule-1",
      tenant: "tenantA",
      sourceIp: "203.0.113.30",
      status: "OPEN",
    });

    expect(createAlertMock).not.toHaveBeenCalled();
  });
});