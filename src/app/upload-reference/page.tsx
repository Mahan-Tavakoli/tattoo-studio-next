"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DotsLoader from "@/components/ui/DotsLoader";
import InputFile from "@/components/ui/InputFile";

interface UploadFormInputs {
  images: File[];
}

export default function MobileReferenceUploadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token");

  const [isSubmitting, setIsSubmitting] = useState(false);
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
      <div className="min-h-screen flex items-center justify-center bg-alabaster p-6 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-sm">
          <p className="text-red-700 font-semibold">
            Invalid or Missing Session Link
          </p>
          <p className="text-xs text-gray-500 mt-2">
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

    setIsSubmitting(true);
    const formData = new FormData();

    // Target matches files array mapping
    data.images.forEach((file: File) => {
      formData.append("images", file);
    });

    try {
      // Connect to your absolute backend base context structure
      const backendBaseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://172.19.61.86:4000"; // Adjust to backend portfolio port allocation
      await axios.post(
        `${backendBaseUrl}/public/booking/${token}/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Images uploaded successfully!");
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Reference file uploads broke:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to finalize references transmission.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-alabaster text-onyx flex flex-col justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 shadow-md space-y-6">
        <div>
          <h1 className="text-xl font-bold">Add Reference Images</h1>
          <p className="text-xs text-gray-500 mt-1">
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
              disabled={isSubmitting}
              className="w-full bg-onyx text-white py-3 rounded-xl font-medium transition-all hover:bg-opacity-90 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  Sending Media <DotsLoader />
                </>
              ) : (
                "Submit Images to Tablet"
              )}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
