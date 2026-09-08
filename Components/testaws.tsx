"use client";

import { IngestLog } from "@/lib/actions/IngestLog.action";

export default function TestAwsIngestionButton() {
  const handleTest = async () => {
    const result = await IngestLog({
      source: "ad",
      data: {
        event_id: 4625,
        event_type: "LogonFailed",
        user: "demo\\eve",
        host: "DC01",
        ip: "203.0.113.77",
        logon_type: 3,
        "@timestamp": new Date().toISOString(),
      },
    });

    console.log(result);
  };

  return <button onClick={handleTest}>Test AWS Ingestion</button>;
}
