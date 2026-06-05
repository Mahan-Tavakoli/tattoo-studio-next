import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { headerMenu } from "@/components/constants/Constants";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

interface HeaderMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function HeaderMenu({ isOpen, onOpenChange }: HeaderMenuProps) {
  const pathname = usePathname();
  const t = useTranslations("header");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        onOpenChange(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onOpenChange]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="bg-onyx text-snow overflow-y-auto text-lg font-roboto_condensed font-semibold uppercase"
      >
        <SheetHeader className="border-b border-snow/5">
          <SheetTitle className="flex flex-col">
            <div className="relative w-12 h-12">
              <Image
                src="/images/Logo.png"
                alt="Logo"
                fill
                quality={75}
                className="object-cover"
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav
          className={`flex flex-col items-center justify-center gap-y-4 w-[95%] mx-auto bg-night/85 h-96 text-2xl font-bebas-neue`}
        >
          {headerMenu.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`transition-colors duration-200 ${pathname === item?.href ? "text-dried-mustard" : "hover:text-dried-mustard"}`}
              onClick={() => onOpenChange(false)}
            >
              <span>{t(item.titleKey)}</span>
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </SheetContent>
    </Sheet>
  );
}

export default HeaderMenu;
