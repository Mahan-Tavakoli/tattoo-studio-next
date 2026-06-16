import {
  BookingInfo,
  BookingStatus,
} from "@/components/schema & types/booking/booking-appointment.types";
import { bookingStatusStyles } from "@/components/templates/admin/booking/bookingStatusStyles";
import StatusBadge from "@/components/templates/admin/StatusBadge";
import Table from "@/components/ui/Table";
import formattedDate, { formatBudgetRange } from "@/components/utils/formatter";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { useTranslations } from "next-intl";

interface BookingRowProps {
  index: number;
  onEdit: () => void;
  booking: BookingInfo;
}

function BookingRow({ booking, index, onEdit }: BookingRowProps) {
  const t = useTranslations("admin.bookings.row");
  return (
    <Table.Row>
      <td>{index}</td>
      <td>
        {booking.client.firstName} {booking.client.lastName}
      </td>
      <td>
        <a
          href={`mailto:${booking.client.email}`}
          className="btn text-xs mx-auto"
        >
          {booking.client.email}
        </a>
      </td>
      <td>
        <a href={`tel:${booking.client.phone}`} className="btn text-xs mx-auto">
          {booking.client.phone}
        </a>
      </td>
      <td>
        <StatusBadge status={booking.status} styles={bookingStatusStyles} />
      </td>
      <td>{formatBudgetRange(booking.budgetRange)}</td>
      <td>{formattedDate(booking.consultDate)}</td>
      <td>
        <Link href={`/admin/booking/${booking.id}`} className="btn">
          {t("viewDetails")}
        </Link>
      </td>
      <td>
        <div className="flex items-center justify-center gap-x-2">
          {booking?.status == "CANCELLED" ||
          booking?.status === "COMPLETED" ||
          booking?.status === "CONSULT_NO_SHOW" ? (
            <span className="gap-x-2">
              <span className="text-xs text-snow/50">
                {booking.status === "CANCELLED"
                  ? t("bookingCancelled")
                  : booking.status === "COMPLETED"
                    ? t("bookingCompleted")
                    : t("clientNoShow")}
              </span>
            </span>
          ) : (
            <button
              className="flex items-center justify-center size-9 rounded-xl border border-snow/10 hover:bg-black bg-onyx text-snow/75 text-center transition-all duration-300 hover:border-snow/25"
              onClick={onEdit}
            >
              <CiEdit className="size-5" />
            </button>
          )}
        </div>
      </td>
    </Table.Row>
  );
}

export default BookingRow;
