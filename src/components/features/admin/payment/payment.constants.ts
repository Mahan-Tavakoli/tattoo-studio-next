import {
  PaymentMethod,
  PaymentSource,
  PaymentStatus,
} from "@/components/schema & types/payment/payment.types";

export const paymentSourceMap: Record<PaymentSource, string> = {
  VOUCHER: "Voucher",
  TATTOO: "Tattoo Session",
  GUEST_TABLE: "Guest Artist",
};

export const paymentMethodMap: Record<PaymentMethod, string> = {
  LINK: "Payment Link",
  CASH: "Cash",
};

export const paymentStatusMap: Record<PaymentStatus, string> = {
  PAID: "Paid",
  REFUNDED: "Refunded",
  CANCELLED: "Cancelled",
};

export const paymentStatusColorMap: Record<PaymentStatus, string> = {
  PAID: "bg-green-500/15 text-green-400",
  REFUNDED: "bg-yellow-500/15 text-yellow-400",
  CANCELLED: "bg-red-500/15 text-red-400",
};
