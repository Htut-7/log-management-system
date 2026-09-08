import { auth, signOut } from "@/auth";
import ROUTES from "@/ROUTES";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50/40 to-indigo-50/30">
      <aside className="group/sidebar flex h-screen w-72 shrink-0 flex-col border-r border-slate-200/60 bg-white shadow-[0_0_40px_-12px_rgba(15,23,42,0.08)]">
        <div className="shrink-0 relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-white via-slate-50 to-indigo-50/60 px-6 py-7">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-gradient-to-tr from-purple-400/10 to-pink-400/10 blur-2xl"></div>

          <div className="relative flex items-start gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-xl shadow-indigo-600/30 ring-1 ring-white/50">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50"></div>
              <svg
                className="relative h-7 w-7 text-white drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-[17px] font-black tracking-tight text-slate-900">
                Log Management
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <p className="truncate text-[11px] font-semibold text-slate-500">
                  {session.user.tenant}
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin">
          <div className="mb-4 px-2">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
              Overview
            </p>
          </div>

          <div className="space-y-1.5">
            <Link
              href={ROUTES.DASHBOARD}
              className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50/60 hover:to-transparent hover:text-indigo-700 hover:shadow-[0_1px_0_0_rgba(99,102,241,0.08)]"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-105">
                <svg
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="flex-1">Dashboard</span>
              <svg
                className="h-4 w-4 translate-x-[-6px] opacity-0 text-indigo-500 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>

            <Link
              href={ROUTES.LOGS}
              className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:via-indigo-50/60 hover:to-transparent hover:text-indigo-700 hover:shadow-[0_1px_0_0_rgba(99,102,241,0.08)]"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-cyan-500/25 group-hover:scale-105">
                <svg
                  className="h-[18px] w-[18px]"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M9 12h.008M12 12h.008M15 12h.008M9 15.75h.008v.008H9v-.008zM12 15.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <span className="flex-1">Logs</span>
              <svg
                className="h-4 w-4 translate-x-[-6px] opacity-0 text-blue-500 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>

            <Link
              href="/alerts"
              className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-50 hover:via-orange-50/60 hover:to-transparent hover:text-orange-700 hover:shadow-[0_1px_0_0_rgba(249,115,22,0.08)]"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/25 group-hover:scale-105">
                <svg
                  className="h-[18px] w-[18px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M10.34 4.062a3.007 3.007 0 013.32 0M12 15.75v.008"
                  />
                </svg>
              </div>
              <span className="flex-1">Alerts</span>
              <div className="relative">
                <span className="relative inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 px-1.5 text-[10px] font-black text-white shadow-md shadow-red-500/30 ring-1 ring-white/60">
                  3
                </span>
              </div>
            </Link>
          </div>

          {isAdmin && (
            <>
              <div className="mb-4 mt-8 px-2">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                  Administration
                </p>
              </div>

              <div className="space-y-1.5">
                <Link
                  href="/alert-rules"
                  className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:via-fuchsia-50/60 hover:to-transparent hover:text-fuchsia-700 hover:shadow-[0_1px_0_0_rgba(192,38,211,0.08)]"
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-fuchsia-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-fuchsia-500/25 group-hover:scale-105">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </div>
                  <span className="flex-1">Alert Rules</span>
                  <svg
                    className="h-4 w-4 translate-x-[-6px] opacity-0 text-fuchsia-500 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>

                <Link
                  href="/admin"
                  className="group relative flex items-center gap-3.5 overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-semibold text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-50 hover:via-purple-50/60 hover:to-transparent hover:text-violet-700 hover:shadow-[0_1px_0_0_rgba(139,92,246,0.08)]"
                >
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-violet-500/25 group-hover:scale-105">
                    <svg
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <span className="flex-1">Users</span>
                  <svg
                    className="h-4 w-4 translate-x-[-6px] opacity-0 text-violet-500 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </nav>

        <div className="shrink-0 relative overflow-hidden border-t border-slate-200/60 bg-gradient-to-t from-slate-50 via-white to-slate-50 px-4 py-5">
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300/10 to-purple-300/10 blur-3xl"></div>
          <div className="relative">
            <div className="mb-4 flex items-center gap-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/60 p-3.5 ring-1 ring-slate-200/70 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)]">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-sm font-black text-white shadow-lg shadow-indigo-500/30 ring-2 ring-white">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/25 to-transparent opacity-60"></div>
                <span className="relative drop-shadow-sm">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-black text-slate-900">
                  {session.user.name}
                </p>
                <span
                  className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide ring-1 ring-inset ${
                    isAdmin
                      ? "bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-700 ring-purple-600/20"
                      : "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-blue-600/20"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isAdmin ? "bg-purple-500" : "bg-blue-500"
                    }`}
                  ></span>
                  {session.user.role}
                </span>
              </div>
            </div>

            <form
              action={async () => {
                "use server";

                await signOut({
                  redirectTo: ROUTES.LOGIN,
                });
              }}
            >
              <button
                type="submit"
                className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-50 to-rose-50 px-4 py-3 text-sm font-black text-red-600 ring-1 ring-inset ring-red-100 transition-all duration-300 hover:from-red-500 hover:via-rose-500 hover:to-pink-500 hover:text-white hover:shadow-xl hover:shadow-red-500/30 hover:ring-red-400/30 active:scale-[0.97]"
              >
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-[100%]"></div>
                <svg
                  className="relative h-[18px] w-[18px] transition-transform duration-300 group-hover/btn:translate-x-[-3px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
                <span className="relative">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="relative h-screen flex-1 overflow-y-auto overflow-x-hidden">
        <div className="pointer-events-none fixed left-72 top-0 z-0 h-[400px] w-[400px] -translate-x-[30%] -translate-y-20 rounded-full bg-gradient-to-br from-blue-200/20 via-indigo-200/20 to-purple-200/20 blur-3xl"></div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
