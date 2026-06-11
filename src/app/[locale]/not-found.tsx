import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-carbon-black px-6 py-20 text-center">
      {/* Ghost 404 background number */}
      <span
        className="pointer-events-none absolute select-none text-[240px] font-bold leading-none tracking-tighter text-snow/30"
        aria-hidden="true"
      >
        404
      </span>

      {/* Tattoo needle icon */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6 opacity-70"
        aria-hidden="true"
      >
        <line
          x1="32"
          y1="4"
          x2="32"
          y2="52"
          stroke="#888"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="56" r="4" stroke="#888" strokeWidth="1.5" />
        <circle cx="32" cy="20" r="8" stroke="#888" strokeWidth="1.5" />
        <line x1="26" y1="16" x2="38" y2="24" stroke="#888" strokeWidth="1" />
        <line x1="38" y1="16" x2="26" y2="24" stroke="#888" strokeWidth="1" />
      </svg>

      {/* Error label */}
      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-snow/50">
        {t("code")}
      </p>

      {/* Divider */}
      <div className="mx-auto mb-5 h-px w-8 bg-snow/30" />

      {/* Heading */}
      <h1 className="mb-3 text-3xl font-medium text-snow">{t("heading")}</h1>

      {/* Subtext */}
      <p className="mb-8 max-w-xs text-sm leading-relaxed text-snow/50">
        {t("description")}
      </p>

      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-md border border-snow/20 bg-transparent px-5 py-2.5 text-sm text-snow transition-colors hover:border-snow/50 hover:bg-snow/5"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {t("backHome")}
      </Link>
    </main>
  );
}
