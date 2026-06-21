"use client";

import { Control, Controller, FieldError, Path } from "react-hook-form";
import { DayPicker, Matcher, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useState } from "react";
import useOutsideClick from "@/components/hook/useOutsideClick";

interface DatePickerProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors: FieldError | undefined;
  required?: boolean;
  mode?: "single" | "range";
  disablePast?: boolean;
  disableFuture?: boolean;
  excludeDays?: number[];
  disabledDates?: Date[];
  minDate?: Date;
  currentMonth?: Date;
  onMonthChange?: (date: Date) => void;
  disabled?: boolean;
  inline?: boolean;
}

function DatePickerField<T extends Record<string, any>>({
  label,
  name,
  control,
  errors,
  required,
  mode = "single",
  disablePast,
  disableFuture,
  excludeDays,
  disabledDates,
  minDate,
  currentMonth,
  onMonthChange,
  disabled,
  inline = false,
}: DatePickerProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();
  const [internalMonthState, setInternalMonthState] = useState<Date>(
    new Date(),
  );

  const containerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const monthToUse = currentMonth ?? internalMonthState;
  const today = new Date();

  const disabledMatchers: Matcher[] = [];

  if (disablePast) disabledMatchers.push({ before: new Date() });

  if (disableFuture) disabledMatchers.push({ after: new Date() });

  if (excludeDays) {
    disabledMatchers.push({ dayOfWeek: excludeDays });
  }

  if (disabledDates?.length) {
    disabledMatchers.push(disabledDates);
  }

  if (minDate) {
    disabledMatchers.push({ before: minDate });
  }

  return (
    <div className="relative" ref={containerRef}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const handleInputClick = () => {
            const dateValue = value as any;

            if (dateValue instanceof Date) {
              if (onMonthChange) {
                onMonthChange(value);
              } else {
                setInternalMonthState(value);
              }
            }

            setIsOpen((prev) => !prev);
          };

          const handleSelect = (val: any) => {
            onChange(val);

            if (mode === "single") {
              setIsOpen(false);
              return;
            }

            if (mode === "range") {
              if (
                val?.from &&
                val?.to &&
                val.from.getTime() !== val.to.getTime()
              ) {
                setIsOpen(false);
              }
            }
          };

          const getDisplayValue = () => {
            if (!value) return "";

            if (mode === "single") {
              const dateValue = value as any;

              if (dateValue instanceof Date) {
                return format(dateValue, "PPP");
              }
            }

            if (mode === "range") {
              const range = value as DateRange;

              if (range?.from && range?.to) {
                return `${format(range.from, "dd MMM")} - ${format(range.to, "dd MMM")}`;
              }

              if (range?.from) {
                return `${format(range.from, "dd MMM")} - ...`;
              }
            }

            return "";
          };

          const isInlineRange = inline && mode === "range";

          const calendar = (
            <DayPicker
              captionLayout="dropdown"
              mode={mode as any}
              selected={value}
              onSelect={handleSelect}
              month={monthToUse}
              onDayMouseEnter={setHoveredDate}
              onMonthChange={(date) => {
                if (onMonthChange) {
                  onMonthChange(date);
                } else {
                  setInternalMonthState(date);
                }
              }}
              fromYear={disableFuture ? 1940 : undefined}
              toYear={disablePast ? today.getFullYear() + 1 : undefined}
              disabled={disabledMatchers.length ? disabledMatchers : undefined}
              modifiers={{
                range_preview:
                  mode === "range" && value?.from && !value?.to && hoveredDate
                    ? { from: value.from, to: hoveredDate }
                    : undefined,
              }}
              modifiersClassNames={{
                range_preview: "bg-dried-mustard/20",
              }}
              classNames={
                isInlineRange
                  ? {
                      // NEW INLINE RANGE STYLES
                      root: "w-full",
                      months: "w-full",
                      month: "w-full",
                      month_caption:
                        "flex justify-center pt-1 pb-2 relative items-center gap-1",
                      caption_label: "hidden",
                      dropdowns: "flex justify-center gap-2",
                      dropdown:
                        "px-2 py-1 rounded border border-alabaster/40 text-xs bg-onyx text-snow outline-none cursor-pointer appearance-none custom-select-arrow",
                      nav: "flex items-center",
                      button_previous:
                        "absolute left-4 top-4.5 z-30 h-6 w-6 flex items-center justify-center bg-snow/30 rounded-full hover:bg-snow/60 transition-colors",
                      button_next:
                        "absolute right-4 top-4.5 z-30 h-6 w-6 flex items-center justify-center bg-snow/30 rounded-full hover:bg-snow/60 transition-colors",
                      month_grid: "w-full border-collapse",
                      weekdays: "flex w-full",
                      weekday:
                        "flex-1 text-center text-snow/50 font-normal text-[11px] pb-1",
                      week: "flex w-full",
                      day: "flex-1 h-8 flex items-center justify-center text-xs text-snow/75 hover:bg-dried-mustard/20 hover:text-dried-mustard rounded-lg transition-colors cursor-pointer",
                      selected:
                        "bg-dried-mustard! text-onyx! hover:bg-dried-mustard hover:text-onyx",
                      range_start: "bg-dried-mustard! text-onyx! rounded-lg!",
                      range_end: "bg-dried-mustard! text-onyx! rounded-lg!",
                      range_middle:
                        "bg-dried-mustard/20! text-snow! rounded-none!",
                      today:
                        "text-dried-mustard! font-bold underline underline-offset-2",
                      outside: "text-snow/25 opacity-40",
                      disabled: "text-snow/20 opacity-25 cursor-not-allowed",
                      hidden: "invisible",
                    }
                  : {
                      // YOUR ORIGINAL STYLES (UNCHANGED)
                      months: "flex flex-col space-y-4",
                      month: "space-y-4",
                      month_caption:
                        "flex justify-center pt-1 relative items-center gap-1",
                      caption_label: "hidden",
                      dropdowns: "flex justify-center gap-2 z-20",
                      dropdown:
                        "p-1.5 rounded-sm border border-alabaster/50 text-xs bg-onyx text-snow hover:border-alabaster/75 focus:border-alabaster outline-none transition-all duration-200 cursor-pointer appearance-none custom-select-arrow",
                      nav: "flex items-center",
                      button_previous:
                        "absolute left-5 top-9 z-30 h-7 w-7 flex items-center p-1 justify-center hover:opacity-100 transition-all bg-snow/40 rounded-full hover:bg-snow/75 duration-200",
                      button_next:
                        "absolute right-5 top-9 z-30 h-7 w-7 flex items-center p-1 justify-center hover:opacity-100 transition-all bg-snow/40 rounded-full hover:bg-snow/75 duration-200",
                      month_grid: "w-full border-collapse space-y-1",
                      weekdays: "flex",
                      weekday:
                        "text-snow/75 rounded-md w-9 font-normal text-[0.8rem]",
                      week: "flex w-full mt-2",
                      day: "h-9 w-9 p-0 flex items-center justify-center text-sm font-normal text-snow/75 hover:bg-dried-mustard/20 hover:text-dried-mustard rounded-full transition-colors cursor-pointer",
                      selected:
                        "bg-dried-mustard! text-onyx! hover:bg-dried-mustard hover:text-onyx focus:bg-dried-mustard focus:text-onyx",
                      today:
                        "text-dried-mustard! underline underline-offset-4 font-semibold",
                      outside: "text-snow/40 opacity-50",
                      disabled: "text-snow/40 opacity-30 cursor-not-allowed",
                      hidden: "invisible",
                    }
              }
            />
          );

          return (
            <>
              {!inline && (
                <div className="relative">
                  <input
                    readOnly
                    value={getDisplayValue()}
                    onClick={handleInputClick}
                    placeholder=" "
                    disabled={disabled}
                    className="block w-full px-3 pb-2.5 pt-4 text-sm bg-transparent border border-onyx/50 hover:border-onyx/75 focus:border-onyx transition-all duration-300 cursor-pointer peer rounded-lg outline-none"
                  />

                  <label className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 opacity-75 origin-left bg-alabaster px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1 pointer-events-none transition-all">
                    <span>{label}</span>

                    {required && <span className="text-red-700 ml-1">*</span>}
                  </label>
                </div>
              )}

              {inline ? (
                <div className="rounded-xl bg-onyx px-2 py-3 w-full">
                  {calendar}
                </div>
              ) : (
                isOpen && (
                  <div className="absolute top-full left-0 mt-2 z-100 p-4 bg-onyx border border-alabaster/10 rounded-2xl">
                    {calendar}
                  </div>
                )
              )}
            </>
          );
        }}
      />

      {errors && <p className="text-red-700 text-xs mt-1">{errors.message}</p>}
    </div>
  );
}

export default DatePickerField;
