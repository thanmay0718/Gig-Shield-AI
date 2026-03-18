import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { paymentHistory } from "@/utils/mockData";
import { formatCurrency } from "@/utils/formatters";

export default function WorkerPayments() {
  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Payments"
        title="A simple ledger for policy payments"
        description="Review premium payments inside the same workspace."
      />
      <Panel className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-zinc-500">
            <tr>
              <th className="px-6 py-4 font-medium">Payment</th>
              <th className="px-6 py-4 font-medium">Plan</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="border-t border-white/10 text-zinc-300">
                <td className="px-6 py-4">{payment.id}</td>
                <td className="px-6 py-4">{payment.plan}</td>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">{formatCurrency(payment.amount)}</td>
                <td className="px-6 py-4"><StatusBadge status={payment.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
