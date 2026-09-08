import { NextResponse } from "next/server";
import { NormalizeLog } from "@/lib/normalizers/NormalizeLog";
import { CreateIngestedLog } from "@/lib/services/CreateIngestedLog";
import { DetectAlert } from "@/lib/actions/DetectAlert.action";

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");

    let tenant: string | null = null;

    if (apiKey === process.env.INGEST_API_KEY_TENANTA) {
      tenant = "tenantA";
    }

    if (apiKey === process.env.INGEST_API_KEY_TENANTB) {
      tenant = "tenantB";
    }

    if (!tenant) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const { source, data } = body;

    if (!source || !data || typeof data !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
        },
        { status: 400 },
      );
    }

    const normalizedLog = NormalizeLog(source, data as Record<string, unknown>);

    const result = await CreateIngestedLog(normalizedLog, tenant);

    if (result.success) {
      await DetectAlert();
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to ingest log",
      },
      { status: 500 },
    );
  }
}
