import getAllPaymentsApi from "@/components/services/paymentService";
import { formatDate } from "@/components/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export interface UsePaymentProps {
  from: Date;
  to: Date;
  source: string;
  method: string;
  status: string;
}

export default function usePayment({
  source = "",
  from,
  method = "",
  status = "",
  to,
}: UsePaymentProps) {
  const fromFormattedDate = useMemo(
    () => (from ? formatDate(from) : ""),
    [from],
  );

  const toFormattedDate = useMemo(() => (to ? formatDate(to) : ""), [to]);

  const {
    data: paymentsData,
    isLoading: paymentsIsLoading,
    isError: paymentsIsError,
  } = useQuery({
    queryKey: [
      "payments",
      fromFormattedDate,
      toFormattedDate,
      source,
      method,
      status,
    ],
    queryFn: () =>
      getAllPaymentsApi({
        from: fromFormattedDate,
        to: toFormattedDate,
        method,
        source,
        status,
      }),
  });

  const payments = paymentsData?.items;
  const total = paymentsData?.total ?? 0;
  const limit = paymentsData?.limit ?? 0;

  return {
    // all payments
    payments,
    total,
    limit,
    paymentsIsLoading,
    paymentsIsError,
  };
}
