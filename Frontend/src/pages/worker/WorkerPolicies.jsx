import { useCallback, useMemo, useState } from "react";

import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useApiResource } from "@/hooks/useApiResource";
import { getPolicies } from "@/services/api";
import { policyPlans } from "@/utils/mockData";
import { formatCurrency } from "@/utils/formatters";

export default function WorkerPolicies() {
  const fetchPolicies = useCallback(async () => {
    const response = await getPolicies();
    return Array.isArray(response) && response.length ? response : policyPlans;
  }, []);

  const { data: policies } = useApiResource(fetchPolicies, policyPlans);
  const [activeId, setActiveId] = useState("pro");
  const activePlan = useMemo(() => policies.find((item) => item.id === activeId) || policies[0], [activeId, policies]);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Policies"
        title="Flexible protection plans for every earning band"
        description="Keep plan selection simple with clear premium, coverage, and duration."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 lg:grid-cols-3">
          {policies.map((policy) => (
            <Panel key={policy.id} className={`flex flex-col justify-between p-6 transition duration-300 hover:-translate-y-1 ${policy.recommended ? "border-sky-500/20 bg-sky-500/[0.05]" : ""}`}>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">{policy.name}</p>
                  {policy.recommended ? <StatusBadge status="Balanced" /> : null}
                </div>
                <p className="mt-6 text-4xl font-semibold text-white">{formatCurrency(policy.premium)}</p>
                <p className="mt-2 text-sm text-zinc-500">Premium per cycle</p>
                <div className="mt-8 space-y-4 text-sm text-zinc-400">
                  <div className="flex justify-between"><span>Coverage</span><span className="text-white">{formatCurrency(policy.coverage)}</span></div>
                  <div className="flex justify-between"><span>Duration</span><span className="text-white">{policy.duration}</span></div>
                </div>
              </div>
              <Button
                variant={policy.id === activeId ? "secondary" : "primary"}
                className="mt-8"
                onClick={() => {
                  setActiveId(policy.id);
                  toast.success(`${policy.name} selected`);
                }}
              >
                {policy.id === activeId ? "Selected" : "Buy Policy"}
              </Button>
            </Panel>
          ))}
        </div>

        <Panel className="p-6">
          <p className="text-sm text-zinc-500">Plan summary</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{activePlan?.name}</h3>
          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Premium</p>
              <p className="mt-2 text-white">{formatCurrency(activePlan?.premium)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Coverage</p>
              <p className="mt-2 text-white">{formatCurrency(activePlan?.coverage)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">Duration</p>
              <p className="mt-2 text-white">{activePlan?.duration}</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
