"use client";

import React from "react";
import { signOut } from "next-auth/react";

function page() {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export default page;
