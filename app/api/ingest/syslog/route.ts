import { DetectAlert } from "@/lib/actions/DetectAlert.action";
import { NormalizeLog } from "@/lib/normalizers/NormalizeLog";
import { actionError } from "@/lib/response";
import { CreateIngestedLog } from "@/lib/services/CreateIngestedLog";
import { parseSysLog } from "@/lib/utils/parseSysLog";
import { NextResponse } from "next/server";

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

    const { source, message } = body;

    if (!source || typeof message !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Syslog Message",
        },
        { status: 400 },
      );
    }

    const parsedData = parseSysLog(message);

    const normalizedLog = NormalizeLog(source, parsedData);

    const result = await CreateIngestedLog(
      {
        ...normalizedLog,
        raw: message,
      },
      tenant,
    );

    if (result.success) {
      await DetectAlert();
    }

    return NextResponse.json(result);
  } catch (e) {
    const error = actionError(e);
    return NextResponse.json(
      {
        error,
      },
      { status: 500 },
    );
  }
}
