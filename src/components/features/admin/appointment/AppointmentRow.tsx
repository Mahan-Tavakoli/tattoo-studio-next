import { AppointmentInfo } from "@/components/schema & types/appointment/appointment.types";
import { bookingStatusStyles } from "@/components/templates/admin/booking/bookingStatusStyles";
import StatusBadge from "@/components/templates/admin/StatusBadge";
import Table from "@/components/ui/Table";
import formattedDate from "@/components/utils/formatter";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

interface AppointmentRowProps {
  index: number;
  onCheckIn: () => void;
  appointment: AppointmentInfo;
}

function AppointmentRow({
  appointment,
  index,
  onCheckIn,
}: AppointmentRowProps) {
  return (
    <Table.Row>
      <td>{index}</td>
      <td>
        {appointment.booking.client.firstName}{" "}
        {appointment.booking.client.lastName}
      </td>
      <td>{formattedDate(appointment.scheduledFor)}</td>
      <td>
        <StatusBadge
          status={appointment.booking.status}
          styles={bookingStatusStyles}
        />
      </td>
      <td>
        <Link href={`/admin/booking/${appointment.booking.id}`} className="btn">
          Details
        </Link>
      </td>
      <td>
        <div className="flex items-center justify-center gap-x-2">
          {appointment.booking.checkedInAt ? (
            <div className="flex flex-col items-center text-xs">
              <span className="text-green-500 font-medium">Checked In</span>

              <span className="text-snow/60">
                {formattedDate(appointment.booking.checkedInAt)}
              </span>
            </div>
          ) : (
            <button
              className="flex items-center justify-center size-9 rounded-xl border border-snow/10 hover:bg-black bg-onyx text-snow/75 text-center transition-all duration-300 hover:border-snow/25"
              onClick={onCheckIn}
            >
              <CircleCheck className="size-5" />
            </button>
          )}
        </div>
      </td>
    </Table.Row>
  );
}

export default AppointmentRow;
