"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import LookBookSwiper from "@/components/templates/lookbook/Swiper";
import useArtist from "../artist/useArtist";
import BlurImage from "@/components/templates/skeleton/BlurImage";
import LookbookSkeleton from "@/components/templates/skeleton/skeletons/lookbook/LookbookSkeleton";
import LookbookSwiperSkeleton from "@/components/templates/skeleton/skeletons/lookbook/LookbookSwiperSkeleton";

interface GalleryImageProps {
  id: string;
  src: string;
  activeId: string | null;
  artistName: string;
  tags: string[];
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function LookBookContent() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTag = searchParams.get("tag");

  const { artistsLookbookItems, artistsLookbookIsLoading, allTags } =
    useArtist();

  const allWorks = useMemo(() => {
    return artistsLookbookItems.flatMap((artist) =>
      artist.latestWorks.map((work) => ({
        ...work,
        artistName: artist.displayName,
        artistSlug: artist.slug,
      })),
    );
  }, [artistsLookbookItems]);

  const filteredWorks = useMemo(() => {
    if (!selectedTag) return allWorks;

    return allWorks.filter((work) =>
      work.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase()),
    );
  }, [allWorks, selectedTag]);

  if (artistsLookbookIsLoading && artistsLookbookItems.length === 0) {
    return <LookbookSkeleton />;
  }

  const swiperImages = allWorks.slice(0, 6);
  const isSwiperLoading = artistsLookbookIsLoading && swiperImages.length === 0;

  return (
    <>
      {/* ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 mt-16">
        <div>
          <h1 className="text-5xl lg:text-6xl uppercase font-roboto_condensed flex flex-col gap-y-3">
            <span>Dig deep in</span>
            <span>Some of Our Styles</span>
          </h1>
        </div>

        <div>
          {isSwiperLoading ? (
            <LookbookSwiperSkeleton />
          ) : (
            <LookBookSwiper images={swiperImages} />
          )}
        </div>
      </div>

      {/* ROW 2 - FILTERS */}
      <div className="flex flex-wrap mt-16">
        <div className="p-5 rounded-xl bg-onyx/40 border border-white/5 backdrop-blur-sm w-full">
          <span className="text-[10px] text-snow/40 uppercase tracking-widest block mb-2 font-bold">
            Styles
          </span>

          {/* ALL */}
          <button
            type="button"
            onClick={() => router.push(pathname)}
            className={`px-4 py-2 mr-2 mb-2 rounded-[10px] transition-all duration-200 ${
              !selectedTag
                ? "bg-snow text-onyx"
                : "bg-onyx text-snow hover:bg-snow hover:text-onyx"
            }`}
          >
            All
          </button>

          {/* TAGS */}
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                if (selectedTag === tag) {
                  router.push(pathname);
                } else {
                  router.push(`${pathname}?tag=${encodeURIComponent(tag)}`);
                }
              }}
              className={`px-4 py-2 mr-2 mb-2 rounded-[10px] transition-all duration-200 capitalize ${
                selectedTag === tag
                  ? "bg-snow text-onyx"
                  : "bg-onyx text-snow hover:bg-snow hover:text-onyx"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE FILTER LABEL */}
      {selectedTag && (
        <div className="mt-8">
          <span className="text-sm text-snow/60">
            Showing works tagged with{" "}
            <span className="font-semibold text-snow">#{selectedTag}</span>
          </span>
        </div>
      )}

      {/* ROW 3 - GALLERY */}
      <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredWorks.map((work) => (
          <GalleryImage
            key={work.id}
            id={work.id}
            src={work.coverUrl}
            artistName={work.artistName}
            tags={work.tags}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </div>

      {!filteredWorks.length && (
        <div className="py-20 text-center text-snow/50">
          No works found for this style.
        </div>
      )}
    </>
  );
}

function GalleryImage({
  id,
  src,
  activeId,
  setActiveId,
  artistName,
  tags,
}: GalleryImageProps) {
  const isActive = activeId === id;

  return (
    <div
      onClick={() => setActiveId((prev) => (prev === id ? null : id))}
      className="relative w-full overflow-hidden rounded-2xl group aspect-3/4 cursor-pointer shadow shadow-snow/20 hover:shadow-md transition-all duration-200"
    >
      <BlurImage
        src={src}
        alt={`Tattoo by ${artistName}`}
        fill
        preload
        sizes="(max-width: 640px) 50vw,
               (max-width: 1024px) 33vw,
               (max-width: 1280px) 25vw,
               20vw"
        className={`
          object-cover
          transition-all duration-500
          ${isActive ? "grayscale-0 scale-105" : "grayscale"}
          group-hover:grayscale-0
          group-hover:scale-105
        `}
      />

      <div
        className={`
          absolute inset-0 z-10 flex flex-col justify-between p-4
          bg-linear-to-b from-black/40 via-transparent to-black/60
          transition-opacity duration-300
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      >
        <div className="-translate-y-2.5 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-snow font-bold text-sm md:text-base uppercase tracking-wider">
            {artistName}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 translate-y-2.5 group-hover:translate-y-0 transition-transform duration-300">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] md:text-xs bg-snow text-onyx px-2 py-0.5 rounded-md capitalize"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
