"use client";

import { useTranslations } from "next-intl";
import useAppointment from "./useAppointment";
import usePagination from "@/components/hook/usePagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "@/components/ui/Table";
import Pagination from "@/components/templates/admin/Pagination";
import AppointmentRow from "./AppointmentRow";
import { AppointmentInfo } from "@/components/schema & types/appointment/appointment.types";
import Modal from "@/components/ui/Modal";
import ConfirmCheckIn from "@/components/templates/admin/appointment/ConfirmCheckIn";

interface AppointmentTableProps {
  date: Date;
  period: string;
}

function AppointmentTable({ date, period }: AppointmentTableProps) {
  // const t = useTranslations("admin.appointment.table");
  const {
    appointments,
    appointmentsIsError,
    appointmentsIsLoading,
    checkInBooking,
    checkInBookingIsPending,
  } = useAppointment({ date, period });
  console.log("appointments =>", appointments);
  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(appointments?.items ?? []);

  const [checkInClientAppointment, setCheckInClientAppointment] =
    useState<AppointmentInfo | null>(null);

  useEffect(() => {
    if (appointmentsIsError) {
      toast.error("error");
    }
  }, [appointmentsIsError]);

  if (appointmentsIsError) {
    return <div className="text-red-500 text-sm">Error</div>;
  }

  return (
    <>
      <Table>
        <Table.Header>
          <th className="py-2">#</th>
          <th>Client</th>
          <th>Date</th>
          <th>Status</th>
          <th>Details</th>
          <th>Operation</th>
        </Table.Header>
        <Table.Body>
          {appointmentsIsLoading ? (
            [...Array(6)].map((_, i) => (
              <Table.Row key={i}>
                <td colSpan={9}>
                  <div className="h-10 bg-snow/10 animate-pulse rounded" />
                </td>
              </Table.Row>
            ))
          ) : appointments?.items?.length === 0 ? (
            <Table.Row>
              <td colSpan={4} className="py-4">
                empty
              </td>
            </Table.Row>
          ) : (
            paginatedData.map((appointment, index) => (
              <AppointmentRow
                key={appointment?.booking.id}
                appointment={appointment}
                onCheckIn={() => setCheckInClientAppointment(appointment)}
                index={(currentPage - 1) * 6 + index + 1}
              />
            ))
          )}
        </Table.Body>
      </Table>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />

      {/* check in */}
      {checkInClientAppointment && (
        <Modal
          title="Check In"
          onClose={() => setCheckInClientAppointment(null)}
        >
          <ConfirmCheckIn
            disabled={checkInBookingIsPending}
            onClose={() => setCheckInClientAppointment(null)}
            onConfirm={() => {
              checkInBooking(checkInClientAppointment.booking.id, {
                onSuccess: () => {
                  setCheckInClientAppointment(null);
                },
              });
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default AppointmentTable;
