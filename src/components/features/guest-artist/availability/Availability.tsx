"use client";

import { useFormContext } from "react-hook-form";
import DatePickerField from "@/components/ui/DatePickerField";
import SelectBox from "@/components/ui/SelectBox";
import { GuestArtistBookingAppointment } from "@/components/schema & types/guest-artist/guest-artist.schema";
import { useEffect } from "react";
import useGuestArtistBooking from "../useGuestArtistBooking";
import { format } from "date-fns";

interface AvailabilityProps {
  onNext: () => void;
}

function Availability({ onNext }: AvailabilityProps) {
  const {
    control,
    register,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useFormContext<GuestArtistBookingAppointment>();

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const range = watch("dateRange");

  const {
    tableAvailability,
    tableAvailabilityIsError,
    tableAvailabilityIsLoading,
  } = useGuestArtistBooking({ startDate, endDate });

  const maxTablesAvailable =
    tableAvailability?.length > 0
      ? Math.min(...tableAvailability.map((d) => d.availableTables))
      : 0;

  useEffect(() => {
    setValue("numberOfTables", 1);
  }, [maxTablesAvailable, setValue]);

  useEffect(() => {
    if (range?.from) {
      setValue("startDate", range.from, {
        shouldValidate: true,
      });
    }

    if (range?.to) {
      setValue("endDate", range.to, {
        shouldValidate: true,
      });
    }
  }, [range, setValue]);

  const disabledDates =
    tableAvailability
      ?.filter((d) => d.availableTables === 0)
      .map((d) => {
        const [y, m, day] = d.date.split("-");

        return new Date(Number(y), Number(m) - 1, Number(day));
      }) || [];

  const isDateSelected = startDate && endDate;

  const tableOptions =
    maxTablesAvailable > 0
      ? Array.from({ length: maxTablesAvailable }, (_, i) => ({
          id: i + 1,
          label: `${i + 1} Table${i + 1 > 1 ? "s" : ""}`,
          value: String(i + 1),
        }))
      : [];

  return (
    <div
      className={`flex flex-col gap-4 ${
        tableAvailabilityIsLoading && "opacity-70 pointer-events-none"
      }`}
    >
      <DatePickerField<GuestArtistBookingAppointment>
        label="Select Dates"
        name={"dateRange" as any}
        control={control}
        errors={undefined}
        mode="range"
        disablePast
        disabledDates={disabledDates}
        excludeDays={[0]}
        inline
      />

      {!range?.from ? (
        <p className="text-center text-xs text-onyx/45">
          Select a start date on the calendar
        </p>
      ) : !range.to || range.from.getTime() === range.to.getTime() ? (
        <p className="text-center text-xs text-onyx/60">
          <span className="font-medium text-onyx">
            {format(range.from, "dd MMM yyyy")}
          </span>

          <span className="text-onyx/30 mx-1.5">→</span>

          <span className="text-onyx/40 italic">pick an end date</span>
        </p>
      ) : (
        <p className="text-center text-xs text-onyx/60">
          <span className="font-medium text-onyx">
            {format(range.from, "dd MMM yyyy")}
          </span>

          <span className="text-onyx/30 mx-1.5">→</span>

          <span className="font-medium text-onyx">
            {format(range.to, "dd MMM yyyy")}
          </span>
        </p>
      )}

      {isDateSelected && (
        <div className="rounded-lg border border-onyx/12 bg-onyx/5 px-3 py-2 text-xs">
          {tableAvailabilityIsLoading ? (
            <span className="text-onyx/45">Checking availability...</span>
          ) : tableAvailabilityIsError ? (
            <span className="text-red-500">Could not load availability.</span>
          ) : maxTablesAvailable > 0 ? (
            <span className="text-onyx">
              <span className="font-semibold text-dried-mustard">
                {maxTablesAvailable}
              </span>{" "}
              {maxTablesAvailable === 1 ? "table" : "tables"} available
            </span>
          ) : (
            <span className="text-red-500">No tables available.</span>
          )}
        </div>
      )}

      <SelectBox<GuestArtistBookingAppointment>
        label="Number of Tables"
        name="numberOfTables"
        register={register}
        errors={errors.numberOfTables}
        options={tableOptions}
        disabled={
          !isDateSelected ||
          tableAvailabilityIsLoading ||
          maxTablesAvailable === 0
        }
      />

      <button
        type="button"
        onClick={onNext}
        disabled={!isDateSelected || maxTablesAvailable === 0}
        className="submit-btn"
      >
        Continue
      </button>
    </div>
  );
}

export default Availability;
