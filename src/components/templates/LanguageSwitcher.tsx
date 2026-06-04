"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function changeLocale(newLocale: string) {
    router.replace(pathname, {
      locale: newLocale,
    });
  }

  return (
    <select
      value={locale}
      onChange={(e) => changeLocale(e.target.value)}
      className="bg-transparent border border-snow/20 rounded-md px-3 py-2 cursor-pointer"
    >
      <option value="en">ENG</option>
      <option value="de">DE</option>
    </select>
  );
}

export default LanguageSwitcher;
