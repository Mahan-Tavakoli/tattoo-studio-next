"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import useStationConfig from "./useStationConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StationConfig,
  StationConfigValidationSchema,
} from "@/components/schema & types/station-config/station-config.schema";
import InputField from "@/components/ui/InputField";
import DotsLoader from "@/components/ui/DotsLoader";

interface StationConfigFormProps {
  onClose: () => void;
}

function StationConfigForm({ onClose }: StationConfigFormProps) {
  const {
    stationConfig,
    stationConfigIsError,
    stationConfigIsLoading,
    editStationConfig,
    editStationConfigIsPending,
  } = useStationConfig();

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    register,
  } = useForm<StationConfig>({
    resolver: zodResolver(StationConfigValidationSchema as any),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<StationConfig> = async (data) => {
    const newStationConfig = {
      totalTables: data.totalTables,
      pricePerDay: data.pricePerDay,
      monthlyDiscountPercent: data.monthlyDiscountPercent,
    };

    editStationConfig(newStationConfig);
    await new Promise((r) => setTimeout(r, 150));
    reset();
    onClose();
  };

  return (
    <form
      className={`grid grid-cols-1 items-center justify-center gap-5 md:gap-6 ${editStationConfigIsPending ? "opacity-70 pointer-events-none" : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Total Tables */}
      <InputField<StationConfig>
        name="totalTables"
        label="Total Tables"
        register={register}
        errors={errors.totalTables}
        type="tel"
        required
      />

      {/* Price Per Day */}

      <InputField<StationConfig>
        name="pricePerDay"
        label="Price Per Day"
        register={register}
        errors={errors.pricePerDay}
        type="tel"
        required
      />

      {/* Phone Number */}
      <InputField<StationConfig>
        label="Monthly Discount Percent"
        name="monthlyDiscountPercent"
        errors={errors.monthlyDiscountPercent}
        register={register}
        type="tel"
        required
      />

      <button
        type="submit"
        disabled={editStationConfigIsPending || !isValid}
        className="submit-btn"
      >
        {editStationConfigIsPending ? (
          <>
            Updating <DotsLoader />
          </>
        ) : (
          <>Update Config</>
        )}
      </button>
    </form>
  );
}

export default StationConfigForm;
