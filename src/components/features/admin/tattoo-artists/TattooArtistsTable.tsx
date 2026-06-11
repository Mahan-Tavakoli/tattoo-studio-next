"use client";

import { useState } from "react";
import useArtist from "../../artist/useArtist";
import { ArtistInfo } from "@/components/schema & types/artist/artist.types";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import TattooArtistsRow from "./TattooArtistsRow";
import TattooArtistsForm from "./TattooArtistsForm";
import { toast } from "react-toastify";
import usePagination from "@/components/hook/usePagination";
import Pagination from "@/components/templates/admin/Pagination";

function TattooArtistsTable() {
  const { allArtists, allArtistsIsError, allArtistsIsLoading } = useArtist();

  const { currentPage, paginatedData, setCurrentPage, totalPages } =
    usePagination(allArtists || []);

  const [artistToEdit, setArtistToEdit] = useState<ArtistInfo | null>(null);

  if (allArtistsIsError) {
    toast.error("Failed to load artists");
    return (
      <div className="text-red-500 text-sm">
        Failed to load artists. Try again.
      </div>
    );
  }

  return (
    <>
      <Table>
        <Table.Header>
          <th className="py-2">#</th>
          <th>Name</th>
          <th>Avatar</th>
          <th>Lookbook</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Status</th>
          <th>Instagram</th>
          <th>Operation</th>
        </Table.Header>
        <Table.Body>
          {allArtistsIsLoading ? (
            [...Array(6)].map((_, i) => (
              <Table.Row key={i}>
                <td colSpan={9}>
                  <div className="h-10 bg-snow/10 animate-pulse rounded" />
                </td>
              </Table.Row>
            ))
          ) : allArtists?.length === 0 ? (
            <Table.Row>
              <td colSpan={4} className="py-4">
                No Artist defined yet
              </td>
            </Table.Row>
          ) : (
            paginatedData.map((artist, index) => (
              <TattooArtistsRow
                key={artist.id}
                artist={artist}
                //index={(currentPage - 1) * 6 + index}
                index={index}
                onEdit={() => setArtistToEdit(artist)}
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
      {/* Edit Course */}
      {artistToEdit && (
        <Modal
          title={`Edit ${artistToEdit.displayName}`}
          onClose={() => setArtistToEdit(null)}
        >
          <TattooArtistsForm
            artistToEdit={artistToEdit}
            onClose={() => setArtistToEdit(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default TattooArtistsTable;
