import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/ui/button";
import { workerClaims } from "@/utils/mockData";
import { formatCurrency } from "@/utils/formatters";

export default function AdminClaims() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Claims review"
        title="Approve or reject claims from a clean review surface"
        description="Compact rows, clear status badges, and decisive actions."
      />
      <div className="space-y-4">
        {workerClaims.map((claim) => (
          <Panel key={claim.id} className="p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-semibold text-white">{claim.id}</p>
                  <StatusBadge status={claim.status} />
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{claim.reason}</p>
                <div className="mt-4 flex gap-5 text-sm text-zinc-500">
                  <span>Date: {claim.date}</span>
                  <span>Amount: {formatCurrency(claim.amount)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary">Reject</Button>
                <Button variant="primary">Approve</Button>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
