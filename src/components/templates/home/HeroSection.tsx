"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";

function HeroSection() {
  const t = useTranslations("home");
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  useEffect(() => {
    document.fonts.load('1em "Blakely"').then(() => {
      setFontLoaded(true);
    });
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 " />
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.png"
        className="absolute inset-0 h-full w-full object-cover brightness-75 transition-opacity duration-700 "
      >
        <source src="/videos/video.mp4" type="video/mp4" />
        {t("videoFallback")}
      </video>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center gap-y-10">
        {fontLoaded ? (
          <h1 className="text-6xl lg:text-8xl drop-shadow-2xl px-[20%] text-nowrap flex items-center justify-center flex-col font-blakely">
            <span>Block 13</span>
            <span>Tattoo Studio</span>
          </h1>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-16 w-80 rounded bg-snow/10 animate-pulse" />
            <div className="h-16 w-96 rounded bg-snow/10 animate-pulse" />
          </div>
        )}

        <div className="flex items-center justify-center md:gap-x-10 md:flex-row flex-col space-y-5 md:space-y-0">
          <Link
            href="/booking"
            className="border border-snow/30 px-4 py-2 flex items-center justify-between w-55 rounded-full hover:border-snow/75 transition-colors duration-200 group"
          >
            <span>{t("booking")}</span>
            <MdArrowRightAlt
              size={22}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>

          <Link
            href="/guest"
            className="border border-snow/30 px-4 py-2 flex items-center justify-between w-55 rounded-full hover:border-snow/75 transition-colors duration-200 group"
          >
            <span>{t("guestArtist")}</span>
            <MdArrowRightAlt
              size={22}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
