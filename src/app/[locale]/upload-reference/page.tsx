"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DotsLoader from "@/components/ui/DotsLoader";
import InputFile from "@/components/ui/InputFile";
import { UploadFormInputs } from "@/components/schema & types/booking/booking-appointment.types";
import useBooking from "@/components/features/booking/useBooking";


export default function MobileReferenceUploadPage() {
  const {walkInAppointmentImages, WalkInAppointmentImagesIsPending} = useBooking()
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token");

  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<UploadFormInputs>({
    mode: "onChange",
    defaultValues: {
      images: [],
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="bg-snow p-6 rounded-2xl shadow-md max-w-sm">
          <p className="text-red-700 font-semibold">
            Invalid or Missing Session Link
          </p>
          <p className="text-xs text-onyx mt-2">
            Please re-scan the original QR code generated on the reception
            tablet dashboard.
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: UploadFormInputs) => {
    if (!data.images || data.images.length === 0) {
      toast.error("Please choose at least one image reference to send.");
      return;
    }

    const formData = new FormData();

    // Target matches files array mapping
    data.images.forEach((file: File) => {
      formData.append("images", file);
    });
await walkInAppointmentImages({uploadToken: token, images: formData})
setIsSuccess(true)
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-alabaster p-6 text-center animate-fadeIn">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-sm space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <h1 className="text-xl font-bold text-onyx">
            Transmission Complete!
          </h1>
          <p className="text-sm text-gray-600">
            Your images have synced live with the counter station tablet screen.
            You can now close this tab safely.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-onyx flex flex-col justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-alabaster rounded-2xl p-6 shadow-md space-y-6">
        <div>
          <h1 className="text-xl font-bold">Add Reference Images</h1>
          <p className="text-xs text-onyx/50 mt-1">
            Upload sketches, design inspiration, or body positioning photos for
            your walk-in session.
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputFile<UploadFormInputs>
              label="Select Reference Photos"
              name="images"
              setValue={setValue}
              multiple
              required
              errors={errors.images as any}
            />

            <button
              type="submit"
              disabled={WalkInAppointmentImagesIsPending}
              className="submit-btn w-full max-w-lg"
            >
              {WalkInAppointmentImagesIsPending ? (
                <>
                  Sending Media <DotsLoader />
                </>
              ) : (
                "Submit Images"
              )}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
