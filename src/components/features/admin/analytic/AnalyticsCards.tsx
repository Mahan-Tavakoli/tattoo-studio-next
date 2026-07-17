"use client";

import {
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  CircleDashed,
  Clock3,
} from "lucide-react";

import { OverviewAnalyticsInfo } from "@/components/schema & types/analytics/analytics.types";
import StatisticCard from "./cards/StatisticsCard";

interface AnalyticsCardsProps {
  analytics: OverviewAnalyticsInfo;
}

function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      <StatisticCard
        title="Total Bookings"
        value={analytics.total}
        icon={CalendarCheck2}
      />

      <StatisticCard
        title="Approved"
        value={analytics.status.approved}
        icon={CheckCircle2}
      />

      <StatisticCard
        title="Completed"
        value={analytics.status.completed}
        icon={Clock3}
      />

      <StatisticCard
        title="Cancelled"
        value={analytics.status.cancelled}
        icon={XCircle}
      />

      <StatisticCard
        title="No Show"
        value={analytics.status.noShow}
        icon={CircleDashed}
      />
    </div>
  );
}

export default AnalyticsCards;
