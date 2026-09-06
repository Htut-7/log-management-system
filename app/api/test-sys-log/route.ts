import { parseSysLog } from "@/lib/utils/parseSysLog";
import { NextResponse } from "next/server";

export async function GET() {
  const message =
    "<134>Aug 20 12:44:56 fw01 vendor=demo product=ngfw action=deny src=10.0.1.10 dst=8.8.8.8 spt=5353 dpt=53 proto=udp";

  const result = parseSysLog(message);

  return NextResponse.json(result);
}
