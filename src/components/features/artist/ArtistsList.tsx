"use client";

import useArtist from "./useArtist";
import { LuInstagram } from "react-icons/lu";
import Link from "next/link";
import ArtistListSkeleton from "@/components/templates/skeleton/skeletons/tattoo-artist/ArtistListSkeleton";
import { toast } from "react-toastify";
import BlurImage from "@/components/templates/skeleton/BlurImage";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

function ArtistsList() {
  const t = useTranslations("artists.artistsList");
  const {
    artistsLookbookItems,
    artistsLookbookIsLoading,
    artistsLookbookIsError,
  } = useArtist();

  const skeletons = [...Array(8)];

  useEffect(() => {
    if (artistsLookbookIsError) {
      toast.error(t("loadError"));
    }
  }, [artistsLookbookIsError, t]);

  if (artistsLookbookIsError)
    return (
      <div className="container">
        <p className="text-red-500">{t("loadError")}</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artistsLookbookIsLoading
        ? skeletons.map((_, i) => <ArtistListSkeleton key={i} />)
        : artistsLookbookItems?.map((artist) => (
            <Link
              href={`/tattoo-artists/${artist.slug}`}
              key={artist.id}
              className="relative w-full aspect-3/4 overflow-hidden rounded-2xl bg-onyx transition-all duration-500 ease-in-out hover:z-10 group/card cursor-pointer hover:opacity-100! border border-snow/20 shadow shadow-alabaster/20 hover:shadow-md"
            >
              {/* Artist Image */}
              <BlurImage
                src={artist.coverUrl}
                alt={artist.displayName}
                fill
                preload
                blurDataURL="/images/placeholder.png"
                className="object-cover transition-transform duration-700 group-hover/card:scale-110 group-hover/card:blur-sm grayscale "
              />

              {/* Name Badge (Top Left) */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-onyx text-snow/75 px-3 py-1.5 text-base font-medium backdrop-blur-md hover:text-snow transition-colors hover:bg-carbon-black border border-snow/20 rounded-lg">
                  {artist.displayName}
                </span>
              </div>

              {/* Status Badge (Top Right - Optional) */}
              {/* <div className="absolute top-4 right-4 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <span className={``}>
              <GoDotFill
                className={`${artist.status === "ACTIVE" ? "text-green-600 animate-caret-blink" : "text-red-600"}`}
              />
            </span>
          </div> */}

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-onyx via-onyx/40 to-transparent translate-y-full group-hover/card:translate-y-0 transition-transform duration-500">
                {/* <p className="text-snow/75 text-sm mb-4 line-clamp-3">
              {artist.bio || "No bio available for this artist."}
            </p> */}

                <div className="flex flex-col gap-3 border-t border-alabaster/20 pt-4">
                  <div
                    //href={`https://instagram.com/${artist.handle}`}
                    className="flex items-center gap-2 text-snow/75 hover:text-snow transition-colors w-fit"
                  >
                    <LuInstagram size={18} />
                    <span>{artist.handle}</span>
                  </div>
                  {/* <a
                    href={`tel:${artist.phone}`}
                    className="flex items-center gap-2 text-snow/75 hover:text-snow transition-colors"
                  >
                    <LuPhone size={18} />
                    <span className="text-sm">{artist.phone}</span>
                  </a> */}
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
}

export default ArtistsList;
