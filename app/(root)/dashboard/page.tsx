import { auth } from "@/auth";
import TestDetectAlertButton from "@/Components/alertdetct";
import TestApiIngestionButton from "@/Components/apiIngestionButton";
import TestAwsIngestionButton from "@/Components/testaws";
import TestSyslogButton from "@/Components/testsysLogButton";
import TestLogButton from "@/Components/text";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/Login");
  }

  console.log("SESSION:", session);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome {session.user?.name}</h2>
      <p>Role: {session.user?.role}</p>
      <p>Tenant: {session.user?.tenant}</p>
      <TestLogButton />
      <TestDetectAlertButton />
      <TestApiIngestionButton />
      <TestAwsIngestionButton />
      <TestSyslogButton />
    </div>
  );
}

export default DashboardPage;
