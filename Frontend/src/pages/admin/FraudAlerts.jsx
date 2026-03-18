import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { fraudAlerts } from "@/utils/mockData";

export default function FraudAlerts() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Fraud alerts"
        title="A restrained queue for suspicious patterns"
        description="Readable, triage-ready fraud alerts with severity and worker context."
      />
      <div className="grid gap-4">
        {fraudAlerts.map((alert) => (
          <Panel key={alert.id} className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-base font-semibold text-white">{alert.title}</p>
                  <StatusBadge status={alert.severity} />
                </div>
                <p className="mt-3 text-sm text-zinc-400">Worker: {alert.worker}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">{alert.time}</p>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
