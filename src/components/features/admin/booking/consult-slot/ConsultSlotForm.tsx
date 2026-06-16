"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useConsultSlot from "./useConsultSlot";
import {
  ConsultSlotFormValues,
  consultSlotSchema,
} from "@/components/schema & types/consultSlot/consultSlot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePickerField from "@/components/ui/DatePickerField";
import InputField from "@/components/ui/InputField";
import DotsLoader from "@/components/ui/DotsLoader";
import { getDatesInRange } from "@/components/utils/formatter";
import { useTranslations } from "next-intl";

interface ConsultSlotFormProps {
  onClose: () => void;
}

function ConsultSlotForm({ onClose }: ConsultSlotFormProps) {
  const t = useTranslations("admin.bookings.consultSlot");
  const { createConsultSlot, createConsultSlotIsPending } = useConsultSlot();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<ConsultSlotFormValues>({
    mode: "onChange",
    resolver: zodResolver(consultSlotSchema) as any,
  });

  const onSubmit: SubmitHandler<ConsultSlotFormValues> = (data) => {
    const dates = getDatesInRange(data.dateRange.from, data.dateRange.to);

    const newConsultSlot = {
      dates: dates,
      maxCount: data.maxCount,
    };

    createConsultSlot(newConsultSlot);
    reset();
    onClose();
  };

  return (
    <form
      className="grid grid-cols-1 items-center justify-center gap-5 md:gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <>
        {/* Dates */}
        <DatePickerField<ConsultSlotFormValues>
          control={control}
          errors={errors.dateRange as any}
          label={t("form.dates")}
          name="dateRange"
          disablePast
          excludeDays={[0]}
          required
          inline
          mode="range"
        />
        {/* Max Count */}
        <InputField<ConsultSlotFormValues>
          label={t("form.maxCount")}
          name="maxCount"
          errors={errors.maxCount}
          register={register}
          required
          type="tel"
        />
      </>

      <button
        type="submit"
        disabled={createConsultSlotIsPending || !isValid}
        className="submit-btn"
      >
        {createConsultSlotIsPending ? (
          <>
            {t("form.creating")} <DotsLoader />
          </>
        ) : (
          t("form.create")
        )}
      </button>
    </form>
  );
}

export default ConsultSlotForm;
