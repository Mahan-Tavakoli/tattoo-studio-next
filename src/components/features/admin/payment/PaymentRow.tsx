import { PaymentInfo } from "@/components/schema & types/payment/payment.types";
import {
  paymentMethodMap,
  paymentSourceMap,
  paymentStatusColorMap,
  paymentStatusMap,
} from "@/components/features/admin/payment/payment.constants";
import Table from "@/components/ui/Table";
import formattedDate, { formatEuro } from "@/components/utils/formatter";
import { EyeIcon } from "lucide-react";

interface PaymentRowProps {
  payment: PaymentInfo;
  index: number;
  onView?: (payment: PaymentInfo) => void;
}

function PaymentRow({ payment, index, onView }: PaymentRowProps) {
  return (
    <Table.Row>
      <td>{index}</td>

      <td>
        <div className="flex flex-col">
          <span className="font-medium">{payment.context.customerName}</span>

          <span className="text-xs text-snow/60">
            {payment.context.customerEmail}
          </span>
        </div>
      </td>

      <td>{paymentSourceMap[payment.source]}</td>

      <td>{paymentMethodMap[payment.method]}</td>

      <td>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            paymentStatusColorMap[payment.status]
          }`}
        >
          {paymentStatusMap[payment.status]}
        </span>
      </td>

      <td>{formatEuro(payment.grossCents)}</td>

      <td>{formatEuro(payment.netCents)}</td>

      <td>{formattedDate(payment?.paidAt)}</td>

      <td>
        <button onClick={() => onView?.(payment)} className="p-1.5 btn">
          <EyeIcon className="size-5" />
        </button>
      </td>
    </Table.Row>
  );
}

export default PaymentRow;
