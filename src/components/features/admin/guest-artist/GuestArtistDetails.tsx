"use client";

import { useMemo, useState } from "react";
import useGuestArtist from "./useGuestArtist";
import { GuestArtistInfo } from "@/components/schema & types/guest-artist/guest-artist.types";
import { differenceInCalendarDays } from "date-fns";
import { toast } from "react-toastify";
import StatusBadge from "@/components/templates/admin/StatusBadge";
import { guestArtistStatusStyles } from "@/components/templates/admin/guest-artist/guestArtistStatusStyles";
import { CiCalendar, CiCreditCard1, CiEdit, CiTrash } from "react-icons/ci";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineTableCells } from "react-icons/hi2";
import formattedDate, { formatPrice } from "@/components/utils/formatter";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { BsArrowLeft } from "react-icons/bs";

function GuestArtistDetails() {
  const {
    singleGuestArtist,
    singleGuestArtistIsLoading,
    singleGuestArtistIsError,
    deleteGuestArtist,
    deleteGuestArtistIsPending,
  } = useGuestArtist();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const guestArtist = singleGuestArtist as GuestArtistInfo | undefined;

  const duration = useMemo(() => {
    if (!guestArtist) return 0;

    return (
      differenceInCalendarDays(
        new Date(guestArtist.endDate),
        new Date(guestArtist.startDate),
      ) + 1
    );
  }, [guestArtist]);

  if (singleGuestArtistIsLoading) {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="h-8 w-64 rounded bg-onyx" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-onyx" />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-112.5 rounded-2xl bg-onyx" />
          <div className="h-112.5 rounded-2xl bg-onyx" />
        </div>
      </div>
    );
  }

  if (singleGuestArtistIsError || !guestArtist) {
    toast.error("Failed to load guest artist");

    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p>Failed to load guest artist details</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-6 space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {guestArtist.name}
              </h1>

              <StatusBadge
                status={guestArtist.status}
                styles={guestArtistStatusStyles}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4 mt-3 text-sm text-snow/60">
              <a
                href={`mailto:${guestArtist.email}`}
                className="hover:text-snow transition-colors"
              >
                {guestArtist.email}
              </a>

              <span className="hidden sm:block">•</span>

              <a
                href={`tel:${guestArtist.phone}`}
                className="hover:text-snow transition-colors"
              >
                {guestArtist.phone}
              </a>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">
            <button
              className="btn flex items-center gap-x-2 text-sm"
              onClick={() => setIsOpen(true)}
            >
              <span>Update Status</span>
              <CiEdit className="size-5" />
            </button>

            <button
              className="btn bg-red-950 hover:bg-red-900 text-sm flex items-center gap-x-2"
              onClick={() => setIsDeleteOpen(true)}
            >
              <span>Delete</span>
              <CiTrash className="size-5" />
            </button>
          </div>
        </div>

        {/* METRICS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard
            icon={<HiOutlineClock className="size-6" />}
            label="Duration"
            value={`${duration} ${duration === 1 ? "Day" : "Days"}`}
          />

          <MetricCard
            icon={<HiOutlineTableCells className="size-6" />}
            label="Reserved Tables"
            value={`${guestArtist.numberOfTables} ${
              guestArtist.numberOfTables === 1 ? "Table" : "Tables"
            }`}
          />

          <MetricCard
            icon={<CiCreditCard1 className="size-6" />}
            label="Total Price"
            value={`$${formatPrice(guestArtist.totalPrice)}`}
            subValue={
              guestArtist.discountApplied > 0
                ? `${guestArtist.discountApplied}% discount applied`
                : undefined
            }
          />

          <MetricCard
            icon={<CiCalendar className="size-6" />}
            label="Reservation Dates"
            value={formattedDate(guestArtist.startDate)}
            subValue={`to ${formattedDate(guestArtist.endDate)}`}
          />
        </div>

        {/* CONTENT */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SIDE */}

          <div className="xl:col-span-2 space-y-6">
            {/* PERSONAL INFO */}

            <Card title="Guest Artist Information">
              <Info label="Full Name" value={guestArtist.name} />

              <Info
                label="Email Address"
                value={
                  <a
                    href={`mailto:${guestArtist.email}`}
                    className="hover:text-snow transition-colors"
                  >
                    {guestArtist.email}
                  </a>
                }
              />

              <Info
                label="Phone Number"
                value={
                  <a
                    href={`tel:${guestArtist.phone}`}
                    className="hover:text-snow transition-colors"
                  >
                    {guestArtist.phone}
                  </a>
                }
              />
            </Card>

            {/* RESERVATION */}

            <Card title="Reservation Details">
              <Info
                label="Start Date"
                value={formattedDate(guestArtist.startDate)}
              />

              <Info
                label="End Date"
                value={formattedDate(guestArtist.endDate)}
              />

              <Info
                label="Duration"
                value={`${duration} ${duration === 1 ? "day" : "days"}`}
              />

              <Info
                label="Tables Reserved"
                value={`${guestArtist.numberOfTables} ${
                  guestArtist.numberOfTables === 1 ? "table" : "tables"
                }`}
              />
            </Card>

            {/* PAYMENT */}

            <Card title="Payment Information">
              <Info
                label="Reservation Status"
                value={
                  <StatusBadge
                    status={guestArtist.status}
                    styles={guestArtistStatusStyles}
                  />
                }
              />

              <Info
                label="Total Price"
                value={`$${formatPrice(guestArtist.totalPrice)}`}
              />

              <Info
                label="Discount Applied"
                value={
                  guestArtist.discountApplied > 0
                    ? `${guestArtist.discountApplied}%`
                    : "No Discount"
                }
              />

              <Info
                label="Stripe Session"
                value={guestArtist.stripeSessionId || "-"}
              />
            </Card>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">
            {/* SUMMARY */}

            <Card title="Reservation Summary">
              <div className="rounded-2xl bg-carbon-black p-5 space-y-5">
                <div>
                  <p className="text-sm text-snow/50 mb-1">
                    Reservation Period
                  </p>

                  <p className="font-medium leading-relaxed">
                    {formattedDate(guestArtist.startDate)}
                    <br />
                    to
                    <br />
                    {formattedDate(guestArtist.endDate)}
                  </p>
                </div>

                <div className="border-t border-snow/10 pt-4 flex items-center justify-between">
                  <span className="text-snow/50 text-sm">Tables</span>

                  <span className="font-medium">
                    {guestArtist.numberOfTables}
                  </span>
                </div>

                <div className="border-t border-snow/10 pt-4 flex items-center justify-between">
                  <span className="text-snow/50 text-sm">Duration</span>

                  <span className="font-medium">{duration} days</span>
                </div>

                <div className="border-t border-snow/10 pt-4">
                  <p className="text-sm text-snow/50">Total Price</p>

                  <h3 className="text-3xl font-semibold mt-2">
                    ${formatPrice(guestArtist.totalPrice)}
                  </h3>

                  {guestArtist.discountApplied > 0 && (
                    <p className="text-sm text-green-400 mt-2">
                      {guestArtist.discountApplied}% discount applied
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* TIMELINE */}

            <Card title="Timeline">
              <div className="space-y-5">
                <TimelineItem
                  label="Created At"
                  value={formattedDate(guestArtist.createdAt)}
                />

                <TimelineItem
                  label="Last Updated"
                  value={formattedDate(guestArtist.updatedAt)}
                />

                <TimelineItem
                  label="Current Status"
                  value={
                    <StatusBadge
                      status={guestArtist.status}
                      styles={guestArtistStatusStyles}
                    />
                  }
                />
              </div>
            </Card>

            {/* ACKNOWLEDGMENT */}

            <Card title="Agreement">
              <div className="flex items-center justify-between">
                <span className="text-snow/60">Terms Accepted</span>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    guestArtist.acknowledgment
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {guestArtist.acknowledgment ? "Accepted" : "Not Accepted"}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* BACK BUTTON */}

        <div>
          <Link href="/admin/guest-artist" className="btn text-sm">
            <BsArrowLeft className="size-5" />
            Back to Guest Artists
          </Link>
        </div>
      </div>

      {/* MODAL */}

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          title="Update Guest Artist Status"
        >
          <div className="p-4">Coming Soon...</div>
        </Modal>
      )}

      {/* Delete Guest Artist */}
      {isDeleteOpen && (
        <Modal
          onClose={() => setIsDeleteOpen(false)}
          title="Deleting guest artist"
        >
          <ConfirmDelete
            resourceName={`Guest Artist ${guestArtist.name}`}
            disabled={deleteGuestArtistIsPending}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={() => {
              deleteGuestArtist(guestArtist.id, {
                onSuccess: () => {
                  setIsDeleteOpen(false);
                },
              });
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default GuestArtistDetails;

/* COMPONENTS  */

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-onyx rounded-2xl p-5 shadow-sm border border-snow/5">
      <h2 className="text-lg font-semibold mb-5">{title}</h2>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-snow/10 pb-3">
      <span className="text-sm text-snow/50">{label}</span>

      <span className="text-sm font-medium text-right break-all">
        {value || "-"}
      </span>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="bg-onyx rounded-2xl p-5 border border-snow/5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-snow/50 text-sm">{label}</span>

        <div className="text-snow/60">{icon}</div>
      </div>

      <h3 className="text-2xl font-semibold mt-4">{value}</h3>

      {subValue && <p className="text-xs text-green-400 mt-2">{subValue}</p>}
    </div>
  );
}

function TimelineItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="border-l border-snow/10 pl-4">
      <p className="text-xs uppercase tracking-wide text-snow/40 mb-1">
        {label}
      </p>

      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
