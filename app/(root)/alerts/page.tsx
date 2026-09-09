import { GetAlerts } from "@/lib/actions/GetAlerts.action";

export default async function AlertsPage() {
  const { success, data = [], message } = await GetAlerts();

  return (
    <div className="min-h-full bg-[#0b0f14] px-5 py-6 sm:px-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-amber-400">
                Detection
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Security Alerts
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review security events triggered by active detection rules
            </p>
          </div>

          <div className="flex items-center gap-3 border border-slate-800 bg-[#0e141b] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-red-400" />

            <span className="font-mono text-xs text-slate-400">
              {success ? data.length : 0} alerts
            </span>
          </div>
        </div>

        {!success ? (
          <div className="border border-red-900/60 bg-red-950/30 p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-red-900 bg-red-950/60 text-red-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M12 3 3 20h18L12 3Z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-red-300">
                  Unable to retrieve alerts
                </h3>

                <p className="mt-1 text-sm text-red-400/70">
                  {message || "The alert query could not be completed."}
                </p>
              </div>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex min-h-72 items-center justify-center border border-slate-800 bg-[#0e141b] p-8">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center border border-slate-800 bg-[#0b0f14] text-slate-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>
              </div>

              <h3 className="text-sm font-medium text-slate-300">
                No alerts detected
              </h3>

              <p className="mt-1 text-xs text-slate-600">
                Triggered security rules will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden border border-slate-800 bg-[#0e141b]">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-200">
                  Alert Queue
                </h2>

                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
                  Tenant-scoped detection results
                </p>
              </div>

              <span className="font-mono text-[10px] text-slate-500">
                {data.length} records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0b0f14] text-left">
                    <TableHeader>Time</TableHeader>
                    <TableHeader>Alert</TableHeader>
                    <TableHeader>Severity</TableHeader>
                    <TableHeader>Source IP</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Message</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {data.map((alert) => (
                    <tr
                      key={alert._id}
                      className="border-b border-slate-800/70 transition last:border-b-0 hover:bg-[#111820]"
                    >
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-mono text-xs text-slate-500">
                          {alert.createdAt
                            ? new Date(alert.createdAt).toLocaleString()
                            : "-"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-red-900/70 bg-red-950/40 text-red-400">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-4 w-4"
                              stroke="currentColor"
                              strokeWidth="1.7"
                            >
                              <path d="M12 3 3 20h18L12 3Z" />
                              <path d="M12 9v4M12 17h.01" />
                            </svg>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-300">
                              {alert.title}
                            </p>

                            <p className="mt-1 font-mono text-[10px] text-slate-600">
                              RULE {String(alert.rule).slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <SeverityBadge severity={alert.severity} />
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        {alert.sourceIp ? (
                          <span className="border border-slate-800 bg-[#0b0f14] px-2 py-1 font-mono text-xs text-slate-400">
                            {alert.sourceIp}
                          </span>
                        ) : (
                          <span className="text-slate-700">—</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={alert.status} />
                      </td>

                      <td className="max-w-md px-5 py-4">
                        <p className="text-xs leading-5 text-slate-500">
                          {alert.message}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-[0.13em] text-slate-600">
      {children}
    </th>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  let style = "border-slate-700 text-slate-400";
  let dot = "bg-slate-500";

  if (severity === "LOW") {
    style = "border-cyan-900 text-cyan-400";
    dot = "bg-cyan-400";
  }

  if (severity === "MEDIUM") {
    style = "border-amber-900 text-amber-400";
    dot = "bg-amber-400";
  }

  if (severity === "HIGH") {
    style = "border-red-900 text-red-400";
    dot = "bg-red-400";
  }

  if (severity === "CRITICAL") {
    style = "border-purple-900 text-purple-400";
    dot = "bg-purple-400";
  }

  return (
    <span
      className={`inline-flex items-center gap-2 border bg-[#0b0f14] px-2 py-1 font-mono text-[10px] ${style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isOpen = status === "OPEN";

  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase ${
        isOpen ? "text-red-400" : "text-emerald-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isOpen ? "bg-red-400" : "bg-emerald-400"
        }`}
      />

      {status}
    </span>
  );
}
