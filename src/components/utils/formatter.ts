import { format, set } from "date-fns";
import {
  bookingStatusCancelReasonMap,
  bookingStatusMap,
  budgetMap,
} from "../constants/Constants";

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

export function formatDate(date?: Date) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

export function formatMonth(date?: Date) {
  if (!date) return "";
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

export function getDatesInRange(start: Date, end: Date) {
  const dates: string[] = [];

  const current = new Date(start);

  while (current <= end) {
    dates.push(format(current, "yyyy-MM-dd"));

    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export function formatEuro(cents?: number | null) {
  if (cents == null) return "-";

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function mergeDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return set(date, {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  }).toISOString();
}
