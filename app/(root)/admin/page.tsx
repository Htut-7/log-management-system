import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/Login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Welcome {session.user?.name}</h2>
      <p>Role: {session.user?.role}</p>
    </div>
  );
}

export default AdminPage;
