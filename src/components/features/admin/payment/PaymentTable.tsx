"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import usePagination from "@/components/hook/usePagination";
import usePayment from "./usePayment";

import Table from "@/components/ui/Table";
import Pagination from "@/components/templates/admin/Pagination";

import PaymentRow from "./PaymentRow";
import PaymentDetails from "./PaymentDetails";

import {
  PaymentInfo,
  PaymentsFilterForm,
} from "@/components/schema & types/payment/payment.types";

function PaymentTable({
  from,
  to,
  source,
  method,
  status,
}: PaymentsFilterForm) {
  const { payments, paymentsIsError, paymentsIsLoading } = usePayment({
    from,
    to,
    source,
    method,
    status,
  });

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(payments || []);

  const [selectedPayment, setSelectedPayment] = useState<PaymentInfo | null>(
    null,
  );

  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleView = (payment: PaymentInfo) => {
    setSelectedPayment(payment);
    setDetailsOpen(true);
  };

  useEffect(() => {
    if (paymentsIsError) {
      toast.error("Error loading payments.");
    }
  }, [paymentsIsError]);

  if (paymentsIsError) {
    return <div className="text-sm text-red-500">Error loading payments.</div>;
  }

  return (
    <>
      <Table>
        <Table.Header>
          <th className="py-2">#</th>
          <th>Customer</th>
          <th>Source</th>
          <th>Method</th>
          <th>Status</th>
          <th>Gross</th>
          <th>Net</th>
          <th>Date</th>
          <th className="text-center">Actions</th>
        </Table.Header>

        <Table.Body>
          {paymentsIsLoading ? (
            [...Array(6)].map((_, i) => (
              <Table.Row key={i}>
                <td colSpan={9}>
                  <div className="h-10 animate-pulse rounded bg-snow/10" />
                </td>
              </Table.Row>
            ))
          ) : paginatedData.length === 0 ? (
            <Table.Row>
              <td colSpan={9} className="py-6 text-center">
                No payments found.
              </td>
            </Table.Row>
          ) : (
            paginatedData.map((payment, index) => (
              <PaymentRow
                key={payment.id}
                payment={payment}
                index={(currentPage - 1) * 6 + index + 1}
                onView={handleView}
              />
            ))
          )}
        </Table.Body>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <PaymentDetails
        payment={selectedPayment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}

export default PaymentTable;
