import { MinimalBarChart, MinimalPieChart } from "@/components/ChartCard";
import MetricCard from "@/components/MetricCard";
import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { adminMetrics, adminWorkers, claimStatusBreakdown, fraudAlerts, riskDistribution } from "@/utils/mockData";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Admin dashboard"
        title="Operational visibility without dashboard noise"
        description="A premium analytics surface for worker coverage, claims, fraud, and risk."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((item) => <MetricCard key={item.title} {...item} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <MinimalBarChart title="Risk distribution" subtitle="Current worker exposure mix" data={riskDistribution} />
        <MinimalPieChart title="Claims funnel" subtitle="Approval status mix" data={claimStatusBreakdown} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="overflow-hidden p-0">
          <div className="border-b border-white/10 px-6 py-5">
            <p className="text-sm text-zinc-500">Workers</p>
            <h3 className="mt-1 text-xl font-semibold text-white">Recent worker activity</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Worker</th>
                <th className="px-6 py-4 font-medium">City</th>
                <th className="px-6 py-4 font-medium">Policy</th>
                <th className="px-6 py-4 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {adminWorkers.map((worker) => (
                <tr key={worker.id} className="border-t border-white/10 text-zinc-300">
                  <td className="px-6 py-4">{worker.name}</td>
                  <td className="px-6 py-4">{worker.city}</td>
                  <td className="px-6 py-4">{worker.policy}</td>
                  <td className="px-6 py-4">{worker.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Fraud alerts</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Priority review queue</h3>
            </div>
            <StatusBadge status="High" />
          </div>
          <div className="mt-6 space-y-4">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white">{alert.title}</p>
                  <StatusBadge status={alert.severity} />
                </div>
                <p className="mt-3 text-sm text-zinc-400">{alert.worker}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-600">{alert.time}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
