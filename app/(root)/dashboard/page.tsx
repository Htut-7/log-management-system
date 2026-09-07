import { auth } from "@/auth";
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
    </div>
  );
}

export default DashboardPage;
