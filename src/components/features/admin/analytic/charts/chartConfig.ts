import { ChartConfig } from "@/components/ui/chart";

const colors = {
  brand: "#F38D02", // Dried Mustard
  onyx: "#111111",
  snow: "#FFFAFA",
  alabaster: "#E5E4E2",

  blue: "#2563EB",
  emerald: "#10B981",
  red: "#EF4444",
  violet: "#8B5CF6",
  cyan: "#06B6D4",

  instagram: "#E1306C",
  facebook: "#1877F2",
  google: "#34A853",
  tiktok: "#111111",
};

export const bookingSourceConfig = {
  DIRECT: {
    label: "Direct",
    color: colors.brand,
  },

  INSTAGRAM: {
    label: "Instagram",
    color: colors.instagram,
  },

  FACEBOOK: {
    label: "Facebook",
    color: colors.facebook,
  },

  GOOGLE: {
    label: "Google",
    color: colors.google,
  },

  TIKTOK: {
    label: "TikTok",
    color: colors.onyx,
  },
} satisfies ChartConfig;

export const bookingTypeConfig = {
  CONSULTATION: {
    label: "Consultation",
    color: colors.brand,
  },

  APPOINTMENT: {
    label: "Appointment",
    color: colors.blue,
  },

  COVER_UP: {
    label: "Cover Up",
    color: colors.violet,
  },

  TOUCH_UP: {
    label: "Touch Up",
    color: colors.emerald,
  },

  REMOVAL: {
    label: "Removal",
    color: colors.red,
  },
} satisfies ChartConfig;

export const bookingStatusConfig = {
  approved: {
    label: "Approved",
    color: colors.blue,
  },

  completed: {
    label: "Completed",
    color: colors.emerald,
  },

  cancelled: {
    label: "Cancelled",
    color: colors.red,
  },

  noShow: {
    label: "No Show",
    color: colors.brand,
  },
} satisfies ChartConfig;
