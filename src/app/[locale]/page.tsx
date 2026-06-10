import { HomePageContent } from "@/components/constants/Constants";
import Review from "@/components/features/review/Review";
import StudioIntro from "@/components/templates/home/StudioIntro";
import BlurImage from "@/components/templates/skeleton/BlurImage";
import { MdArrowRightAlt } from "react-icons/md";
import { useTranslations } from "next-intl";
import Link from "next/link";
import HeroSection from "@/components/templates/home/HeroSection";

function Home() {
  const t = useTranslations("home");

  return (
    <>
      <HeroSection />

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
