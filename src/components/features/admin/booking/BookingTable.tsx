"use client";

import Table from "@/components/ui/Table";
import useBooking from "../../booking/useBooking";
import BookingRow from "./BookingRow";
import { useState } from "react";
import { BookingInfo } from "@/components/schema & types/booking/booking-appointment.types";
import Modal from "@/components/ui/Modal";
import UpdateBookingStatusForm from "./UpdateBookingStatusForm";
import { toast } from "react-toastify";

function BookingTable() {
  const { bookings, bookingIsLoading, bookingIsError } = useBooking();

  const [bookingToUpdateStatus, setBookingToUpdateStatus] =
    useState<BookingInfo | null>(null);

  const [checkInClientBooking, setCheckInClientBooking] =
    useState<BookingInfo | null>(null);

  if (bookingIsError) {
    toast.error("Failed to load bookings, try again");
    return (
      <div className="container">
        <p className="text-red-500">Failed to load bookings</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <Table.Header>
          <th className="py-2">#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Budget Range</th>
          <th>Consult Date</th>
          <th>Details</th>
          <th>Operation</th>
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
                No Bookings yet
              </td>
            </Table.Row>
          ) : (
            bookings.map((booking, index) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                //index={(currentPage - 1) * 6 + index}
                index={index}
                onEdit={() => setBookingToUpdateStatus(booking)}
                onCheckIn={() => setCheckInClientBooking(booking)}
              />
            ))
          )}
        </Table.Body>
      </Table>
      {/* <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </div> */}

      {/* Edit Status */}
      {bookingToUpdateStatus && (
        <Modal
          onClose={() => setBookingToUpdateStatus(null)}
          title="Update Booking Status"
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
          title="Client Check in"
        >
          Check in
        </Modal>
      )}
    </>
  );
}

export default BookingTable;
