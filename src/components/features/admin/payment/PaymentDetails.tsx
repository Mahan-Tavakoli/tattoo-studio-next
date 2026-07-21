"use client";

import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { PaymentInfo } from "@/components/schema & types/payment/payment.types";
import { formatEuro } from "@/components/utils/formatter";
import {
  paymentMethodMap,
  paymentSourceMap,
  paymentStatusColorMap,
  paymentStatusMap,
} from "./payment.constants";

interface PaymentDetailsProps {
  payment: PaymentInfo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function Item({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-snow/10 bg-card p-4">
      <p className="mb-1 text-xs tracking-wide text-snow/50">{label}</p>

      <p className="break-words font-medium text-snow">{value}</p>
    </div>
  );
}

function PaymentDetails({ payment, open, onOpenChange }: PaymentDetailsProps) {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] lg:min-w-3xl max-w-4xl overflow-hidden p-0">
        <DialogHeader className="border-b border-snow/10 px-6 py-5">
          <DialogTitle className="text-xl text-snow/75">
            Payment Details
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
          {/* Customer */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-snow/60">
              Customer Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <Item label="Customer" value={payment.context.customerName} />

              <Item label="Email" value={payment.context.customerEmail} />
            </div>
          </section>

          {/* Payment */}
          <section className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-snow/60">
              Payment Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <Item label="Source" value={paymentSourceMap[payment.source]} />

              <Item label="Method" value={paymentMethodMap[payment.method]} />

              <Item
                label="Status"
                value={
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${paymentStatusColorMap[payment.status]}`}
                  >
                    {paymentStatusMap[payment.status]}
                  </span>
                }
              />

              <Item label="Currency" value={payment.currency} />

              <Item
                label="Gross Amount"
                value={formatEuro(payment.grossCents)}
              />

              <Item label="Net Amount" value={formatEuro(payment.netCents)} />

              <Item
                label="VAT Amount"
                value={formatEuro(payment.vatAmountCents)}
              />

              <Item label="VAT Rate" value={`${payment.vatRateBps / 100}%`} />

              <Item
                label="Paid At"
                value={format(new Date(payment.paidAt), "dd MMM yyyy • HH:mm")}
              />

              <Item
                label="Refunded At"
                value={
                  payment.refundedAt
                    ? format(
                        new Date(payment.refundedAt),
                        "dd MMM yyyy • HH:mm",
                      )
                    : "—"
                }
              />
              <Item
                label="Refunded Amount"
                value={formatEuro(payment.refundedAmountCents)}
              />
            </div>
          </section>

          {/* Extra */}
          <section className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-snow/60">
              Additional Information
            </h3>

            <div className="space-y-4">
              <Item label="Note" value={payment.note || "—"} />
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDetails;
