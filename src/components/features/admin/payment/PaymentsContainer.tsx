"use client";

import { useState } from "react";
import PaymentTable from "./PaymentTable";
import { startOfMonth } from "date-fns";
import { PaymentsFilterForm } from "@/components/schema & types/payment/payment.types";
import PaymentFilters from "./PaymentFilters";

function PaymentsContainer() {
  const [filters, setFilters] = useState<PaymentsFilterForm>({
    from: startOfMonth(new Date()),
    to: new Date(),
    method: "",
    source: "",
    status: "",
  });
  return (
    <div className="container">
      <div className="mx-auto w-full max-w-7xl">
        <PaymentFilters defaultValues={filters} onSubmit={setFilters} />
      </div>
      <div className="w-full h-[0.5px] my-10 bg-snow/30"></div>
      <PaymentTable
        from={filters.from}
        to={filters.to}
        method={filters.method}
        status={filters.status}
        source={filters.source}
      />
    </div>
  );
}

export default PaymentsContainer;
