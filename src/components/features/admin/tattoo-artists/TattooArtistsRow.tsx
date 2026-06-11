import { ArtistInfo } from "@/components/schema & types/artist/artist.types";
import useArtist from "../../artist/useArtist";
import { toast } from "react-toastify";
import Table from "@/components/ui/Table";
import Image from "next/image";
import Link from "next/link";
import { PiTrash } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import DotsLoader from "@/components/ui/DotsLoader";

interface TattooArtistsRowProps {
  index: number;
  onEdit: () => void;
  artist: ArtistInfo;
}

function TattooArtistsRow({ artist, index, onEdit }: TattooArtistsRowProps) {
  const { editArtistStatus, editArtistStatusIsPending } = useArtist();

  const handleActiveToggle = () => {
    editArtistStatus({
      artistId: artist?.id,
      status: artist.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    });
  };

  return (
    <Table.Row>
      <td>{index}</td>
      <td>
        <Link
          href={`/tattoo-artists/${artist?.slug}`}
          className="btn text-xs mx-auto"
        >
          {artist?.displayName}
        </Link>
      </td>
      <td>
        <div className="relative w-10 h-10">
          <Image
            src={artist?.coverUrl}
            alt={artist?.displayName}
            fill
            priority
            className="object-center mx-auto object-cover rounded-md border border-snow/50 grayscale"
          />
        </div>
      </td>
      <td>
        <Link
          href={`/admin/tattoo-artists/${artist.id}`}
          className="btn text-xs mx-auto"
        >
          {artist.displayName}'s Works
        </Link>
      </td>
      <td>
        <a href={`tel:${artist.phone}`} className="btn text-xs mx-auto">
          {artist.phone}
        </a>
      </td>
      <td>
        <a href={`mailto:${artist.email}`} className="btn text-xs mx-auto">
          {artist.email}
        </a>
      </td>
      <td>
        <div className="flex items-center justify-center gap-3">
          {/* Status Text */}
          <span
            className={`text-xs font-medium tracking-wide transition-colors duration-300
      ${artist.status === "ACTIVE" ? "text-green-400" : "text-snow/40"}`}
          >
            {artist.status === "ACTIVE" ? "Active" : "Inactive"}
          </span>

          {/* Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={artist.status === "ACTIVE"}
            disabled={editArtistStatusIsPending}
            onClick={handleActiveToggle}
            className={`
        relative flex items-center w-14 h-7 rounded-full
        transition-all duration-300 ease-in-out
        ${
          artist.status === "ACTIVE"
            ? "bg-green-500/20 border border-green-500/30"
            : "bg-snow/10 border border-snow/10"
        }
        ${editArtistStatusIsPending && "opacity-60 cursor-not-allowed"}
      `}
          >
            <span
              className={`
          absolute left-1 flex items-center justify-center
          w-6 h-6 rounded-full bg-snow
          transition-all duration-300 ease-in-out
          ${artist.status === "ACTIVE" ? "translate-x-6" : "translate-x-0"}
        `}
            >
              {editArtistStatusIsPending ? (
                <DotsLoader />
              ) : (
                <span
                  className={`w-2 h-2 rounded-full ${
                    artist.status === "ACTIVE" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              )}
            </span>
          </button>
        </div>
      </td>
      <td>
        <a
          href={`https://instagram.com/${artist.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn text-xs mx-auto"
        >
          @{artist.handle}
        </a>
      </td>
      <td className="flex justify-center items-center gap-x-4">
        <button
          className="flex items-center justify-between w-24 text-xs btn"
          onClick={onEdit}
        >
          <span>Edit</span>
          <CiEdit className="size-5" />
        </button>
      </td>
    </Table.Row>
  );
}

export default TattooArtistsRow;
