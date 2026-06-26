"use client";

import CountdownRedirect from "@/components/templates/voucher/CountdownRedirect";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

function VoucherSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-[5%] py-16">
      <div className="container mx-auto max-w-xl flex flex-col items-center justify-center py-15">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-alabaster">
          <CircleCheckBig className="size-10 text-green-700" />
        </div>

        <h1 className="text-3xl font-bold text-green-700">
          Payment Successful
        </h1>

        <p className="mt-4">
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
