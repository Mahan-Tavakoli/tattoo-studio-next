"use client";

import {
  GuestArtistBookingAppointment,
  GuestArtistBookingSchema,
} from "@/components/schema & types/guest-artist/guest-artist.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useGuestArtistBooking from "./useGuestArtistBooking";
import { formatDate } from "@/components/utils/formatter";
import { useEffect, useState } from "react";
import FormStepper from "@/components/ui/FormStepper";
import Availability from "./availability/Availability";
import Details from "./details/Details";

const GUEST_ARTIST_STEPS = [
  { id: 1, label: "Availability" },
  { id: 2, label: "Your Details" },
];

function GuestArtistContainer() {
  const [step, setStep] = useState<number>(1);

  const methods = useForm<GuestArtistBookingAppointment>({
    resolver: zodResolver(GuestArtistBookingSchema as any),
    mode: "onTouched",
  });

  const { handleSubmit, watch, setValue, trigger } = methods;

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const { guestArtistBooking, guestArtistBookingIsPending } =
    useGuestArtistBooking({ startDate, endDate });

  const nextStep = async () => {
    const valid = await trigger(["startDate", "endDate", "numberOfTables"]);
    if (!valid) return;

    await new Promise((r) => setTimeout(r, 150));
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const onSubmit: SubmitHandler<GuestArtistBookingAppointment> = (data) => {
    console.log("data =>", data);

    const guestArtistBookingData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      numberOfTables: data.numberOfTables,
      acknowledgment: data.acknowledgment,
    };
    console.log("guestData =>", guestArtistBookingData);
    guestArtistBooking(guestArtistBookingData);
  };

  return (
    <div className="pt-15 px-4 flex justify-center">
      <div className="w-full max-w-sm bg-alabaster text-onyx rounded-2xl p-5 shadow-md">
        <h1 className="text-2xl font-bold mb-1">Guest Artist Request</h1>
        <p className="text-onyx/50 text-xs mb-5">
          Payment is handled securely via Stripe.
        </p>

        <FormStepper
          step={step}
          setStep={setStep}
          trigger={trigger}
          steps={GUEST_ARTIST_STEPS}
        />

        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {step === 1 && <Availability onNext={nextStep} />}

            {step === 2 && (
              <Details
                onBack={prevStep}
                isSubmitting={guestArtistBookingIsPending}
              />
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default GuestArtistContainer;
