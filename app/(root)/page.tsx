
import { GetDashboardStats } from "@/lib/actions/GetDashboardStats.action";
import Link from "next/link";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    source?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const params = await searchParams;

  const parseLocalDateTime = (value?: string) => {
  if (!value) return undefined;

  return new Date(`${value}:00+07:00`);
};

const { success, data } = await GetDashboardStats({
  source: params.source || undefined,
  from: parseLocalDateTime(params.from),
  to: parseLocalDateTime(params.to),
});

  if (!success || !data) {
    return (
      <div className="min-h-full bg-[#0b0f14] p-6">
        <div className="border border-red-900/60 bg-red-950/30 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-red-800 bg-red-950/60 text-red-400">
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
              <h2 className="font-semibold text-red-300">
                Failed to load dashboard
              </h2>

              <p className="mt-1 text-sm text-red-400/70">
                Unable to retrieve dashboard statistics.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const maxIpCount = Math.max(...data.topIps.map((item) => item.count), 1);

  const maxUserCount = Math.max(...data.topUsers.map((item) => item.count), 1);

  const maxEventCount = Math.max(
    ...data.topEventTypes.map((item) => item.count),
    1,
  );

  const maxTimelineCount = Math.max(
    ...data.timeline.map((item) => item.count),
    1,
  );

  const topIp = data.topIps[0];
  const topUser = data.topUsers[0];
  const topEvent = data.topEventTypes[0];

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-full bg-[#0b0f14] px-5 py-6 sm:px-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">
                Monitoring Active
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Security Overview
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Log activity and security event summary
            </p>
          </div>

          <div className="flex items-center gap-2 border border-slate-800 bg-[#0e141b] px-3 py-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-slate-500"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M7 3v3M17 3v3M4 9h16M5 5h14v16H5z" />
            </svg>

            <span className="font-mono text-xs text-slate-400">
              {currentDate}
            </span>
          </div>
        </div>

        

        <form
  method="GET"
  className="mb-6 flex flex-col gap-4 border border-slate-800 bg-[#0e141b] p-4 sm:flex-row sm:items-end"
>
  <div className="flex flex-1 flex-col gap-2">
    <label className="font-mono text-[10px] uppercase tracking-[0.13em] text-slate-600">
      Source
    </label>

    <select
      name="source"
      defaultValue={params.source || ""}
      className="border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-500"
    >
      <option value="">All Sources</option>
      <option value="api">API</option>
      <option value="aws">AWS</option>
      <option value="ad">Active Directory</option>
      <option value="firewall">Firewall</option>
    </select>
  </div>

  <div className="flex flex-1 flex-col gap-2">
    <label className="font-mono text-[10px] uppercase tracking-[0.13em] text-slate-600">
      From
    </label>

    <input
      type="datetime-local"
      name="from"
      defaultValue={params.from || ""}
      className="border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none [color-scheme:dark] focus:border-cyan-500"
    />
  </div>

  <div className="flex flex-1 flex-col gap-2">
    <label className="font-mono text-[10px] uppercase tracking-[0.13em] text-slate-600">
      To
    </label>

    <input
      type="datetime-local"
      name="to"
      defaultValue={params.to || ""}
      className="border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none [color-scheme:dark] focus:border-cyan-500"
    />
  </div>

  <button
    type="submit"
    className="bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
  >
    Apply Filters
  </button>

  <Link
    href="/"
    className="border border-slate-700 bg-[#0b0f14] px-5 py-2.5 text-center text-sm font-medium text-slate-400 transition hover:text-white"
  >
    Reset
  </Link>
</form>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Logs"
            value={data.totalLogs.toLocaleString()}
            detail="Events ingested"
            accent="cyan"
          />

          <StatCard
            label="Top Source IP"
            value={topIp ? topIp.count.toLocaleString() : "0"}
            detail={topIp?.name || "No source IP"}
            accent="amber"
          />

          <StatCard
            label="Top User"
            value={topUser ? topUser.count.toLocaleString() : "0"}
            detail={topUser?.name || "No user activity"}
            accent="purple"
          />

          <StatCard
            label="Top Event"
            value={topEvent ? topEvent.count.toLocaleString() : "0"}
            detail={topEvent?.name || "No event activity"}
            accent="emerald"
          />
        </div>

        <div className="mb-6 grid gap-4 xl:grid-cols-3">
          <RankingPanel
            title="Top Source IPs"
            label="SOURCE ADDRESS"
            items={data.topIps}
            maxCount={maxIpCount}
            accent="cyan"
          />

          <RankingPanel
            title="Top Users"
            label="IDENTITY"
            items={data.topUsers}
            maxCount={maxUserCount}
            accent="purple"
          />

          <RankingPanel
            title="Top Event Types"
            label="EVENT CATEGORY"
            items={data.topEventTypes}
            maxCount={maxEventCount}
            accent="emerald"
          />
        </div>

        <div className="border border-slate-800 bg-[#0e141b]">
          <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-cyan-400" />

                <h2 className="font-semibold text-slate-200">Log Timeline</h2>
              </div>

              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-slate-600">
                Event volume by hour
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wide text-slate-500">
              <span className="h-2 w-2 bg-cyan-400" />
              <span>Events</span>

              <span className="text-slate-700">|</span>

              <span>{data.timeline.length} intervals</span>
            </div>
          </div>

          {data.timeline.length === 0 ? (
            <div className="flex min-h-64 items-center justify-center p-6">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center border border-slate-800 bg-[#0b0f14] text-slate-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
                  </svg>
                </div>

                <p className="text-sm text-slate-400">
                  No timeline data available
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  Events will appear after logs are ingested.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6">
              <div className="flex h-72 items-end gap-2 border-b border-slate-800 sm:gap-3">
                {data.timeline.map((item, index) => {
                  const height = (item.count / maxTimelineCount) * 100;

                  const isMax = item.count === maxTimelineCount;

                  return (
                    <div
                      key={`${item.time}-${index}`}
                      className="group flex h-full min-w-0 flex-1 flex-col justify-end"
                    >
                      <div className="mb-2 text-center">
                        <span
                          className={`font-mono text-[10px] ${
                            isMax
                              ? "text-cyan-400"
                              : "text-slate-600 group-hover:text-slate-400"
                          }`}
                        >
                          {item.count}
                        </span>
                      </div>

                      <div
                        className={`w-full transition ${
                          isMax
                            ? "bg-cyan-400"
                            : "bg-slate-700 group-hover:bg-cyan-500/70"
                        }`}
                        style={{
                          height: `${Math.max(height, 4)}%`,
                        }}
                      />

                      <div className="mt-3 min-h-8 truncate text-center">
                        <span
                          title={item.time}
                          className="font-mono text-[9px] text-slate-600"
                        >
                          {item.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: "cyan" | "amber" | "purple" | "emerald";
}) {
  const accentClasses = {
    cyan: "border-cyan-500/30 text-cyan-400",
    amber: "border-amber-500/30 text-amber-400",
    purple: "border-purple-500/30 text-purple-400",
    emerald: "border-emerald-500/30 text-emerald-400",
  };

  return (
    <div className="border border-slate-800 bg-[#0e141b] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>

          <p title={detail} className="mt-2 truncate text-xs text-slate-500">
            {detail}
          </p>
        </div>

        <div
          className={`mt-1 h-2 w-2 shrink-0 border ${accentClasses[accent]}`}
        >
          <div className="h-full w-full bg-current" />
        </div>
      </div>
    </div>
  );
}

function RankingPanel({
  title,
  label,
  items,
  maxCount,
  accent,
}: {
  title: string;
  label: string;
  items: {
    name: string;
    count: number;
  }[];
  maxCount: number;
  accent: "cyan" | "purple" | "emerald";
}) {
  const barClasses = {
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    emerald: "bg-emerald-500",
  };

  return (
    <div className="border border-slate-800 bg-[#0e141b]">
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-200">{title}</h2>

        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
          {label}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-52 items-center justify-center p-5">
          <p className="text-sm text-slate-600">No data available</p>
        </div>
      ) : (
        <div className="space-y-4 p-5">
          {items.map((item, index) => (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-slate-800 bg-[#0b0f14] font-mono text-[9px] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    title={item.name}
                    className="truncate font-mono text-xs text-slate-300"
                  >
                    {item.name}
                  </span>
                </div>

                <span className="font-mono text-[10px] text-slate-500">
                  {item.count}
                </span>
              </div>

              <div className="h-1 overflow-hidden bg-slate-800">
                <div
                  className={`h-full ${barClasses[accent]}`}
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
