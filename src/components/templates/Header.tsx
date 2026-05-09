"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AdminSidebarItems,
  headerMenu,
} from "@/components/constants/Navigation";
import { usePathname } from "next/navigation";
import { LuMenu } from "react-icons/lu";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import AuthContainer from "@/components/features/auth/AuthContainer";
import { PiUser } from "react-icons/pi";
import useCurrentUser from "../features/auth/useCurrentUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsCaretDown } from "react-icons/bs";
import { HiOutlinePower } from "react-icons/hi2";
import useAuth from "../features/auth/useAuth";
import DotsLoader from "../ui/DotsLoader";
import BlurImage from "./skeleton/BlurImage";

function Header() {
  const { logout, logoutIsPending } = useAuth();
  const { user, currentUserIsLoading } = useCurrentUser();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between text-lg font-roboto_condensed font-semibold uppercase px-[5%] transition-all duration-500 ease-in-out border-b border-snow/3 py-3 ${isScrolled ? " bg-onyx backdrop-blur-md shadow-md shadow-black" : " bg-transparent"}
  `}
      >
        {/* small devices menu */}
        <div className="lg:hidden flex items-center justify-center order-2">
          <button
            className="group relative h-14 w-14 flex items-center justify-center rounded-full bg-snow border border-onyx/20 transition-all duration-300 hover:scale-110 active:scale-95 z-50"
            onClick={() => setIsDrawerOpen(true)}
          >
            <LuMenu size={22} className="text-onyx" />
          </button>
        </div>
        {/* Admin Login Modal & Logo */}

        {currentUserIsLoading ? (
          <div className="lg:w-18 lg:h-18 w-14 h-14 bg-snow/10 animate-pulse rounded-full" />
        ) : !user ? (
          <button
            className="relative lg:w-18 lg:h-18 w-14 h-14 order-1 lg:order-0"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            <BlurImage
              src="/images/Logo.png"
              alt="Logo"
              fill
              preload
              blurDataURL="/images/placeholder.png"
              className="object-cover"
            />
          </button>
        ) : (
          <DropdownMenu dir="ltr">
            <DropdownMenuTrigger className="focus:outline-none py-3">
              <div className="p-1 border border-snow/20 rounded-md hover:bg-transparent/50 hover:border-snow/50 transition-colors duration-200 w-24 flex items-center justify-between bg-transparent">
                <PiUser className="size-7" />

                {/* <Image
                      src="/image/user.jpg"
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full"
                    /> */}
                <BsCaretDown className="w-5 h-5" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-onyx text-alabaster border-snow/50">
              {AdminSidebarItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  asChild
                  className="cursor-pointer px-2 py-3 mt-0.5"
                >
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between w-full gap-x-2 cursor-pointer px-2 py-3 rounded-sm transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-snow/5 font-bold text-dried-mustard hover:bg-snow/10"
                        : "hover:bg-snow/10"
                    }`}
                  >
                    <span>{item.title}</span>
                    <span className="opacity-75">{item.icon}</span>
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator className="bg-snow/20" />

              <DropdownMenuItem
                onClick={logoutHandler}
                disabled={logoutIsPending}
                className="flex items-center justify-between gap-x-2 hover:bg-red-700 cursor-pointer p-2 transition-colors duration-200 focus:text-white-smoke/80"
              >
                <span>{logoutIsPending ? <DotsLoader /> : "Logout"}</span>
                <HiOutlinePower className="w-6! h-6! opacity-75" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Navabr */}
        <nav className="w-[75%] mx-auto lg:flex hidden lg:items-center lg:justify-center">
          <ul className="w-full lg:static overflow-hidden  lg:rounded-full gap-x-8  lg:flex lg:items-center lg:justify-between px-1">
            {headerMenu.map((item) => (
              <li key={item.id} className="">
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 ${pathname === item?.href ? "text-dried-mustard" : "hover:text-dried-mustard"}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <HeaderMenu isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} />

      {isModalOpen && (
        <Modal title="Admin Login" onClose={() => setIsModalOpen(false)}>
          <AuthContainer onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default Header;
