import { useCallback, useMemo, useState } from "react";

import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Progress from "@/components/ui/progress";
import Textarea from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { useApiResource } from "@/hooks/useApiResource";
import { createClaim, getClaims, getPolicies } from "@/services/api";
import { policyPlans, workerClaims } from "@/utils/mockData";
import { formatCurrency } from "@/utils/formatters";

const steps = ["Select policy", "Claim details", "Submit"];

export default function WorkerClaims() {
  const [currentStep, setCurrentStep] = useState(2);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    policyId: "pro",
    title: "",
    description: "",
    amount: "",
  });

  const fetchClaims = useCallback(async () => {
    const response = await getClaims();
    return Array.isArray(response) && response.length ? response : workerClaims;
  }, []);

  const fetchPolicies = useCallback(async () => {
    const response = await getPolicies();
    return Array.isArray(response) && response.length ? response : policyPlans;
  }, []);

  const { data: claims, setData: setClaims } = useApiResource(fetchClaims, workerClaims);
  const { data: policies } = useApiResource(fetchPolicies, policyPlans);
  const progressValue = useMemo(() => (currentStep / steps.length) * 100, [currentStep]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await createClaim({
        policyId: form.policyId,
        title: form.title,
        description: form.description,
        amount: Number(form.amount),
      });
      setClaims((current) => [
        { id: `CLM-${Math.floor(Math.random() * 9000) + 1000}`, reason: form.title, date: "Today", amount: Number(form.amount), status: "Pending" },
        ...current,
      ]);
      toast.success("Claim submitted successfully");
      setCurrentStep(3);
      setForm({ policyId: form.policyId, title: "", description: "", amount: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Claims"
        title="Submit and monitor claims with less friction"
        description="A simple multi-step form with readable status states."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Claim progress</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Three-step submission</h3>
            </div>
            <p className="text-sm text-zinc-500">Step {currentStep} of {steps.length}</p>
          </div>
          <div className="mt-6"><Progress value={progressValue} /></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">0{index + 1}</p>
                <p className="mt-2 text-sm text-white">{step}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <select
              value={form.policyId}
              onChange={(e) => {
                setForm((cur) => ({ ...cur, policyId: e.target.value }));
                setCurrentStep(1);
              }}
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
            >
              {policies.map((policy) => <option key={policy.id} value={policy.id}>{policy.name}</option>)}
            </select>
            <Input
              placeholder="Claim title"
              value={form.title}
              onChange={(e) => {
                setForm((cur) => ({ ...cur, title: e.target.value }));
                setCurrentStep(2);
              }}
            />
            <Input
              placeholder="Claim amount"
              value={form.amount}
              onChange={(e) => setForm((cur) => ({ ...cur, amount: e.target.value }))}
            />
            <Textarea
              rows={5}
              placeholder="Describe what happened"
              value={form.description}
              onChange={(e) => setForm((cur) => ({ ...cur, description: e.target.value }))}
            />
            <Button type="submit" className="w-full">{submitting ? "Submitting..." : "Submit Claim"}</Button>
          </form>
        </Panel>

        <Panel className="p-6">
          <p className="text-sm text-zinc-500">Latest submissions</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Claim status</h3>
          <div className="mt-6 space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{claim.reason}</p>
                    <p className="mt-1 text-sm text-zinc-500">{claim.date}</p>
                  </div>
                  <StatusBadge status={claim.status} />
                </div>
                <p className="mt-4 text-sm text-zinc-400">Claim amount: <span className="text-white">{formatCurrency(claim.amount)}</span></p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
