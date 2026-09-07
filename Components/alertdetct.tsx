"use client";

import { DetectAlert } from "@/lib/actions/DetectAlert.action";

export default function TestDetectAlertButton() {
  const handleDetect = async () => {
    const result = await DetectAlert();
    console.log(result);
  };

  return <button onClick={handleDetect}>Run Alert Detection</button>;
}
