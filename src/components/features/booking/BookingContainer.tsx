"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import ClientInfo from "./client/ClientInfo";
import {
  BookingAppointmentFormData,
  BookingAppointmentSchema,
  WalkInBookingSchema,
} from "@/components/schema & types/booking/booking-appointement.schema";
import BookingRequest from "./booking-request/BookingRequest";
import useBooking from "./useBooking";
import MedicalDeclaration from "./medical-declaration/MedicalDeclaration";
import { zodResolver } from "@hookform/resolvers/zod";
import FormStepper from "@/components/ui/FormStepper";
import { formatDate } from "@/components/utils/formatter";
import DotsLoader from "@/components/ui/DotsLoader";
import useCurrentUser from "../auth/useCurrentUser";

const BOOKING_STEPS = [
  { id: 1, label: "Client Info" /* fields: ["client"] */ },
  { id: 2, label: "Tattoo Details" /* fields: ["bookingRequest"] */ },
];

function BookingContainer() {
  const [step, setStep] = useState<number>(1);
  const [uploadToken, setUploadToken] = useState<string | null>(null);

  const { user, currentUserIsError, currentUserIsLoading } = useCurrentUser();
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

  const nextStep = async (fields: any[]) => {
    const isValid = await trigger(fields);
    if (!isValid) return;

    await new Promise((r) => setTimeout(r, 150));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // const onSubmit: SubmitHandler<any> = async (data) => {
  //   console.log("data =>", data);
  //   const formData = new FormData();

  //   // const formatDate = (date: string | Date) => {
  //   //   const d = new Date(date);
  //   //   return d.toISOString().split("T")[0];
  //   // };

  //   const { file } = data?.bookingRequest;

  //   // Client
  //   formData.append("firstName", data.client.firstName);
  //   formData.append("lastName", data.client.lastName);
  //   formData.append("email", data.client.email);
  //   formData.append("phone", data.client.phone);

  //   // Booking
  //   formData.append("consultDate", formatDate(data.bookingRequest.consultDate));
  //   formData.append("description", data.bookingRequest.description);
  //   formData.append("budgetRange", data.bookingRequest.budgetRange);
  //   formData.append("bookingType", data.bookingRequest.bookingType);
  //   formData.append("placement", data.bookingRequest.placement || "");

  //   if (file && file.length > 0) {
  //     file.forEach((f) => {
  //       formData.append("images", f);
  //     });
  //   }
  //   console.log("images =>", file);

  //   await bookingAppointment(formData);
  //   reset();
  //   setStep(1);
  // };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();

    // ── Append Common Client Properties ─────────────────────────────────
    formData.append("firstName", data.client.firstName);
    formData.append("lastName", data.client.lastName);
    formData.append("email", data.client.email || "");
    formData.append("phone", data.client.phone || "");

    // ── Append Workflow Specific Data Parameters ────────────────────────
    formData.append("description", data.bookingRequest.description);
    formData.append("placement", data.bookingRequest.placement || "");

    if (isWalkIn) {
      // Walk-In Payload
      formData.append(
        "tattooDate",
        data.bookingRequest.tattooDate.toISOString(),
      );
      formData.append("artistId", data.bookingRequest.artistId);
      if (data.bookingRequest.stationId)
        formData.append("stationId", data.bookingRequest.stationId);
      if (data.bookingRequest.durationNote)
        formData.append("durationNote", data.bookingRequest.durationNote);
      if (data.bookingRequest.sizeDescription)
        formData.append("sizeDescription", data.bookingRequest.sizeDescription);
      if (data.bookingRequest.styleNotes)
        formData.append("styleNotes", data.bookingRequest.styleNotes);

      try {
        // Execute walk-in registration mutation
        const response = await walkInAppointment(formData);
        console.log("response =>", response);

        if (response && response.uploadToken) {
          setUploadToken(response.uploadToken);
        }
      } catch (err) {
        console.error("Walk-in submission failed:", err);
      }
    } else {
      // Public Booking Payload
      formData.append(
        "consultDate",
        formatDate(data.bookingRequest.consultDate),
      );
      formData.append("budgetRange", data.bookingRequest.budgetRange);
      formData.append("bookingType", data.bookingRequest.bookingType);

      const { file } = data?.bookingRequest;
      if (file && file.length > 0) {
        file.forEach((f: File) => {
          formData.append("images", f); // Maps onto backend's accepted FilesInterceptor label
        });
      }

      await bookingAppointment(formData);
      reset();
      setStep(1);
    }
  };

  const closeQrModal = () => {
    setUploadToken(null);
    reset();
    setStep(1);
  };

  const customerMobileUploadUrl = uploadToken
    ? `${window.location.origin}/upload-reference?token=${uploadToken}`
    : "";

  // return (
  //   <div className="pt-15 px-4 flex justify-center">
  //     <div className="w-full max-w-sm bg-alabaster text-onyx rounded-2xl p-5 shadow-md">
  //       <h1 className="text-2xl font-bold mb-6">Tattoo Request</h1>

  //       {/* Stepper */}
  //       <FormStepper<BookingAppointmentFormData>
  //         step={step}
  //         setStep={setStep}
  //         trigger={trigger}
  //         steps={BOOKING_STEPS}
  //       />

  //       <FormProvider {...methods}>
  //         <form
  //           className={`grid grid-cols-1 items-center justify-center gap-5 md:gap-6 ${bookingAppointmentIsPending && "opacity-70 pointer-events-none"}`}
  //           onSubmit={handleSubmit(onSubmit)}
  //         >
  //           {step === 1 ? (
  //             <ClientInfo onNext={() => nextStep(["client"])} />
  //           ) : (
  //             <>
  //               <BookingRequest onBack={prevStep} />
  //               <button
  //                 type="submit"
  //                 disabled={bookingAppointmentIsPending || !isValid}
  //                 className="submit-btn"
  //               >
  //                 {bookingAppointmentIsPending ? (
  //                   <>
  //                     Submitting <DotsLoader />
  //                   </>
  //                 ) : (
  //                   "Submit Booking"
  //                 )}
  //               </button>
  //             </>
  //           )}
  //           {/* {step === 1 ? (
  //                   <ClientInfo onNext={() => nextStep(["client"])} />
  //                 ) : step === 2 ? (
  //                   <BookingRequest
  //                     onNext={() => nextStep(["bookingRequest"])}
  //                     onBack={prevStep}
  //                   />
  //                 ) : (
  //                   <>
  //                     <MedicalDeclaration onBack={prevStep} />
  //                     <button
  //                       type="submit"
  //                       disabled={bookingAppointmentIsPending}
  //                       className="submit-btn"
  //                     >
  //                       {bookingAppointmentIsPending
  //                         ? "Submitting ..."
  //                         : "Submit Booking"}
  //                     </button>
  //                   </>
  //                 )} */}
  //         </form>
  //       </FormProvider>
  //     </div>
  //   </div>
  // );

  return (
    <div className="pt-15 px-4 flex justify-center">
      <div className="w-full max-w-sm bg-alabaster text-onyx rounded-2xl p-5 shadow-md relative">
        <h1 className="text-2xl font-bold mb-6">
          {isWalkIn ? "Walk-In Registration" : "Tattoo Request"}
        </h1>

        {/* Stepper Panel */}
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

        {/* ── INTERACTIVE TABLET HUB OVERLAY MODAL ───────────────────────── */}
        {uploadToken && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                Walk-In Booked Successfully!
              </h2>
              <p className="text-sm text-gray-600">
                Scan this QR code with your smartphone camera to upload your
                tattoo references instantly.
              </p>

              <div className="flex justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(customerMobileUploadUrl)}`}
                  alt="Mobile Reference Upload Target Route"
                  className="w-48 h-48"
                />
              </div>

              <div className="text-xs text-gray-400 select-all truncate bg-gray-100 p-2 rounded">
                {customerMobileUploadUrl}
              </div>

              <button
                type="button"
                onClick={closeQrModal}
                className="w-full bg-onyx text-white py-2.5 rounded-xl font-medium hover:bg-opacity-90 transition-all"
              >
                Done / Next Customer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default BookingContainer;
