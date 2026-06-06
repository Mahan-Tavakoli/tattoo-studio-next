import { useLocale } from "next-intl";

export default function useLocalizedField() {
  const locale = useLocale();

  return <T extends Record<string, any>>(item: T, field: string) => {
    const suffix = locale === "de" ? "De" : "En";

    return item[`${field}${suffix}` as keyof T];
  };
}
