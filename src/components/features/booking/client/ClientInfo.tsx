import { BookingAppointmentFormData } from "@/components/schema & types/booking/booking-appointement.schema";
import DatePickerField from "@/components/ui/DatePickerField";
import InputField from "@/components/ui/InputField";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

interface ClientInfoProps {
  onNext: () => void;
}

function ClientInfo({ onNext }: ClientInfoProps) {
  const t = useTranslations("booking");
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BookingAppointmentFormData>();

  return (
    <>
      {/* First Name */}
      <InputField<BookingAppointmentFormData>
        label={t("clientInfo.firstName")}
        name="client.firstName"
        errors={errors.client?.firstName}
        register={register}
        translationNameSpace="booking"
        required
      />

      {/* Last Name */}
      <InputField<BookingAppointmentFormData>
        label={t("clientInfo.lastName")}
        name="client.lastName"
        errors={errors.client?.lastName}
        register={register}
        translationNameSpace="booking"
        required
      />

      {/* Email */}
      <InputField<BookingAppointmentFormData>
        label={t("clientInfo.email")}
        name="client.email"
        errors={errors.client?.email}
        register={register}
        translationNameSpace="booking"
        type="email"
        required
      />

      {/* Birthday */}
      {/* <InputField<BookingAppointmentFormData>
        label="Birthday"
        name="client.birthday"
        errors={errors.client?.birthday}
        register={register}
        type="date"
        required
      /> */}

      {/* <DatePickerField<BookingAppointmentFormData>
        label="Birthday"
        name="client.birthday"
        control={control}
        errors={errors.client?.birthday}
        required
        disableFuture
      /> */}

      {/* Phone Number */}
      <InputField<BookingAppointmentFormData>
        label={t("clientInfo.phoneNumber")}
        name="client.phone"
        errors={errors.client?.phone}
        register={register}
        translationNameSpace="booking"
        type="tel"
        required
      />

      {/* Next step btn */}
      <button type="button" onClick={onNext} className="submit-btn">
        {t("common.next")}
      </button>
    </>
  );
}

export default ClientInfo;
