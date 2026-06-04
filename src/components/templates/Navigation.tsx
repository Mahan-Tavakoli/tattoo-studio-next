"use client";

import { navMenu, AdminSidebarItems } from "@/components/constants/Constants";
import BottomNav from "./BottomNav";
import { usePathname } from "@/i18n/navigation";

function Navigation() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  return <BottomNav items={isAdmin ? AdminSidebarItems : navMenu} />;
}

export default Navigation;
