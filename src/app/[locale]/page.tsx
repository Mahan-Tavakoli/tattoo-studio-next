import { HomePageContent } from "@/components/constants/Constants";
import Review from "@/components/features/review/Review";
import StudioIntro from "@/components/templates/home/StudioIntro";
import StudioMarquee from "@/components/templates/home/StudioMarquee";
import BlurImage from "@/components/templates/skeleton/BlurImage";
import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import { useTranslations } from "next-intl";

function Home() {
  const t = useTranslations("home");

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
          {t("videoFallback")}
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center gap-y-10">
          <h1 className="text-6xl lg:text-8xl drop-shadow-2xl px-[20%] text-nowrap flex items-center justify-center flex-col font-blakely">
            <span>Block 13</span>
            <span>Tattoo Studio</span>
          </h1>

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

      {/* Statement & Stats */}
      <StudioIntro />
      {/* <StudioMarquee /> */}

      {/* main */}
      <div className="py-24 px-[5%] ">
        <div className="container mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HomePageContent.map((c) => (
              <Link
                key={c.id}
                href={c.linkHref}
                className="relative w-full aspect-3/4 overflow-hidden rounded-2xl bg-onyx transition-all duration-500 ease-in-out group cursor-pointer border border-snow/20 shadow shadow-alabaster/20 hover:shadow-md hover:z-10"
              >
                <BlurImage
                  src={c.imgSrc}
                  alt={c.titleKey}
                  fill
                  preload
                  blurDataURL="/images/placeholder.png"
                  className="object-cover transition-transform duration-500 group-hover:blur-sm grayscale"
                />

                <div className="absolute inset-0 bg-linear-to-t from-onyx via-onyx/40 to-transparent">
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 group-hover:bottom-1/2 group-hover:translate-y-1/2 transition-all duration-500 ease-in-out">
                    <span className="text-lg sm:text-xl lg:text-2xl text-center whitespace-nowrap">
                      {t(c.titleKey)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Comment Section */}
          <Review />
        </div>
      </div>
    </>
  );
}

export default Home;
