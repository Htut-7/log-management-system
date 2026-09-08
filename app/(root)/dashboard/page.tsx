import { GetDashboardStats } from "@/lib/actions/GetDashboardStats.action";

export default async function DashboardPage() {
  const { success, data } = await GetDashboardStats();

  if (!success || !data) {
    return (
      <div className="p-6 sm:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-red-200/60 bg-gradient-to-br from-red-50 via-white to-rose-50/80 px-8 py-16 text-center shadow-lg shadow-red-500/5">
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 shadow-xl shadow-red-500/30 ring-1 ring-white">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
              <svg
                className="relative h-10 w-10 text-white drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-red-700">
              Failed to load dashboard
            </h2>
            <p className="mt-2 max-w-md text-sm font-medium text-red-600/80">
              Unable to retrieve dashboard statistics. Please refresh the page
              or try again shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const maxIpCount = Math.max(...data.topIps.map((i) => i.count), 1);
  const maxUserCount = Math.max(...data.topUsers.map((i) => i.count), 1);
  const maxEventCount = Math.max(...data.topEventTypes.map((i) => i.count), 1);
  const maxTimelineCount = Math.max(...data.timeline.map((i) => i.count), 1);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              LIVE OVERVIEW
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Security log overview for your tenant
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/70">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Today
              </p>
              <p className="text-sm font-bold text-slate-800">{currentDate}</p>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.25)] hover:ring-blue-200/80 hover:-translate-y-1">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-400/10 blur-3xl transition-all duration-500 group-hover:scale-125"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Logs
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                  {data.totalLogs.toLocaleString()}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </span>
                  All sources aggregated
                </div>
              </div>
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 shadow-lg shadow-blue-500/30 ring-1 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
                <svg
                  className="relative h-7 w-7 text-white drop-shadow-sm"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.25)] hover:ring-amber-200/80 hover:-translate-y-1">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-amber-400/15 to-orange-400/10 blur-3xl transition-all duration-500 group-hover:scale-125"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Unique IPs
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                  {data.topIps.length.toLocaleString()}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </span>
                  Source addresses
                </div>
              </div>
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-400 shadow-lg shadow-orange-500/30 ring-1 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
                <svg
                  className="relative h-7 w-7 text-white drop-shadow-sm"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.25)] hover:ring-purple-200/80 hover:-translate-y-1">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-purple-400/15 to-pink-400/10 blur-3xl transition-all duration-500 group-hover:scale-125"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Users
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                  {data.topUsers.length.toLocaleString()}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-purple-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </span>
                  Recorded activity
                </div>
              </div>
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-purple-500/30 ring-1 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
                <svg
                  className="relative h-7 w-7 text-white drop-shadow-sm"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0zM6.75 4.5h10.5m0 0a2.25 2.25 0 012.25 2.25m-2.25-2.25a2.25 2.25 0 00-2.25 2.25m2.25-2.25H6.75m0 0A2.25 2.25 0 004.5 6.75M6.75 4.5a2.25 2.25 0 012.25 2.25m0 13.5h6.75"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)] hover:ring-emerald-200/80 hover:-translate-y-1">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/15 to-teal-400/10 blur-3xl transition-all duration-500 group-hover:scale-125"></div>
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Event Types
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-slate-900">
                  {data.topEventTypes.length.toLocaleString()}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  Categories tracked
                </div>
              </div>
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-400 shadow-lg shadow-emerald-500/30 ring-1 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-60"></div>
                <svg
                  className="relative h-7 w-7 text-white drop-shadow-sm"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 ring-1 ring-blue-100">
                  <svg
                    className="h-5.5 w-5.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Top Source IPs
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                Ranked
              </span>
            </div>

            {data.topIps.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  No source IP data available.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.topIps.map((item, idx) => (
                  <div key={item.name} className="group">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black ${
                            idx === 0
                              ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md shadow-amber-500/30"
                              : idx === 1
                                ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-sm"
                                : idx === 2
                                  ? "bg-gradient-to-br from-orange-400 to-amber-600 text-white shadow-sm"
                                  : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-mono text-sm font-bold text-slate-700 group-hover:text-blue-700">
                          {item.name}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                        {item.count.toLocaleString()}
                        <span className="text-[9px] opacity-70">req</span>
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 shadow-[0_0_10px_-2px_rgba(59,130,246,0.5)] transition-all duration-500 group-hover:from-blue-600 group-hover:via-cyan-600 group-hover:to-teal-500"
                        style={{
                          width: `${(item.count / maxIpCount) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 text-purple-600 ring-1 ring-purple-100">
                  <svg
                    className="h-5.5 w-5.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Top Users
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                Ranked
              </span>
            </div>

            {data.topUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  No user data available.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.topUsers.map((item, idx) => (
                  <div key={item.name} className="group">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl text-[11px] font-black shadow-sm ${
                            idx === 0
                              ? "bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white"
                              : idx === 1
                                ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                                : idx === 2
                                  ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white"
                                  : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600"
                          }`}
                        >
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="truncate text-sm font-bold text-slate-700 group-hover:text-purple-700">
                          {item.name}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-50 to-fuchsia-50 px-3 py-1 text-xs font-black text-purple-700 ring-1 ring-purple-100">
                        {item.count.toLocaleString()}
                        <span className="text-[9px] opacity-70">evts</span>
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 shadow-[0_0_10px_-2px_rgba(168,85,247,0.5)] transition-all duration-500 group-hover:from-purple-600 group-hover:via-violet-600 group-hover:to-fuchsia-600"
                        style={{
                          width: `${(item.count / maxUserCount) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 ring-1 ring-emerald-100">
                  <svg
                    className="h-5.5 w-5.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.2}
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  Top Event Types
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500">
                Ranked
              </span>
            </div>

            {data.topEventTypes.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  No event data available.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.topEventTypes.map((item, idx) => (
                  <div key={item.name} className="group">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                            idx === 0
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm"
                              : idx === 1
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm"
                                : idx === 2
                                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm"
                                  : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.name.substring(0, 2)}
                        </span>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700">
                          {item.name}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-100">
                        {item.count.toLocaleString()}
                        <span className="text-[9px] opacity-70">cnt</span>
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 shadow-[0_0_10px_-2px_rgba(16,185,129,0.5)] transition-all duration-500 group-hover:from-emerald-600 group-hover:via-teal-600 group-hover:to-cyan-500"
                        style={{
                          width: `${(item.count / maxEventCount) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/70">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-indigo-600 ring-1 ring-indigo-100 shadow-sm">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-900">
                  Log Timeline
                </h2>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">
                  Activity distribution across time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/50 px-4 py-2.5 ring-1 ring-slate-200/70">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm"></span>
                <span className="text-xs font-bold text-slate-600">
                  Log Count
                </span>
              </div>
              <div className="h-5 w-px bg-slate-300/70"></div>
              <div className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs font-black text-slate-700">
                  {data.timeline.length} intervals
                </span>
              </div>
            </div>
          </div>

          {data.timeline.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100/50 px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-black text-slate-700">
                No timeline data available
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Timeline chart will appear once log entries are recorded.
              </p>
            </div>
          ) : (
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-64 sm:h-80 px-1">
              {data.timeline.map((item, idx) => {
                const barHeight = (item.count / maxTimelineCount) * 100;
                const isMax = item.count === maxTimelineCount;
                return (
                  <div
                    key={item.time + idx}
                    className="group relative flex h-full flex-1 flex-col items-center justify-end min-w-0"
                  >
                    <span
                      className={`mb-2 whitespace-nowrap rounded-lg px-2 py-1 text-[10px] font-black transition-all duration-300 ${
                        isMax
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-110"
                          : "bg-slate-100 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5"
                      }`}
                    >
                      {item.count}
                      {item.count === 1 ? " log" : " logs"}
                    </span>
                    <div
                      className={`relative w-full overflow-hidden rounded-t-xl transition-all duration-500 ease-out ${
                        isMax
                          ? "bg-gradient-to-t from-indigo-600 via-purple-500 to-fuchsia-400 shadow-[0_10px_40px_-12px_rgba(99,102,241,0.6)] group-hover:shadow-[0_15px_50px_-10px_rgba(99,102,241,0.7)]"
                          : "bg-gradient-to-t from-slate-200 via-indigo-200/70 to-indigo-100/50 group-hover:from-indigo-500 group-hover:via-purple-400 group-hover:to-fuchsia-300 group-hover:shadow-lg group-hover:shadow-indigo-400/30"
                      }`}
                      style={{ height: `${Math.max(barHeight, 4)}%` }}
                    >
                      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/40 to-transparent opacity-70"></div>
                    </div>
                    <div className="mt-3 w-full truncate text-center">
                      <p
                        className={`text-[10px] font-bold truncate ${
                          isMax ? "text-indigo-700" : "text-slate-500"
                        }`}
                        title={item.time}
                      >
                        {item.time.length > 8
                          ? item.time.substring(0, 8)
                          : item.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
