"use client";

import { PaymentsFilterForm } from "@/components/schema & types/payment/payment.types";
import DatePickerField from "@/components/ui/DatePickerField";
import SelectBox from "@/components/ui/SelectBox";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PaymentFiltersProps {
  defaultValues: PaymentsFilterForm;
  onSubmit: (values: PaymentsFilterForm) => void;
}

const paymentSourceOptions = [
  { id: 1, value: "", label: "All Payments" },
  { id: 2, value: "VOUCHER", label: "Voucher" },
  { id: 3, value: "TATTOO", label: "Tattoo Sessions" },
  { id: 4, value: "GUEST_TABLE", label: "Guest Artists" },
];
const paymentMethodOptions = [
  { id: 1, value: "", label: "All Methods" },
  { id: 2, value: "LINK", label: "Link" },
  { id: 3, value: "CASH", label: "Cash" },
];
const paymentStatusOptions = [
  { id: 1, value: "", label: "All Statuses" },
  { id: 2, value: "PAID", label: "Paid" },
  { id: 3, value: "CANCELLED", label: "Cancelled" },
  { id: 4, value: "REFUNDED", label: "Refunded" },
];

function PaymentFilters({ defaultValues, onSubmit }: PaymentFiltersProps) {
  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm<PaymentsFilterForm>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const from = watch("from");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-xl border border-snow/20 bg-card p-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <DatePickerField
          label="From"
          name="from"
          control={control}
          errors={errors.from}
          disableFuture
          isDark
        />

        <DatePickerField
          label="To"
          name="to"
          control={control}
          errors={errors.to}
          disableFuture
          minDate={from}
          isDark
        />

        <SelectBox
          label="Source"
          name="source"
          register={register}
          errors={errors.source}
          options={paymentSourceOptions}
          isDark
        />
        <SelectBox
          label="Method"
          name="method"
          register={register}
          errors={errors.method}
          options={paymentMethodOptions}
          isDark
        />
        <SelectBox
          label="Statuse"
          name="status"
          register={register}
          errors={errors.status}
          options={paymentStatusOptions}
          isDark
        />

        <div className="flex items-end">
          <button type="submit" className="submit-btn h-11 w-full">
            Refresh
          </button>
        </div>
      </div>
    </form>
  );
}

export default PaymentFilters;
