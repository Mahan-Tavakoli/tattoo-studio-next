"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ClientInfo from "./client/ClientInfo";
import {
  BookingAppointmentSchema,
  WalkInBookingSchema,
} from "@/components/schema & types/booking/booking-appointement.schema";
import BookingRequest from "./booking-request/BookingRequest";
import useBooking from "./useBooking";
import { zodResolver } from "@hookform/resolvers/zod";
import FormStepper from "@/components/ui/FormStepper";
import { formatDate } from "@/components/utils/formatter";
import DotsLoader from "@/components/ui/DotsLoader";
import useCurrentUser from "../auth/useCurrentUser";
import { getBookingByIdApi } from "@/components/services/bookingService"; // Explicitly pulled for long polling
import { toast } from "react-toastify";

const BOOKING_STEPS = [
  { id: 1, label: "Client Info" },
  { id: 2, label: "Tattoo Details" },
];

function BookingContainer() {
  const [step, setStep] = useState<number>(1);
  const [uploadToken, setUploadToken] = useState<string | null>(null);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  const { user } = useCurrentUser();
  const isWalkIn = !!user;

  const {
    bookingAppointment,
    bookingAppointmentIsPending,
    walkInAppointment,
    WalkInAppointmentIsPending,
  } = useBooking();

  const activeSchema = isWalkIn
    ? WalkInBookingSchema
    : BookingAppointmentSchema;
  const isPending = bookingAppointmentIsPending || WalkInAppointmentIsPending;

  const methods = useForm<any>({
    resolver: zodResolver(activeSchema as any),
    mode: "onTouched",
  });

  const {
    trigger,
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  // ── DETECT MOBILE UPLOAD LONG POLLING ENGINE ───────────────────────
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (uploadToken && activeBookingId) {
      // Begin background validation check execution
      intervalId = setInterval(async () => {
        try {
          const bookingDetail = await getBookingByIdApi(activeBookingId);

          // Check if references have landed in the backend attachment array
          if (
            bookingDetail &&
            bookingDetail.uploads &&
            bookingDetail.uploads.length > 0
          ) {
            toast.success("Mobile uploaded references received successfully!");
            clearInterval(intervalId);
            closeQrModal(); // Auto-shutdown view modal panel safely
          }
        } catch (err) {
          console.error("Error pooling upload synchronization updates:", err);
        }
      }, 3000); // Evaluates updates loop every 3 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [uploadToken, activeBookingId]);

  const nextStep = async (fields: any[]) => {
    const isValid = await trigger(fields);
    if (!isValid) return;
    await new Promise((r) => setTimeout(r, 150));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();

    formData.append("firstName", data.client.firstName);
    formData.append("lastName", data.client.lastName);
    formData.append("email", data.client.email || "");
    formData.append("phone", data.client.phone || "");

    formData.append("description", data.bookingRequest.description);
    formData.append("placement", data.bookingRequest.placement || "");

    if (isWalkIn) {
      formData.append(
        "tattooDate",
        data.bookingRequest.tattooDate.toISOString(),
      );
      formData.append("artistId", data.bookingRequest.artistId);
      formData.append("budgetRange", data.bookingRequest.budgetRange);
      if (data.bookingRequest.stationId)
        formData.append("stationId", data.bookingRequest.stationId);
      if (data.bookingRequest.durationNote)
        formData.append("durationNote", data.bookingRequest.durationNote);
      if (data.bookingRequest.sizeDescription)
        formData.append("sizeDescription", data.bookingRequest.sizeDescription);
      if (data.bookingRequest.styleNotes)
        formData.append("styleNotes", data.bookingRequest.styleNotes);

      try {
        const response = await walkInAppointment(formData);
        if (response && response.uploadToken) {
          setActiveBookingId(response.bookingId);
          setUploadToken(response.uploadToken);
        }
      } catch (err) {
        console.error("Walk-in submission failed:", err);
      }
    } else {
      formData.append(
        "consultDate",
        formatDate(data.bookingRequest.consultDate),
      );
      formData.append("budgetRange", data.bookingRequest.budgetRange);
      formData.append("bookingType", data.bookingRequest.bookingType);

      const { file } = data?.bookingRequest;
      if (file && file.length > 0) {
        file.forEach((f: File) => {
          formData.append("images", f);
        });
      }

      await bookingAppointment(formData);
      reset();
      setStep(1);
    }
  };

  const closeQrModal = () => {
    setUploadToken(null);
    setActiveBookingId(null);
    reset();
    setStep(1);
  };

  // Environment switching layout matching local interface configuration targets
  const targetHostBase = "http://192.168.1.60:3000";
  const customerMobileUploadUrl = uploadToken
    ? `${targetHostBase}/upload-reference?token=${uploadToken}`
    : "";

  return (
    <div className="pt-15 px-4 flex justify-center">
      <div className="w-full max-w-sm bg-alabaster text-onyx rounded-2xl p-5 shadow-md relative">
        <h1 className="text-2xl font-bold mb-6">
          {isWalkIn ? "Walk-In Registration" : "Tattoo Request"}
        </h1>

        <FormStepper
          step={step}
          setStep={setStep}
          trigger={trigger}
          steps={BOOKING_STEPS}
        />

        <FormProvider {...methods}>
          <form
            className={`grid grid-cols-1 items-center justify-center gap-5 md:gap-6 ${isPending && "opacity-70 pointer-events-none"}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {step === 1 ? (
              <ClientInfo onNext={() => nextStep(["client"])} />
            ) : (
              <>
                <BookingRequest onBack={prevStep} isWalkIn={isWalkIn} />
                <button
                  type="submit"
                  disabled={isPending || !isValid}
                  className="submit-btn"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      Submitting <DotsLoader />
                    </span>
                  ) : isWalkIn ? (
                    "Complete Registration"
                  ) : (
                    "Submit Booking"
                  )}
                </button>
              </>
            )}
          </form>
        </FormProvider>

        {/* ── AUTOMATED POOLING INTERACTIVE MODAL OVERLAY ───────────────── */}
        {uploadToken && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                Walk-In Logged!
              </h2>
              <p className="text-sm text-gray-600">
                Scan with your phone to upload references. This modal clears
                automatically once transmission starts.
              </p>

              <div className="flex justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(customerMobileUploadUrl)}`}
                  alt="Dynamic Session Destination"
                  className="w-48 h-48"
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 py-2 rounded-lg">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                Waiting for mobile device uploads...
              </div>

              <button
                type="button"
                onClick={closeQrModal}
                className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors pt-2 underline"
              >
                Skip / No Images to Upload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingContainer;
