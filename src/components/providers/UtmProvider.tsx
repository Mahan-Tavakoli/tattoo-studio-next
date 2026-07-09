"use client";

import { setCookie } from "cookies-next/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function UtmProvider() {
  const params = useSearchParams();

  useEffect(() => {
    const source = params.get("utm_source");

    if (source) setCookie("utm_source", source, { maxAge: 60 * 60 * 24 * 30 });
  }, [params]);

  return null;
}

export default UtmProvider;
