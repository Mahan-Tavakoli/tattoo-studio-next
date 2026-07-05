"use client";

import useProducts from "@/components/features/shop/useProducts";
import CountdownRedirect from "@/components/templates/voucher/CountdownRedirect";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VoucherSuccessPage() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id") ?? "";

  const { paymentStatus, paymentStatusIsLoading, paymentStatusIsError } =
    useProducts(sessionId);

  if (paymentStatusIsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verifying your payment...</p>
      </div>
    );
  }

  if (paymentStatusIsError || paymentStatus?.status !== "PAID") {
    return (
      <div className="min-h-screen flex items-center justify-center px-[5%] py-16">
        <div className="container mx-auto max-w-xl flex flex-col items-center justify-center py-15">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-alabaster">
            <CircleAlert className="size-10 text-yellow-600" />
          </div>

          <h1 className="text-3xl font-bold text-yellow-600">
            Payment Could Not Be Verified
          </h1>

          <p className="mt-4 text-center">
            We couldn't verify your payment. If you believe this is a mistake,
            please contact the studio.
          </p>

          <Link href="/product" className="btn mt-8 text-base">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-[5%] py-16">
      <div className="container mx-auto max-w-xl flex flex-col items-center justify-center py-15">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-alabaster">
          <CircleCheckBig className="size-10 text-green-700" />
        </div>

        <h1 className="text-3xl font-bold text-green-700">
          Payment Successful
        </h1>

        <p className="mt-4 text-center">
          Thank you! Your voucher purchase has been completed successfully.
        </p>

        <CountdownRedirect redirectTo="/" color="#16a34a" />

        <Link href="/" className="btn mt-8 text-base">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default VoucherSuccessPage;
