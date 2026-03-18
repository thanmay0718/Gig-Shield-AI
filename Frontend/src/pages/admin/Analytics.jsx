import { MinimalBarChart, MinimalPieChart } from "@/components/ChartCard";
import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import { claimStatusBreakdown, riskDistribution } from "@/utils/mockData";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Analytics"
        title="Minimal charts for high-signal decisions"
        description="Only the analytics that matter: risk mix and claim outcome mix."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <MinimalBarChart title="Risk bands" subtitle="Distribution of workers by risk" data={riskDistribution} />
        <MinimalPieChart title="Claim outcomes" subtitle="Approved vs pending vs rejected" data={claimStatusBreakdown} />
      </div>
      <Panel className="p-6">
        <p className="text-sm leading-7 text-zinc-400">
          This analytics view intentionally avoids chart overload. The goal is fast platform comprehension.
        </p>
      </Panel>
    </div>
  );
}
