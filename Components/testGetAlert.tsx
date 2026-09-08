"use client";

import { GetAlerts } from "@/lib/actions/GetAlerts.action";

export default function TestGetAlertsButton() {
  const handleTest = async () => {
    const result = await GetAlerts();

    console.log(result);
  };

  return <button onClick={handleTest}>Test Get Alerts</button>;
}
