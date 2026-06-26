"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CountdownRedirectProps {
  seconds?: number;
  redirectTo: string;
  color?: string;
}

export default function CountdownRedirect({
  seconds = 6,
  redirectTo,
  color = "#16a34a",
}: CountdownRedirectProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(seconds);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;

  const progress = countdown / seconds;
  const offset = circumference * (1 - progress);

  // Countdown
  useEffect(() => {
    if (countdown === 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Redirect
  useEffect(() => {
    if (countdown === 0) {
      router.replace(redirectTo);
    }
  }, [countdown, redirectTo, router]);

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="-rotate-90 h-24 w-24">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="none"
          />

          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 1s linear",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{countdown}</span>
        </div>
      </div>

      <p className="mt-4 text-sm">Redirecting automatically...</p>
    </div>
  );
}
