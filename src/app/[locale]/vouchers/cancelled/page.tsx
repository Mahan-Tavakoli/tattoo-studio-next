"use client";

import CountdownRedirect from "@/components/templates/voucher/CountdownRedirect";
import { CircleX } from "lucide-react";
import Link from "next/link";

function VoucherCancelledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-[5%] py-16">
      <div className="container mx-auto max-w-xl flex flex-col items-center justify-center py-15">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-alabaster">
          <CircleX className="size-10 text-red-700" />
        </div>

        <h1 className="text-3xl font-bold text-red-700">Payment Cancelled</h1>

        <p className="mt-4 text-center">
          Your payment was cancelled. No charge has been made.
        </p>

        <CountdownRedirect redirectTo="/product" color="#c53030" />

        <Link href="/product" className="btn mt-8 text-base">
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default VoucherCancelledPage;
