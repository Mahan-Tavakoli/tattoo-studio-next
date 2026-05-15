"use client";

import formattedDate, { formatBudgetRange } from "@/components/utils/formatter";
import useBooking from "../../booking/useBooking";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { CiEdit } from "react-icons/ci";
import Modal from "@/components/ui/Modal";
import UpdateBookingStatusForm from "./UpdateBookingStatusForm";
import StatusBadge from "@/components/templates/admin/StatusBadge";
import { toast } from "react-toastify";
import BlurImage from "@/components/templates/skeleton/BlurImage";
import { bookingStatusStyles } from "@/components/templates/admin/booking/bookingStatusStyles";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

function BookingDetails() {
  const { singleBooking, singleBookingIsLoading, singleBookingIsError } =
    useBooking();
  const [index, setIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { client, uploads } = singleBooking || {};

  if (singleBookingIsLoading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-6 w-40 bg-onyx rounded" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-40 bg-onyx rounded" />
          <div className="h-40 bg-onyx rounded" />
        </div>
      </div>
    );
  }

  if (singleBookingIsError) {
    toast.error("Failed to load booking details, try again");
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p>Failed to load booking details, try again</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="">
            <h1 className="text-xl md:text-2xl font-semibold">
              {client?.firstName} {client?.lastName}
            </h1>
            <p className="text-sm text-snow/50">Booking overview</p>
          </div>
          {singleBooking?.status == "CANCELLED" ||
          singleBooking?.status == "COMPLETED" ||
          singleBooking?.status === "CONSULT_NO_SHOW" ? (
            ""
          ) : (
            <div className="flex items-center">
              <button
                className="btn flex gap-x-2 text-sm"
                onClick={() => setIsOpen(true)}
              >
                <span>Update Status</span>
                <CiEdit className="size-5" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* CLIENT CARD */}
            <Card title="Client">
              <Info
                label="Name"
                value={`${client?.firstName} ${client?.lastName}`}
              />
              <Info label="Email" value={client?.email} />
              <Info label="Phone" value={client?.phone} />
            </Card>

            {/* BOOKING META */}
            <Card title="Booking Info">
              <Info
                label="Status"
                value={
                  singleBooking?.status && (
                    <StatusBadge
                      status={singleBooking.status}
                      styles={bookingStatusStyles}
                    />
                  )
                }
              />
              <Info
                label="Budget"
                value={formatBudgetRange(singleBooking?.budgetRange)}
              />
              <Info
                label="Consult Date"
                value={formattedDate(singleBooking?.consultDate)}
              />
            </Card>

            {/* LONG TEXT FIELDS */}
            <Card title="Tattoo Details">
              <TextBlock label="Placement" value={singleBooking?.placement} />
              <TextBlock
                label="Description"
                value={singleBooking?.description}
              />
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-onyx shadow-sm rounded-2xl p-5">
            <h2 className="text-lg font-medium mb-4">Reference Images</h2>

            {uploads && uploads.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {uploads.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setIndex(i)}
                      className="relative w-full aspect-3/4 overflow-hidden rounded-lg border border-snow/50 shadow shadow-alabaster/20"
                    >
                      <BlurImage
                        src={img.secureUrl}
                        alt="reference"
                        fill
                        preload
                        blurDataURL="/images/placeholder.png"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </button>
                  ))}
                </div>

                {/* Lightbox */}
                <Lightbox
                  open={index >= 0}
                  close={() => setIndex(-1)}
                  slides={uploads.map((img) => ({
                    src: img.secureUrl,
                  }))}
                  plugins={[Zoom]}
                  className="cursor-zoom-in"
                />
              </>
            ) : (
              <p className="text-sm text-snow/50">No images uploaded</p>
            )}
          </div>
        </div>

        {/* BACK BUTTON */}

        <div>
          <Link href="/admin/booking" className="btn text-sm mt-10">
            <BsArrowLeft className="size-5" />
            Back to Bookings
          </Link>
        </div>
      </div>

      {isOpen && singleBooking && (
        <Modal onClose={() => setIsOpen(false)} title="Update Booking Status">
          <UpdateBookingStatusForm
            booking={singleBooking}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default BookingDetails;

/* ---------- UI COMPONENTS ---------- */

function Card({ title, children }: any) {
  return (
    <div className="bg-onyx shadow-sm rounded-2xl p-5">
      <h2 className="text-md font-semibold mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm border-b pb-1 border-snow/20">
      <span className="text-snow/50">{label}</span>
      <span className="font-medium text-right">{value || "-"}</span>
    </div>
  );
}

function TextBlock({ label, value }: any) {
  if (!value) return null;

  return (
    <div>
      <p className="text-sm text-snow/50 mb-1">{label}</p>
      <div className="text-sm bg-carbon-black rounded-xl p-3 leading-relaxed whitespace-pre-wrap">
        {value}
      </div>
    </div>
  );
}
