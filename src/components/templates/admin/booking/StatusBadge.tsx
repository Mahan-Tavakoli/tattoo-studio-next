import { BookingStatus } from "@/components/schema & types/booking/booking-appointment.types";
import { bookingStatusStyles } from "./statusStyles";

interface StatusBadgeProps {
  status: BookingStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const config = bookingStatusStyles[status];

  if (!config) return null;

  return (
    <div
      className={`px-4 py-2 text-xs font-medium rounded-lg border flex items-center justify-between gap-x-3 ${config.className}`}
    >
      <span>{config.label}</span>
      <span>{config.icon}</span>
    </div>
  );
}

export default StatusBadge;

/* <div
  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
>
  {status.icon}
  <span>{status.label}</span>
</div> */
