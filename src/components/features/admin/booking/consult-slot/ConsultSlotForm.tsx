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

interface ConsultSlotFormProps {
  onClose: () => void;
}

function ConsultSlotForm({ onClose }: ConsultSlotFormProps) {
  //const t = useTranslations("admin.bookings.updateStatus");
  const { createConsultSlot, createConsultSlotIsPending } = useConsultSlot();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<ConsultSlotFormValues>({
    mode: "onChange",
    resolver: zodResolver(consultSlotSchema) as any,
  });

  const onSubmit: SubmitHandler<ConsultSlotFormValues> = (data) => {
    const newConsultSlot = {
      dates: data.dates,
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
          errors={errors.dates as any}
          label="Dates"
          name="dates"
          disablePast
          excludeDays={[0]}
          required
        />
        {/* Max Count */}
        <InputField<ConsultSlotFormValues>
          label="Max Count"
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
            creating <DotsLoader />
          </>
        ) : (
          "Create Consult Slot"
        )}
      </button>
    </form>
  );
}

export default ConsultSlotForm;
