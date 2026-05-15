import {
  bookingStatusCancelReasonMap,
  bookingStatusMap,
  budgetMap,
} from "../constants/Navigation";

export default function formattedDate(isoString?: Date | string) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formattedTime(isoString: Date) {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function formatMonth(date: Date) {
  return date.toISOString().slice(0, 7);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US").format(price);
}

export function formatBudgetRange(value?: string | null): string {
  if (!value) return "-";
  return budgetMap[value] || value;
}

export function formatBookingStatus(value?: string | null): string {
  if (!value) return "-";
  return bookingStatusMap[value] || value;
}

export function formatBookingStatusCancelReason(value?: string | null): string {
  if (!value) return "-";
  return bookingStatusCancelReasonMap[value] || value;
}
