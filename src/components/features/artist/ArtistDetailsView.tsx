"use client";

import { useEffect, useState } from "react";
import { LuInstagram } from "react-icons/lu";
import useArtist from "./useArtist";
import BlurImage from "@/components/templates/skeleton/BlurImage";
import ArtistDetailsSkeleton from "@/components/templates/skeleton/skeletons/tattoo-artist/ArtistDetailsSkeleton";
import { toast } from "react-toastify";
import useLocalizedField from "@/components/hook/useLocalizedField";
import { useTranslations } from "next-intl";

function ArtistDetailsView() {
  const t = useTranslations("artists.artistDetails");
  const {
    artistBySlug,
    artistWorks,
    getArtistBySlugIsLoading,
    getArtistBySlugIsError,
  } = useArtist();

  const localizedField = useLocalizedField();

  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  if (getArtistBySlugIsLoading && !artistBySlug) {
    return <ArtistDetailsSkeleton />;
  }

  if (!artistBySlug) {
    return <div>{t("notFound")}</div>;
  }

  useEffect(() => {
    if (getArtistBySlugIsError) {
      toast.error(t("loadError"));
    }
  }, [getArtistBySlugIsError, t]);

  if (getArtistBySlugIsError)
    return (
      <div className="container">
        <p className="text-red-500">{t("loadError")}</p>
      </div>
    );

  return (
    <section className="py-16 px-[5%]">
      <div className="container mx-auto py-15">
        {/* Name  */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {artistBySlug.displayName}
          </h1>
        </div>

        {/* TOP SECTION: Image and Bio matched height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 items-stretch">
          {/* LEFT: Artist Image and Styles */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative w-full aspect-3/4 max-h-112.5 max-w-[285.533px] overflow-hidden rounded-2xl bg-onyx mb-6 border border-snow/20 shadow shadow-alabaster/20">
              <BlurImage
                src={artistBySlug.coverUrl}
                alt={artistBySlug.displayName}
                fill
                preload
                className="object-cover grayscale"
              />
            </div>

            {/* Styles under the image */}
            <div className="flex flex-wrap">
              {artistWorks?.flatMap((work) =>
                work.tags.map((tag) => (
                  <button
                    key={`${work.coverUrl}-${work.createdAt}`}
                    type="button"
                    className="px-4 py-2 mr-2 mb-2 rounded-[10px] transition-all duration-200 bg-onyx text-snow hover:bg-snow hover:text-onyx font-light text-sm capitalize"
                  >
                    #{tag}
                  </button>
                )),
              )}
            </div>
          </div>

          {/* RIGHT: Bio & Info Cards */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col h-full">
              {/* Scrollable Bio Area (Matches image height) */}
              <div className="overflow-y-auto pr-4 h-112.5">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-snow/40 font-bold mb-4 pt-1">
                  {t("biography")}
                </h3>
                <p className="text-lg leading-relaxed text-snow/75 font-light">
                  {localizedField(artistBySlug, "bio") || t("noBio")}
                </p>
              </div>

              {/* Info Cards (Matches height logic) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-snow/20 mb-auto">
                <div className="p-5 rounded-xl bg-onyx/40 border border-white/5 backdrop-blur-sm">
                  <span className="text-[10px] text-snow/40 uppercase tracking-widest block mb-1 font-bold">
                    {t("socialMedia")}
                  </span>
                  {/* <span className="flex items-center gap-3 text-sm font-medium">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${artistBySlug.status === "ACTIVE" ? "bg-green-600 animate-caret-blink" : "bg-red-600"}`}
                    />
                    {artistBySlug.status === "ACTIVE"
                      ? "Available"
                      : "In Active"}
                  </span> */}
                  <a
                    className="flex items-center gap-2 text-snow/75 hover:text-snow transition-colors w-fit"
                    href={`https://instagram.com/${artistBySlug.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center justify-center size-6 rounded-md bg-linear-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] shadow-md transition-transform duration-300 group-hover:scale-105">
                      <LuInstagram size={18} />
                    </div>
                    <span>{artistBySlug.handle}</span>
                  </a>
                </div>

                <div className="p-5 rounded-xl bg-onyx/40 border border-white/5 backdrop-blur-sm flex flex-col">
                  <span className="text-[10px] text-snow/40 uppercase tracking-widest block mb-1 font-bold">
                    {t("location")}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">📍</span>
                    <span className="text-sm font-medium truncate">
                      {t("studioLocation")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Full Width Recent Work */}
        <div className="mt-10 border-t border-snow/10 pt-10">
          <h2 className="text-2xl font-bold mb-10 uppercase tracking-tight">
            {t("recentWorks")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {artistWorks?.map((work) => (
              <div
                key={work.id}
                onClick={() =>
                  setActiveId(activeId === work.id ? undefined : work.id)
                }
                className="relative w-full overflow-hidden rounded-2xl group aspect-3/4 cursor-pointer transition-all duration-200 border border-snow/20 shadow shadow-alabaster/20 hover:shadow-md"
              >
                <BlurImage
                  src={work.coverUrl}
                  alt={t("galleryImageAlt")}
                  fill
                  className={`
                    object-cover
                    transition-all duration-500
                    ${activeId === work.id ? "grayscale-0 scale-105" : "grayscale"}
                    sm:group-hover:grayscale-0
                    sm:group-hover:scale-105
                  `}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtistDetailsView;
