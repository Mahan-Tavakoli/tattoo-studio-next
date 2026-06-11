import { ArtistWork } from "@/components/schema & types/artist/artist.types";
import Table from "@/components/ui/Table";
import Image from "next/image";

interface ArtistLookbookRowProps {
  index: number;
  work: ArtistWork;
}

function ArtistLookbookRow({ work, index }: ArtistLookbookRowProps) {
  return (
    <Table.Row>
      <td>{index}</td>
      <td>{work.title}</td>
      <td>
        <div className="relative w-10 h-10 mx-auto">
          <Image
            src={work?.coverUrl}
            alt={work.title}
            fill
            priority
            className="object-center mx-auto object-cover rounded-md border border-snow/50 grayscale"
          />
        </div>
      </td>
      <td>
        {work.tags.map((workTag, index) => (
          <span
            key={index}
            className="capitalize font-light px-4 py-2 rounded-[10px] transition-all duration-200 bg-onyx text-snow"
          >
            #{workTag}
          </span>
        ))}
      </td>
    </Table.Row>
  );
}

export default ArtistLookbookRow;
