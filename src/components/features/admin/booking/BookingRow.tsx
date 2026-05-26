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

interface BookingRowProps {
  index: number;
  onEdit: () => void;
  onCheckIn: () => void;
  booking: BookingInfo;
}

function BookingRow({ booking, index, onEdit, onCheckIn }: BookingRowProps) {
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>
        {booking.client.firstName} {booking.client.lastName}
      </td>
      <td>
        <a
          href={`email:${booking.client.email}`}
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
          View Details
        </Link>
      </td>
      <td>
        <div className="flex items-center justify-center gap-x-2">
          {booking?.status == "CANCELLED" ||
          booking?.status === "COMPLETED" ||
          booking?.status === "CONSULT_NO_SHOW" ? (
            <span className="gap-x-2">
              {/* No Operation -
            {booking?.status === "CANCELLED"
              ? "Booking Cancelled"
              : booking?.status === "COMPLETED"
                ? "Booking Completed"
                : "Client Not Show"} */}
              -
            </span>
          ) : (
            <>
              <button
                className="flex items-center justify-center size-9 rounded-xl border border-snow/10 hover:bg-black bg-onyx text-snow/75 text-center transition-all duration-300 hover:border-snow/25"
                onClick={onCheckIn}
              >
                <CircleCheck className="size-5" />
              </button>

              <button
                className="flex items-center justify-center size-9 rounded-xl border border-snow/10 hover:bg-black bg-onyx text-snow/75 text-center transition-all duration-300 hover:border-snow/25"
                onClick={onEdit}
              >
                <CiEdit className="size-5" />
              </button>
            </>
          )}
        </div>
      </td>
    </Table.Row>
  );
}

export default BookingRow;
