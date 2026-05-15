import { GuestArtistStatus } from "@/components/schema & types/guest-artist/guest-artist.types";

import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";

import { LuBadgeCheck } from "react-icons/lu";

export const guestArtistStatusStyles: Record<
  GuestArtistStatus,
  {
    label: string;
    className: string;
    icon: React.ReactNode;
  }
> = {
  PENDING_PAYMENT: {
    label: "Pending Payment",
    className: "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    icon: <HiOutlineClock className="w-4 h-4" />,
  },

  CONFIRMED: {
    label: "Confirmed",
    className: "border border-blue-500/20 bg-blue-500/10 text-blue-400",
    icon: <HiOutlineCheckCircle className="w-4 h-4" />,
  },

  NO_SHOW: {
    label: "No Show",
    className: "border border-orange-500/20 bg-orange-500/10 text-orange-400",
    icon: <HiOutlineXCircle className="w-4 h-4" />,
  },

  EXPIRED: {
    label: "Expired",
    className: "border border-red-500/20 bg-red-500/10 text-red-400",
    icon: <HiOutlineXCircle className="w-4 h-4" />,
  },

  COMPLETED: {
    label: "Completed",
    className: "border border-green-500/20 bg-green-500/10 text-green-400",
    icon: <LuBadgeCheck className="w-4 h-4" />,
  },
};
