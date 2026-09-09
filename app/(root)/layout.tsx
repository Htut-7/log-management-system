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
    redirect(ROUTES.LOGIN);
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0f14] text-slate-200">
      <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0e141b]">
        <div className="shrink-0 border-b border-slate-800 px-5 py-5">
          <div className="flex items-center gap-3">
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

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-slate-100">
                Log Management
              </h1>

              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                Security Console
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 border border-slate-800 bg-[#0b0f14] px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="truncate font-mono text-[10px] uppercase tracking-wide text-slate-500">
              {session.user.tenant}
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">
            Monitoring
          </p>

          <div className="space-y-1">
            <Link
              href={ROUTES.DASHBOARD}
              className="group flex items-center gap-3 border border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:border-slate-800 hover:bg-[#111820] hover:text-slate-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px] text-slate-500 transition group-hover:text-cyan-400"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>

              <span>Dashboard</span>
            </Link>

            <Link
              href={ROUTES.LOGS}
              className="group flex items-center gap-3 border border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:border-slate-800 hover:bg-[#111820] hover:text-slate-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px] text-slate-500 transition group-hover:text-cyan-400"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M5 4h14v16H5z" />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>

              <span>Logs</span>
            </Link>

            <Link
              href="/alerts"
              className="group flex items-center gap-3 border border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:border-slate-800 hover:bg-[#111820] hover:text-slate-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[18px] w-[18px] text-slate-500 transition group-hover:text-amber-400"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 3 3 20h18L12 3Z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>

              <span className="flex-1">Alerts</span>

              <span className="h-2 w-2 rounded-full bg-red-400" />
            </Link>
          </div>

          {isAdmin && (
            <>
              <p className="mb-2 mt-7 px-3 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">
                Administration
              </p>

              <div className="space-y-1">
                <Link
                  href="/alert-rules"
                  className="group flex items-center gap-3 border border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:border-slate-800 hover:bg-[#111820] hover:text-slate-100"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[18px] w-[18px] text-slate-500 transition group-hover:text-cyan-400"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M4 7h10M17 7h3M4 17h3M10 17h10" />
                    <circle cx="15" cy="7" r="2" />
                    <circle cx="8" cy="17" r="2" />
                  </svg>

                  <span>Alert Rules</span>
                </Link>

                <Link
                  href="/admin"
                  className="group flex items-center gap-3 border border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:border-slate-800 hover:bg-[#111820] hover:text-slate-100"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[18px] w-[18px] text-slate-500 transition group-hover:text-cyan-400"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="9" cy="8" r="3" />
                    <circle cx="17" cy="9" r="2" />
                    <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
                    <path d="M15 14c3 0 5 1.8 5 5" />
                  </svg>

                  <span>Users</span>
                </Link>
              </div>
            </>
          )}
        </nav>

        <div className="shrink-0 border-t border-slate-800 p-4">
          <div className="mb-3 border border-slate-800 bg-[#0b0f14] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-slate-700 bg-slate-900 text-xs font-semibold text-cyan-400">
                {session.user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-200">
                  {session.user.name}
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isAdmin ? "bg-purple-400" : "bg-cyan-400"
                    }`}
                  />

                  <span className="font-mono text-[10px] uppercase tracking-wide text-slate-500">
                    {session.user.role}
                  </span>
                </div>
              </div>
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
              className="flex w-full items-center justify-center gap-2 border border-slate-800 bg-[#0b0f14] px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:border-red-900 hover:bg-red-950/30 hover:text-red-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M10 5H5v14h5" />
                <path d="M14 8l4 4-4 4M18 12H9" />
              </svg>

              <span>Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="h-screen flex-1 overflow-y-auto overflow-x-hidden bg-[#0b0f14]">
        <div className="min-h-full">{children}</div>
      </main>
    </div>
  );
}
