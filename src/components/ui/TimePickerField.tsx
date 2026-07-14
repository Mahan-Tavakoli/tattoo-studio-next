"use client";

import { Control, Controller, FieldError, Path } from "react-hook-form";

interface TimePickerFieldProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  errors?: FieldError;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  step?: number;
  isDark?: boolean;
}

function TimePickerField<T extends Record<string, any>>({
  label,
  name,
  control,
  errors,
  required,
  disabled,
  min,
  max,
  step = 300, // 5 minutes
  isDark = false,
}: TimePickerFieldProps<T>) {
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <input
              {...field}
              type="time"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              placeholder=" "
              className={`peer block w-full rounded-lg border bg-transparent px-3 pb-2.5 pt-4 text-sm outline-none transition-all duration-300

              ${
                isDark
                  ? "border-alabaster/50 text-snow hover:border-alabaster focus:border-alabaster"
                  : "border-onyx/50 text-onyx hover:border-onyx focus:border-onyx"
              }

              disabled:cursor-not-allowed
              disabled:opacity-50`}
            />

            <label
              className={`pointer-events-none absolute inset-s-1 top-1.5 z-10 origin-left -translate-y-4 scale-75 px-2 text-sm opacity-75 transition-all duration-300

              peer-placeholder-shown:top-1/2
              peer-placeholder-shown:-translate-y-1/2
              peer-placeholder-shown:scale-100

              peer-focus:top-1.5
              peer-focus:-translate-y-4
              peer-focus:scale-75

              ${isDark ? "bg-carbon-black" : "bg-alabaster"}`}
            >
              {label}

              {required && <span className="ml-1 text-red-700">*</span>}
            </label>
          </>
        )}
      />

      {errors && <p className="mt-1 text-xs text-red-700">{errors.message}</p>}
    </div>
  );
}

export default TimePickerField;
