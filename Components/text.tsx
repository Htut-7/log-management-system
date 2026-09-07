"use client";

import { CreateLog } from "@/lib/actions/CreateLog.action";

export default function TestLogButton() {
  const handleCreate = async () => {
    const result = await CreateLog({
      timestamp: new Date(),
      source: "AUTH_SERVER",
      eventType: "LOGIN_FAILED",
      severity: 8,
      action: "LOGIN",
      srcIp: "192.168.1.10",
      user: "testuser",
    });

    console.log(result);
  };

  return <button onClick={handleCreate}>Create Test Log</button>;
}
