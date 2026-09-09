import { auth } from "@/auth";
import { CreateAlertRule } from "@/lib/actions/CreateAlertRule.action";
import { GetAlertRules } from "@/lib/actions/GetAlert-Rules.action";
import ROUTES from "@/ROUTES";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function AlertRulesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(ROUTES.LOGIN);
  }

  if (session.user.role !== "ADMIN") {
    redirect(ROUTES.DASHBOARD);
  }

  const { success, data = [] } = await GetAlertRules();

  async function createRule(formData: FormData) {
    "use server";

    await CreateAlertRule({
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      event: String(formData.get("event") || ""),
      threshold: Number(formData.get("threshold")),
      timeWindow: Number(formData.get("timeWindow")),
      severity: String(formData.get("severity")),
      isActive: formData.get("isActive") === "on",
    });

    revalidatePath("/alert-rules");
  }

  return (
    <div className="min-h-full bg-[#0b0f14] px-5 py-6 sm:px-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 border-b border-slate-800 pb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-purple-400">
              Administration
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Alert Rules
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Configure detection rules for security events
          </p>
        </div>

        <div className="mb-6 border border-slate-800 bg-[#0e141b]">
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Create Rule
            </h2>

            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
              Detection configuration
            </p>
          </div>

          <form
            action={createRule}
            className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3"
          >
            <Field label="Rule Name">
              <input
                name="name"
                required
                placeholder="Repeated Failed Login"
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-500"
              />
            </Field>

            <Field label="Event Type">
              <input
                name="event"
                required
                placeholder="LOGIN_FAILED"
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 font-mono text-sm text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-500"
              />
            </Field>

            <Field label="Severity">
              <select
                name="severity"
                defaultValue="HIGH"
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-500"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </Field>

            <Field label="Threshold">
              <input
                type="number"
                name="threshold"
                min="1"
                required
                defaultValue="5"
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-500"
              />
            </Field>

            <Field label="Time Window (minutes)">
              <input
                type="number"
                name="timeWindow"
                min="1"
                required
                defaultValue="5"
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-cyan-500"
              />
            </Field>

            <Field label="Description">
              <input
                name="description"
                placeholder="Detect repeated failed logins"
                className="w-full border border-slate-700 bg-[#0b0f14] px-3 py-2.5 text-sm text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-500"
              />
            </Field>

            <div className="flex items-center gap-3">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 accent-cyan-500"
              />

              <label htmlFor="isActive" className="text-sm text-slate-400">
                Active
              </label>
            </div>

            <div className="md:col-span-2 xl:col-span-3">
              <button
                type="submit"
                className="bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Create Alert Rule
              </button>
            </div>
          </form>
        </div>

        <div className="border border-slate-800 bg-[#0e141b]">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">
                Detection Rules
              </h2>

              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
                Tenant rule configuration
              </p>
            </div>

            <span className="font-mono text-[10px] text-slate-500">
              {data.length} rules
            </span>
          </div>

          {!success ? (
            <div className="p-6 text-sm text-red-400">
              Failed to load alert rules.
            </div>
          ) : data.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-slate-400">
                No alert rules configured.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0b0f14] text-left">
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Event</TableHeader>
                    <TableHeader>Threshold</TableHeader>
                    <TableHeader>Window</TableHeader>
                    <TableHeader>Severity</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {data.map((rules) => (
                    <tr
                      key={rules._id}
                      className="border-b border-slate-800/70 last:border-b-0 hover:bg-[#111820]"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-300">
                          {rules.name}
                        </p>

                        {rules.description && (
                          <p className="mt-1 text-xs text-slate-600">
                            {rules.description}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-cyan-400">
                          {rules.event}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-slate-400">
                        {rules.threshold}
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-slate-400">
                        {rules.timeWindow} min
                      </td>

                      <td className="px-5 py-4">
                        <Severity severity={rules.severity} />
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase ${
                            rules.isActive
                              ? "text-emerald-400"
                              : "text-slate-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              rules.isActive ? "bg-emerald-400" : "bg-slate-600"
                            }`}
                          />

                          {rules.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
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

function Severity({ severity }: { severity: string }) {
  let style = "border-slate-700 text-slate-400";

  if (severity === "LOW") {
    style = "border-cyan-900 text-cyan-400";
  }

  if (severity === "MEDIUM") {
    style = "border-amber-900 text-amber-400";
  }

  if (severity === "HIGH") {
    style = "border-red-900 text-red-400";
  }

  if (severity === "CRITICAL") {
    style = "border-purple-900 text-purple-400";
  }

  return (
    <span
      className={`border bg-[#0b0f14] px-2 py-1 font-mono text-[10px] ${style}`}
    >
      {severity}
    </span>
  );
}
