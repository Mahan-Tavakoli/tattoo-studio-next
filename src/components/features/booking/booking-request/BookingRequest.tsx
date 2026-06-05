import {
  BookingAppointmentFormData,
  WalkInBookingFormData,
} from "@/components/schema & types/booking/booking-appointement.schema";
import DatePickerField from "@/components/ui/DatePickerField";
import InputField from "@/components/ui/InputField";
import InputFile from "@/components/ui/InputFile";
import SelectBox from "@/components/ui/SelectBox";
import TextAreaField from "@/components/ui/TextAreaField";
import { FieldError, useFormContext } from "react-hook-form";
import { HiArrowLongLeft } from "react-icons/hi2";
import useConsultSlot from "../../consultSlot/useConsultSlot";
import { useState } from "react";
import { PublicBudgetRange } from "@/components/constants/Constants";
import useArtist from "../../artist/useArtist";
import { useTranslations } from "next-intl";

interface BookingRequestProps {
  onBack: () => void;
  isWalkIn: boolean;
}

function BookingRequest({ onBack, isWalkIn }: BookingRequestProps) {
  const t = useTranslations("booking");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const {
    publicConsultAvailability,
    publicConsultAvailabilityIsLoading,
    publicConsultAvailabilityIsError,
  } = useConsultSlot(currentMonth);

  const { allArtists, allArtistsIsError, allArtistsIsLoading } = useArtist();

  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<BookingAppointmentFormData | WalkInBookingFormData>();

  const bookingTypeOptions = [
    { id: 1, label: t("bookingRequest.appointment"), value: "APPOINTMENT" },
    { id: 2, label: t("bookingRequest.consultation"), value: "CONSULTATION" },
    { id: 3, label: t("bookingRequest.coverUp"), value: "COVER_UP" },
  ];

  const closedDates: Date[] =
    publicConsultAvailability?.days
      ?.filter((day: any) => day.status === "closed")
      .map((day: any) => {
        const [year, month, date] = day.date.split("-").map(Number);
        return new Date(year, month - 1, date);
      }) || [];

  const artistOptions = allArtists.map((artist: any) => ({
    id: artist.id,
    label: artist.displayName,
    value: artist.id,
  }));

  const bookingErrors = errors.bookingRequest as any;

  // return (
  //   <>
  //     <div className="flex items-center justify-start">
  //       <button
  //         type="button"
  //         className="flex items-center justify-center gap-x-2 hover:underline hover:underline-offset-4"
  //         onClick={onBack}
  //       >
  //         <HiArrowLongLeft size={22} />
  //         <span>Back</span>
  //       </button>
  //     </div>
  //     {/* Studio Chooses */}

  //     {/* <SelectBox<BookingAppointmentFormData> label="Studio Chooses" name="bookingRequest.studioChooses" register={register} errors={errors.bookingRequest?.studioChooses} options={studioChooses} required /> */}

  //     {/* Booking Type */}
  //     <SelectBox<BookingAppointmentFormData>
  //       label="Booking Type"
  //       name="bookingRequest.bookingType"
  //       register={register}
  //       errors={errors.bookingRequest?.bookingType}
  //       options={bookingTypeOptions}
  //       required
  //     />

  //     {/* Budget Range */}
  //     <SelectBox<BookingAppointmentFormData>
  //       label="Budget Range"
  //       name="bookingRequest.budgetRange"
  //       register={register}
  //       errors={errors.bookingRequest?.budgetRange}
  //       options={PublicBudgetRange}
  //       required
  //     />

  //     {/* Consult Date */}
  //     <DatePickerField<BookingAppointmentFormData>
  //       label="Consult Date"
  //       name="bookingRequest.consultDate"
  //       control={control}
  //       errors={errors.bookingRequest?.consultDate}
  //       required
  //       disablePast
  //       excludeDays={[0]} // Sunday!
  //       disabledDates={closedDates}
  //       currentMonth={currentMonth}
  //       onMonthChange={setCurrentMonth}
  //       disabled={publicConsultAvailabilityIsLoading}
  //     />
  //     {/* PreferredDateFrom */}
  //     {/* <DatePickerField<BookingAppointmentFormData>
  //       label="Preferred Date"
  //       name="bookingRequest.preferredDateFrom"
  //       control={control}
  //       errors={errors.bookingRequest?.preferredDateFrom}
  //       required
  //       disablePast
  //     /> */}

  //     {/* PreferredDateTo */}
  //     {/* <DatePickerField<BookingAppointmentFormData> label="Preferred Date To" name="bookingRequest.preferredDateTo" control={control} errors={errors.bookingRequest?.preferredDateTo} /> */}

  //     {/* Referrer */}
  //     {/* <InputField<BookingAppointmentFormData>
  //       label="Referrer"
  //       name="bookingRequest.referrer"
  //       register={register}
  //       errors={errors.bookingRequest?.referrer}
  //     /> */}

  //     {/* Tattoo Image File */}
  //     <InputFile<BookingAppointmentFormData>
  //       label="Reference Images (Max 10)"
  //       name="bookingRequest.file"
  //       setValue={setValue}
  //       multiple
  //       required
  //       errors={errors.bookingRequest?.file as unknown as FieldError}
  //     />

  //     {/* Placement */}

  //     <TextAreaField<BookingAppointmentFormData>
  //       label="Placement ..."
  //       name="bookingRequest.placement"
  //       register={register}
  //       errors={errors.bookingRequest?.placement}
  //     />

  //     {/* Description / Idea */}

  //     <TextAreaField<BookingAppointmentFormData>
  //       label="Tattoo Description ..."
  //       name="bookingRequest.description"
  //       register={register}
  //       errors={errors.bookingRequest?.description}
  //     />

  //     {/* Next step btn */}
  //     {/* <button type="button" onClick={onNext} className="submit-btn w-full">
  //       Next
  //     </button> */}
  //   </>
  // );

  return (
    <>
      <div className="flex items-center justify-start">
        <button
          type="button"
          className="flex items-center justify-center gap-x-2 hover:underline hover:underline-offset-4"
          onClick={onBack}
        >
          <HiArrowLongLeft size={22} />
          <span>{t("common.back")}</span>
        </button>
      </div>

      {isWalkIn ? (
        <>
          <DatePickerField
            label={t("bookingRequest.tattooDate")}
            name="bookingRequest.tattooDate"
            control={control}
            errors={bookingErrors?.tattooDate}
            disablePast
            excludeDays={[0]}
            disabledDates={closedDates}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            required
          />

          <SelectBox
            label={t("bookingRequest.budgetRange")}
            name="bookingRequest.budgetRange"
            register={register}
            errors={bookingErrors?.budgetRange}
            options={PublicBudgetRange}
            translationNameSpace="booking"
            required
          />

          <SelectBox
            label={t("bookingRequest.assignArtist")}
            name="bookingRequest.artistId"
            register={register}
            errors={bookingErrors?.artistId}
            options={artistOptions}
            translationNameSpace="booking"
            required
          />

          {/* <InputField
            label="Size Description (e.g. 10x10 cm)"
            name="bookingRequest.sizeDescription"
            register={register}
            errors={bookingErrors?.sizeDescription}
          /> */}
          {/* <InputField
            label="Duration Estimate"
            name="bookingRequest.durationNote"
            register={register}
            errors={bookingErrors?.durationNote}
          /> */}

          {/* <InputField
            label="Style Notes"
            name="bookingRequest.styleNotes"
            register={register}
            errors={bookingErrors?.styleNotes}
          /> */}
        </>
      ) : (
        <>
          <SelectBox
            label={t("bookingRequest.bookingType")}
            name="bookingRequest.bookingType"
            register={register}
            errors={bookingErrors?.bookingType}
            options={bookingTypeOptions}
            translationNameSpace="booking"
            required
          />

          <SelectBox
            label={t("bookingRequest.budgetRange")}
            name="bookingRequest.budgetRange"
            register={register}
            errors={bookingErrors?.budgetRange}
            options={PublicBudgetRange}
            translationNameSpace="booking"
            required
          />

          <DatePickerField
            label={t("bookingRequest.consultDate")}
            name="bookingRequest.consultDate"
            control={control}
            errors={bookingErrors?.consultDate}
            required
            disablePast
            excludeDays={[0]}
            disabledDates={closedDates}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            disabled={publicConsultAvailabilityIsLoading}
          />
        </>
      )}

      {/* ── CORE COMPATIBLE INTAKE METADATA ──────────────────── */}
      <TextAreaField
        label={t("bookingRequest.placementDescription")}
        name="bookingRequest.placement"
        register={register}
        errors={bookingErrors?.placement}
        translationNameSpace="booking"
      />

      <TextAreaField
        label={t("bookingRequest.tattooConcept")}
        name="bookingRequest.description"
        register={register}
        errors={bookingErrors?.description}
        translationNameSpace="booking"
      />

      {/* Conditional File Uploader: Hidden entirely for Walk-In Tablet flows */}
      {!isWalkIn && (
        <InputFile
          label={t("bookingRequest.referenceImages")}
          name="bookingRequest.file"
          setValue={setValue}
          multiple
          required
          errors={bookingErrors?.file as any}
          translationNameSpace="booking"
        />
      )}
    </>
  );
}

export default BookingRequest;
