"use client";

import { NavItem } from "@/components/constants/Navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

function BottomNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const MAX_VISIBLE = 4;
  const visibleItems = items.slice(0, MAX_VISIBLE);
  const overflowItems = items.slice(MAX_VISIBLE);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 px-1 rounded-l-full translate-x-1 w-full backdrop-blur border border-snow/20 z-50">
        <ul className="flex items-center py-2">
          {visibleItems.map((item) => (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center text-xs gap-1 py-2 transition w-full ${
                  isActive(item.href) ? "text-dried-mustard" : "text-snow/75"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
          {/* More items button */}
          {overflowItems.length > 0 && (
            <li className="flex-1">
              <button
                onClick={() => setIsOpen(true)}
                className="flex flex-col items-center justify-center text-xs gap-1 py-2 transition w-full text-snow/75"
              >
                <span className="text-lg">
                  <BsThreeDots />
                </span>
                {/* <BsThreeDots className="size-5"/> */}
                <span>More</span>
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* OVERFLOW MENU (BOTTOM SHEET) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            {/* BACKDROP */}
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* SHEET */}
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-onyx rounded-t-2xl p-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <div className="w-10 h-1 bg-snow/30 rounded mx-auto mb-4" />

              <ul className="space-y-3">
                {overflowItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-xl hover:bg-carbon-black transition ${
                        isActive(item.href)
                          ? "text-dried-mustard"
                          : "text-snow/75"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BottomNav;
