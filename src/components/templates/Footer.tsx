import Image from "next/image";
import { headerMenu, socialMedia } from "../constants/Navigation";
import Link from "next/link";
import BlurImage from "./skeleton/BlurImage";

function Footer() {
  return (
    <section className=" border-t border-snow/20 bg-onyx">
      <div className="container mx-auto mb-10 px-[5%]">
        <div className="grid grid-cols-12 gap-y-8 px-4 py-6 text-[14px]">
          <div className="col-span-full md:col-span-2 relative w-20 h-20">
            <div className="relative lg:w-18 lg:h-18 w-16 h-16 order-1 lg:order-0">
              <BlurImage
                src="/images/Logo.png"
                alt="Logo"
                fill
                preload
                blurDataURL="/images/placeholder.png"
                className="object-cover"
              />
            </div>
          </div>

          <div className="col-span-full md:col-span-6 order-3 md:order-0 space-y-3">
            <p className="text-dried-mustard text-base font-bold text-center">
              Pages
            </p>
            <div className="flex justify-evenly">
              <div className="grid grid-cols-3 gap-y-3 sm:text-sm text-xs w-full mx-auto">
                {headerMenu?.map((page) => (
                  <Link
                    key={page.id}
                    href={page.href}
                    className="hover:text-alabaster transition-colors duration-300 text-center leading-6 w-auto"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 order-1 md:order-0 space-y-3">
            <p className="text-dried-mustard text-center text-base font-bold">
              Quick Access
            </p>
            <div className="flex flex-col items-center gap-y-3 sm:text-sm text-xs">
              <Link
                href="/terms-of-service"
                className="hover:text-alabaster transition-colors duration-300 text-center leading-6"
              >
                Terms of service
              </Link>
              <Link
                href="/FAQ"
                className="hover:text-alabaster transition-colors duration-300 text-center leading-6"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 order-2 md:order-0 space-y-3">
            <p className="text-dried-mustard text-center text-base font-bold">
              Social Media
            </p>
            <div className="flex flex-col items-center gap-y-4 sm:text-sm text-xs">
              {socialMedia.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  className={`${social.className} rounded-sm p-0.5 leading-6`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black font-bold p-4 sm:text-[11px] min-[500px]:max-sm:text-[10px] text-[8px] flex justify-center items-center gap-x-1 border-t border-snow/20">
        <span className="font-sans text-base">©</span>
        <span>All rights belongs to Block 13 Tattoo Studio</span>
      </div>
    </section>
  );
}

export default Footer;
