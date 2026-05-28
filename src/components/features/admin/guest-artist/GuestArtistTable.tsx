"use client";

import { toast } from "react-toastify";
import useGuestArtist from "./useGuestArtist";
import Table from "@/components/ui/Table";
import GuestArtistRow from "./GuestArtistRow";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { GuestArtistInfo } from "@/components/schema & types/guest-artist/guest-artist.types";
import UpdateGuestArtistForm from "./UpdateGuestArtistForm";

function GuestArtistTable() {
  const {
    guestArtists,
    guestArtistsIsError,
    guestArtistsIsLoading,
    deleteGuestArtist,
    deleteGuestArtistIsPending,
  } = useGuestArtist();
  console.log("guestArtists =>", guestArtists);
  const [guestArtistToEdit, setGuestArtistToEdit] =
    useState<GuestArtistInfo | null>(null);
  const [guestArtistToDelete, setGuestArtistToDelete] =
    useState<GuestArtistInfo | null>(null);

  if (guestArtistsIsError) {
    toast.error("Failed to load guest artists, try again");
    return (
      <div className="container">
        <p className="text-red-500">Failed to load guest artists</p>
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
          <th>Date</th>
          <th>Details</th>
          <th>Operation</th>
        </Table.Header>
        <Table.Body>
          {guestArtistsIsLoading ? (
            [...Array(6)].map((_, i) => (
              <Table.Row key={i}>
                <td colSpan={9}>
                  <div className="h-10 bg-snow/10 animate-pulse rounded" />
                </td>
              </Table.Row>
            ))
          ) : guestArtists.length === 0 ? (
            <Table.Row>
              <td colSpan={4} className="py-4">
                No Bookings yet
              </td>
            </Table.Row>
          ) : (
            guestArtists.map((guestArtist, index) => (
              <GuestArtistRow
                key={guestArtist.id}
                guestArtist={guestArtist}
                //index={(currentPage - 1) * 6 + index}
                index={index}
                onEdit={() => setGuestArtistToEdit(guestArtist)}
                onDelete={() => setGuestArtistToDelete(guestArtist)}
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

      {/* Edit Course */}
      {guestArtistToEdit && (
        <Modal
          onClose={() => setGuestArtistToEdit(null)}
          title="Update Booking Status"
        >
          <UpdateGuestArtistForm
          // booking={guestArtistToEdit}
          // onClose={() => setGuestArtistToEdit(null)}
          />
        </Modal>
      )}

      {guestArtistToDelete && (
        <Modal
          onClose={() => setGuestArtistToDelete(null)}
          title="Deleting guest artist"
        >
          <ConfirmDelete
            resourceName={`Guest Artist ${guestArtistToDelete.name}`}
            disabled={deleteGuestArtistIsPending}
            onClose={() => setGuestArtistToDelete(null)}
            onConfirm={() => {
              deleteGuestArtist(guestArtistToDelete.id, {
                onSuccess: () => {
                  setGuestArtistToDelete(null);
                },
              });
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default GuestArtistTable;
