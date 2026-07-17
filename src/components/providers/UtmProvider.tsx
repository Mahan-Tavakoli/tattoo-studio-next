"use client";

import { setCookie } from "cookies-next/client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function UtmProvider() {
  const params = useSearchParams();

  useEffect(() => {
    const utmSource = params.get("utm_source");
    const utmCampaign = params.get("utm_campaign");
    const utmAdset = params.get("utm_adset");
    const utmAd = params.get("utm_ad");

    const cookieOptions = {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    };

    if (utmSource) setCookie("utm_source", utmSource, cookieOptions);

    if (utmCampaign) setCookie("utm_campaign", utmCampaign, cookieOptions);

    if (utmAdset) setCookie("utm_adset", utmAdset, cookieOptions);

    if (utmAd) setCookie("utm_ad", utmAd, cookieOptions);
  }, [params]);

  return null;
}

export default UtmProvider;
