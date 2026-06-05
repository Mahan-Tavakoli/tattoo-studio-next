"use client";

import { NavItem } from "@/components/constants/Constants";
import useAuth from "@/components/features/auth/useAuth";
import { Power } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function Sidebar({ items }: { items: NavItem[] }) {
  const { logout, logoutIsPending } = useAuth();
  const pathname = usePathname();

  const t = useTranslations("admin");
  const common = useTranslations("common");

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const logoutHandler = () => {
    logout();
  };

  return (
    <aside className="hidden md:flex flex-col justify-between py-4 text-2xl max-h-screen sticky top-0 overflow-y-auto bg-onyx rounded-l border-r border-r-snow/20">
      <ul className="flex flex-col gap-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center w-[95%] mx-auto text-sm"
          >
            <Link
              href={item.href}
              className={`cursor-pointer px-2 py-3 rounded-sm transition-all duration-300 w-full flex gap-x-2 items-center ${
                isActive(item.href)
                  ? "bg-snow/5 font-bold text-dried-mustard hover:bg-snow/10"
                  : "hover:bg-snow/10"
              }`}
            >
              <div className="flex w-full items-center justify-between gap-x-4">
                <span>{t(item.titleKey)}</span>
                <span className="opacity-75">{item.icon}</span>
              </div>
            </Link>
          </li>
        ))}

        {/* Logout */}
        <li className="flex w-[95%] mx-auto text-sm">
          <button
            onClick={logoutHandler}
            className="cursor-pointer px-2 py-3 rounded-lg transition-all duration-300 w-full flex items-center justify-between hover:bg-red-600 gap-x-2"
          >
            <span>{logoutIsPending ? "..." : common("logout")}</span>

            <Power className="size-5 opacity-75" />
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
