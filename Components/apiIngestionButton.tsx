"use client";

import { IngestLog } from "@/lib/actions/IngestLog.action";

export default function TestApiIngestionButton() {
  const handleTest = async () => {
    const result = await IngestLog({
      source: "api",
      data: {
        event_type: "app_login_failed",
        user: "alice",
        ip: "203.0.113.7",
        reason: "wrong_password",
        "@timestamp": new Date().toISOString(),
      },
    });

    console.log(result);
  };

  return (
    <button
      onClick={handleTest}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      Test API Ingestion
    </button>
  );
}
