"use client";

import { format } from "date-fns";

interface BookingSummaryProps {
  startDate: Date;
  endDate: Date;
  numberOfTables: number;
  tablePricePerDay: number;
  monthlyDiscountPercent: number;
}

function Summary({
  startDate,
  endDate,
  numberOfTables,
  tablePricePerDay,
  monthlyDiscountPercent,
}: BookingSummaryProps) {
  const totalDays =
    Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000) + 1;

  const basePrice = totalDays * numberOfTables * tablePricePerDay;

  const isMonthly = totalDays >= 30;

  const discountAmount = isMonthly
    ? (basePrice * monthlyDiscountPercent) / 100
    : 0;

  const finalPrice = basePrice - discountAmount;

  return (
    <div className="rounded-xl border border-onyx/12 bg-onyx/5 p-4 text-sm space-y-2">
      <p className="text-xs font-semibold text-onyx/50 uppercase tracking-wide mb-2">
        Booking Summary
      </p>

      <div className="flex justify-between text-onyx/65 text-xs">
        <span>Dates</span>

        <span className="font-medium text-onyx">
          {format(startDate, "dd MMM yyyy")} – {format(endDate, "dd MMM yyyy")}
        </span>
      </div>

      <div className="flex justify-between text-onyx/65 text-xs">
        <span>Duration</span>

        <span className="font-medium text-onyx">
          {totalDays} {totalDays === 1 ? "day" : "days"}
        </span>
      </div>

      <div className="flex justify-between text-onyx/65 text-xs">
        <span>Tables</span>

        <span className="font-medium text-onyx">{numberOfTables}</span>
      </div>

      <div className="flex justify-between text-onyx/65 text-xs">
        <span>Rate</span>

        <span className="font-medium text-onyx">
          €{tablePricePerDay} / table / day
        </span>
      </div>

      {isMonthly && (
        <div className="flex justify-between text-onyx/65 text-xs">
          <span>Discount</span>

          <span className="font-medium text-dried-mustard">
            -{monthlyDiscountPercent}%
          </span>
        </div>
      )}

      <div className="border-t border-onyx/12 pt-2.5 flex justify-between items-center">
        <span className="font-semibold text-onyx text-sm">Total</span>

        <span className="text-dried-mustard font-bold text-base">
          €{finalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Summary;
