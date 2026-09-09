import { GetLogs } from "@/lib/actions/GetLogs.action";
import ROUTES from "@/ROUTES";

export default async function LogsPage({
  searchParams,
}: {
  searchParams: Promise<{
    source?: string;
    eventType?: string;
    user?: string;
    srcIp?: string;
    severity?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const params = await searchParams;

  const { success, data = [] } = await GetLogs({
    source: params.source || undefined,
    eventType: params.eventType || undefined,
    user: params.user || undefined,
    srcIp: params.srcIp || undefined,

    severity:
      params.severity !== undefined && params.severity !== ""
        ? Number(params.severity)
        : undefined,

    from: params.from ? new Date(params.from) : undefined,

    to: params.to ? new Date(params.to) : undefined,
  });

  return (
    <div className="min-h-full bg-[#0b0f14] px-5 py-6 sm:px-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                Live Data
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Log Explorer
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Search and investigate normalized security events
            </p>
          </div>

          <div className="flex items-center gap-3 border border-slate-800 bg-[#0e141b] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />

            <span className="font-mono text-xs text-slate-400">
              {success ? data.length : 0} events
            </span>
          </div>
        </div>

        <form
          method="GET"
          className="mb-6 border border-slate-800 bg-[#0e141b]"
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">
                Search Filters
              </h2>

              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
                Filter normalized log events
              </p>
            </div>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-slate-600"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M4 5h16l-6 7v5l-4 2v-7L4 5Z" />
            </svg>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <FilterField label="Source">
              <select
                name="source"
                defaultValue={params.source || ""}
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none transition focus:border-cyan-500"
              >
                <option value="">All Sources</option>
                <option value="api">API</option>
                <option value="aws">AWS</option>
                <option value="ad">Active Directory</option>
                <option value="firewall">Firewall</option>
                <option value="AUTH_SERVER">Auth Server</option>
              </select>
            </FilterField>

            <FilterField label="Event Type">
              <input
                type="text"
                name="eventType"
                placeholder="LOGIN_FAILED"
                defaultValue={params.eventType || ""}
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-cyan-500"
              />
            </FilterField>

            <FilterField label="Source IP">
              <input
                type="text"
                name="srcIp"
                placeholder="203.0.113.7"
                defaultValue={params.srcIp || ""}
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 font-mono text-sm text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-cyan-500"
              />
            </FilterField>

            <FilterField label="User">
              <input
                type="text"
                name="user"
                placeholder="alice"
                defaultValue={params.user || ""}
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-cyan-500"
              />
            </FilterField>

            <FilterField label="Severity">
              <input
                type="number"
                name="severity"
                min="0"
                max="10"
                placeholder="0 - 10"
                defaultValue={params.severity || ""}
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none transition placeholder:text-slate-700 focus:border-cyan-500"
              />
            </FilterField>

            <FilterField label="From">
              <input
                type="datetime-local"
                name="from"
                defaultValue={params.from || ""}
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none transition [color-scheme:dark] focus:border-cyan-500"
              />
            </FilterField>

            <FilterField label="To">
              <input
                type="datetime-local"
                name="to"
                defaultValue={params.to || ""}
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none transition [color-scheme:dark] focus:border-cyan-500"
              />
            </FilterField>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="6" />
                  <path d="m16 16 4 4" />
                </svg>
                Apply
              </button>

              <a
                href={ROUTES.LOGS}
                className="flex items-center justify-center border border-slate-700 bg-[#0b0f14] px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
              >
                Reset
              </a>
            </div>
          </div>
        </form>

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
                  Unable to retrieve logs
                </h3>

                <p className="mt-1 text-sm text-red-400/70">
                  The log query could not be completed.
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
                  <path d="M5 4h14v16H5z" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              </div>

              <h3 className="text-sm font-medium text-slate-300">
                No events found
              </h3>

              <p className="mt-1 text-xs text-slate-600">
                Adjust the filters to broaden your search.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden border border-slate-800 bg-[#0e141b]">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-200">
                  Event Stream
                </h2>

                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
                  Normalized security logs
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="font-mono text-[10px] text-slate-500">
                  {data.length} records
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0b0f14] text-left">
                    <TableHeader>Timestamp</TableHeader>
                    <TableHeader>Source</TableHeader>
                    <TableHeader>Event Type</TableHeader>
                    <TableHeader>Source IP</TableHeader>
                    <TableHeader>User</TableHeader>
                    <TableHeader>Severity</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {data.map((log) => (
                    <tr
                      key={log._id}
                      className="border-b border-slate-800/70 transition last:border-b-0 hover:bg-[#111820]"
                    >
                      <td className="whitespace-nowrap px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />

                          <span className="font-mono text-xs text-slate-400">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-3.5">
                        <SourceBadge source={log.source} />
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs font-medium text-slate-300">
                          {log.eventType}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-3.5">
                        {log.srcIp ? (
                          <span className="border border-slate-800 bg-[#0b0f14] px-2 py-1 font-mono text-xs text-slate-400">
                            {log.srcIp}
                          </span>
                        ) : (
                          <span className="text-slate-700">—</span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        {log.user ? (
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center border border-slate-700 bg-slate-900 text-[10px] font-semibold text-cyan-400">
                              {log.user.charAt(0).toUpperCase()}
                            </div>

                            <span className="text-xs text-slate-400">
                              {log.user}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-700">—</span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3.5">
                        <SeverityBadge severity={log.severity} />
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

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.13em] text-slate-600">
        {label}
      </label>

      {children}
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

function SourceBadge({ source }: { source: string }) {
  let style = "border-slate-700 text-slate-400";

  if (source.toLowerCase() === "api") {
    style = "border-cyan-900 text-cyan-400";
  }

  if (source.toLowerCase() === "aws") {
    style = "border-amber-900 text-amber-400";
  }

  if (source.toLowerCase() === "ad") {
    style = "border-purple-900 text-purple-400";
  }

  if (source.toLowerCase() === "firewall") {
    style = "border-emerald-900 text-emerald-400";
  }

  return (
    <span
      className={`inline-flex border bg-[#0b0f14] px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${style}`}
    >
      {source}
    </span>
  );
}

function SeverityBadge({ severity }: { severity?: number }) {
  if (severity === null || severity === undefined) {
    return <span className="text-slate-700">—</span>;
  }

  let style = "border-emerald-900 text-emerald-400";
  let dot = "bg-emerald-400";

  if (severity >= 8) {
    style = "border-red-900 text-red-400";
    dot = "bg-red-400";
  } else if (severity >= 5) {
    style = "border-amber-900 text-amber-400";
    dot = "bg-amber-400";
  } else if (severity >= 3) {
    style = "border-cyan-900 text-cyan-400";
    dot = "bg-cyan-400";
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
