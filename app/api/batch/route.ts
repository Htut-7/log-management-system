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

    if (!source || !Array.isArray(data)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid batch data",
        },
        { status: 400 },
      );
    }

    for (const item of data) {
      const normalizedLog = NormalizeLog(
        source,
        item as Record<string, unknown>,
      );

      await CreateIngestedLog(normalizedLog, tenant);
    }

    await DetectAlert();

    return NextResponse.json({
      success: true,
      message: `${data.length} logs ingested successfully`,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Batch ingestion failed",
      },
      { status: 500 },
    );
  }
}
