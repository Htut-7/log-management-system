import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, dbConnectMock, findMock, sortMock, leanMock } = vi.hoisted(
  () => ({
    authMock: vi.fn(),
    dbConnectMock: vi.fn(),
    findMock: vi.fn(),
    sortMock: vi.fn(),
    leanMock: vi.fn(),
  }),
);

vi.mock("@/auth", () => ({
  auth: authMock,
}));

vi.mock("@/database/dbConnect", () => ({
  default: dbConnectMock,
}));

vi.mock("@/database/models/log.model", () => ({
  default: {
    find: findMock,
  },
}));

import { GetLogs } from "./GetLogs.action";

describe("GetLogs tenant isolation", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    dbConnectMock.mockResolvedValue(undefined);
    leanMock.mockResolvedValue([]);
    sortMock.mockReturnValue({
      lean: leanMock,
    });
    findMock.mockReturnValue({
      sort: sortMock,
    });
  });

  it("uses the authenticated tenant in the MongoDB query", async () => {
    authMock.mockResolvedValue({
      user: {
        tenant: "tenantA",
      },
    });

    await GetLogs({
      source: "api",
      eventType: "LOGIN_FAILED",
    });

    expect(findMock).toHaveBeenCalledWith({
      tenant: "tenantA",
      source: "api",
      eventType: "LOGIN_FAILED",
    });
  });

  it("uses tenantB when the authenticated user belongs to tenantB", async () => {
    authMock.mockResolvedValue({
      user: {
        tenant: "tenantB",
      },
    });

    await GetLogs({
      srcIp: "203.0.113.50",
    });

    expect(findMock).toHaveBeenCalledWith({
      tenant: "tenantB",
      srcIp: "203.0.113.50",
    });
  });

  it("does not query logs when the user has no tenant", async () => {
    authMock.mockResolvedValue({
      user: {},
    });

    const result = await GetLogs();

    expect(result).toEqual({
      success: false,
      data: [],
    });

    expect(findMock).not.toHaveBeenCalled();
  });
});