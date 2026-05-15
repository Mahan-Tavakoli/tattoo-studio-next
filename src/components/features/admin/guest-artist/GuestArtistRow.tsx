import { GuestArtistInfo } from "@/components/schema & types/guest-artist/guest-artist.types";
import Table from "@/components/ui/Table";
import formattedDate from "@/components/utils/formatter";
import { CiEdit, CiTrash } from "react-icons/ci";
import Link from "next/link";

interface GuestArtistRowProps {
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  guestArtist: GuestArtistInfo;
}

function GuestArtistRow({
  guestArtist,
  index,
  onEdit,
  onDelete,
}: GuestArtistRowProps) {
  return (
    <>
      <Table.Row>
        <td>{index + 1}</td>
        <td>{guestArtist.name}</td>
        <td>
          <a
            href={`mailto:${guestArtist.email}`}
            className="btn text-xs mx-auto"
          >
            {guestArtist.email}
          </a>
        </td>
        <td>
          <a href={`tel:${guestArtist.phone}`} className="btn text-xs mx-auto">
            {guestArtist.phone}
          </a>
        </td>
        <td>
          {formattedDate(guestArtist.startDate)} -{" "}
          {formattedDate(guestArtist.endDate)}
        </td>
        <td>
          <Link href={`/admin/guest-artist/${guestArtist.id}`} className="btn">
            View Details
          </Link>
        </td>
        <td>
          <div className="flex items-center justify-center gap-2">
            {/* Edit */}

            <button
              className="flex items-center justify-center size-9 rounded-xl border border-snow/10 hover:bg-black bg-onyx text-snow/75 text-center transition-all duration-300 hover:border-snow/25"
              onClick={onEdit}
            >
              <CiEdit className="size-5" />
            </button>
            {/* DELETE */}

            <button
              className="flex items-center justify-center size-9 rounded-xl border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 text-red-400 transition-colors"
              onClick={onDelete}
            >
              <CiTrash className="size-5" />
            </button>
          </div>
        </td>
      </Table.Row>
    </>
  );
}

export default GuestArtistRow;
