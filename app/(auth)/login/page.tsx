"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "@/ROUTES";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const logIn = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push(ROUTES.DASHBOARD);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] text-slate-200">
      <div className="grid min-h-screen lg:grid-cols-[1fr_520px]">
        <section className="hidden border-r border-slate-800 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 border-b border-slate-800 px-10 py-6">
            <div className="flex h-9 w-9 items-center justify-center border border-cyan-500/40 bg-cyan-500/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 text-cyan-400"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 3 4.5 6v5.2c0 4.7 3 8.1 7.5 9.8 4.5-1.7 7.5-5.1 7.5-9.8V6L12 3Z" />
                <path d="M9 12.2 11 14l4-4" />
              </svg>
            </div>

            <div>
              <h1 className="font-semibold tracking-wide text-slate-100">
                Log Management System
              </h1>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Security Operations Console
              </p>
            </div>
          </div>

          <div className="flex flex-1 items-center px-10">
            <div className="w-full max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                  System Operational
                </span>
              </div>

              <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white">
                Centralized security event monitoring
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                Monitor normalized security logs, investigate events, review
                alerts, and track activity across connected data sources.
              </p>

              <div className="mt-10 border border-slate-800 bg-[#0e141b]">
                <div className="border-b border-slate-800 px-5 py-3">
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                    Ingestion Status
                  </p>
                </div>

                <div className="grid grid-cols-2">
                  <StatusItem name="Firewall" protocol="SYSLOG / UDP" />
                  <StatusItem name="API" protocol="HTTP / JSON" />
                  <StatusItem name="AWS" protocol="HTTP / JSON" />
                  <StatusItem name="Active Directory" protocol="BATCH / JSON" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 border border-slate-800 bg-[#0e141b]">
                <InfoItem label="Authentication" value="RBAC" />
                <InfoItem label="Isolation" value="Tenant" />
                <InfoItem label="Transport" value="TLS" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 px-10 py-5">
            <p className="font-mono text-[11px] text-slate-600">
              SECURITY CONSOLE · AUTHORIZED ACCESS ONLY
            </p>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-[#0e141b] px-6 py-12 sm:px-10">
          <div className="w-full max-w-sm">
            <div className="mb-10 lg:hidden">
              <div className="mb-4 flex h-10 w-10 items-center justify-center border border-cyan-500/40 bg-cyan-500/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-cyan-400"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 3 4.5 6v5.2c0 4.7 3 8.1 7.5 9.8 4.5-1.7 7.5-5.1 7.5-9.8V6L12 3Z" />
                  <path d="M9 12.2 11 14l4-4" />
                </svg>
              </div>

              <h1 className="font-semibold text-white">
                Log Management System
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                Security Operations Console
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-400">
                Secure Access
              </p>

              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your authorized account credentials.
              </p>
            </div>

            <form onSubmit={logIn} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="user@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full border border-slate-700 bg-[#0b0f14] px-3.5 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-slate-700 bg-[#0b0f14] px-3.5 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
                />
              </div>

              {error && (
                <div className="border border-red-900/70 bg-red-950/40 px-3.5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Sign in"}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-800 pt-5">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="5" y="10" width="14" height="10" rx="1" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <span>Access is restricted to authorized users.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatusItem({ name, protocol }: { name: string; protocol: string }) {
  return (
    <div className="border-b border-r border-slate-800 px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-300">{name}</p>
          <p className="mt-1 font-mono text-[10px] text-slate-600">
            {protocol}
          </p>
        </div>

        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-slate-800 px-5 py-4 last:border-r-0">
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">{value}</p>
    </div>
  );
}

export default LoginPage;
