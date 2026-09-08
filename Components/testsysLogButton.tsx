"use client";

import { IngestSysLog } from "@/lib/actions/IngestSysLog.action";

export default function TestSyslogButton() {
  const handleTest = async () => {
    const result = await IngestSysLog({
      source: "firewall",
      message:
        "<134>Aug 20 12:44:56 fw01 vendor=demo product=ngfw action=deny src=10.0.1.10 dst=8.8.8.8 spt=5353 dpt=53 proto=udp msg=DNS blocked policy=Block-DNS",
    });

    console.log(result);
  };

  return <button onClick={handleTest}>Test Firewall Syslog</button>;
}
