import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import { adminWorkers } from "@/utils/mockData";

export default function AdminWorkers() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Workers"
        title="Monitor insured workers in one focused table"
        description="A minimal admin view for city, policy, risk score, and claim count."
      />
      <Panel className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-zinc-500">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">City</th>
              <th className="px-6 py-4 font-medium">Policy</th>
              <th className="px-6 py-4 font-medium">Risk</th>
              <th className="px-6 py-4 font-medium">Claims</th>
            </tr>
          </thead>
          <tbody>
            {adminWorkers.map((worker) => (
              <tr key={worker.id} className="border-t border-white/10 text-zinc-300">
                <td className="px-6 py-4">{worker.id}</td>
                <td className="px-6 py-4">{worker.name}</td>
                <td className="px-6 py-4">{worker.city}</td>
                <td className="px-6 py-4">{worker.policy}</td>
                <td className="px-6 py-4">{worker.risk}</td>
                <td className="px-6 py-4">{worker.claims}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
