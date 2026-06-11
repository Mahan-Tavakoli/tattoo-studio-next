"use client";

import Table from "@/components/ui/Table";
import useBooking from "../../booking/useBooking";
import BookingRow from "./BookingRow";
import { useState, useEffect } from "react";
import { BookingInfo } from "@/components/schema & types/booking/booking-appointment.types";
import Modal from "@/components/ui/Modal";
import UpdateBookingStatusForm from "./UpdateBookingStatusForm";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import usePagination from "@/components/hook/usePagination";
import Pagination from "@/components/templates/admin/Pagination";

function BookingTable() {
  const t = useTranslations("admin.bookings.table");
  const { bookings, bookingIsLoading, bookingIsError } = useBooking();
  const { currentPage, paginatedData, setCurrentPage, totalPages } =
    usePagination(bookings || []);

  const [bookingToUpdateStatus, setBookingToUpdateStatus] =
    useState<BookingInfo | null>(null);

  const [checkInClientBooking, setCheckInClientBooking] =
    useState<BookingInfo | null>(null);

  useEffect(() => {
    if (bookingIsError) {
      toast.error(t("loadError"));
    }
  }, [bookingIsError, t]);

  if (bookingIsError) {
    return (
      <div className="container">
        <p className="text-red-500">{t("loadErrorDescription")}</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <Table.Header>
          <th className="py-2">{t("index")}</th>
          <th>{t("name")}</th>
          <th>{t("email")}</th>
          <th>{t("phone")}</th>
          <th>{t("status")}</th>
          <th>{t("budgetRange")}</th>
          <th>{t("consultDate")}</th>
          <th>{t("details")}</th>
          <th>{t("operation")}</th>
        </Table.Header>
        <Table.Body>
          {bookingIsLoading ? (
            [...Array(6)].map((_, i) => (
              <Table.Row key={i}>
                <td colSpan={9}>
                  <div className="h-10 bg-snow/10 animate-pulse rounded" />
                </td>
              </Table.Row>
            ))
          ) : bookings.length === 0 ? (
            <Table.Row>
              <td colSpan={4} className="py-4">
                {t("empty")}
              </td>
            </Table.Row>
          ) : (
            paginatedData.map((booking, index) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                index={(currentPage - 1) * 6 + index + 1}
                onEdit={() => setBookingToUpdateStatus(booking)}
                onCheckIn={() => setCheckInClientBooking(booking)}
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

      {/* Edit Status */}
      {bookingToUpdateStatus && (
        <Modal
          onClose={() => setBookingToUpdateStatus(null)}
          title={t("updateBookingStatus")}
        >
          <UpdateBookingStatusForm
            booking={bookingToUpdateStatus}
            onClose={() => setBookingToUpdateStatus(null)}
          />
        </Modal>
      )}

      {/* Check in */}
      {checkInClientBooking && (
        <Modal
          onClose={() => setCheckInClientBooking(null)}
          title={t("clientCheckIn")}
        >
          {t("checkIn")}
        </Modal>
      )}
    </>
  );
}

export default BookingTable;
