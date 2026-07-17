"use client";

import { useMemo, useState } from "react";
import { startOfMonth } from "date-fns";

import useAnalytic from "./useAnalytic";
import OverviewFilters from "./overview/OverviewFilters";
import { AnalyticsFilterForm } from "@/components/schema & types/analytics/analytics.types";
import AnalyticsCards from "./AnalyticsCards";
import PieChartCard from "./charts/PieChartCard";
import {
  bookingSourceConfig,
  bookingStatusConfig,
  bookingTypeConfig,
} from "./charts/chartConfig";
import BarChartCard from "./charts/BarChartCard";
import HorizontalBarChart from "./charts/HorizontalBarChart";

function AnalyticContainer() {
  const [filters, setFilters] = useState<AnalyticsFilterForm>({
    from: startOfMonth(new Date()),
    to: new Date(),
    includeWalkIn: true,
  });

  const { overviewAnalyticsData, overviewAnalyticsIsLoading } = useAnalytic({
    from: filters.from,
    to: filters.to,
    timezone: "Europe/Berlin",
    includeWalkIn: filters.includeWalkIn,
  });

  const bookingSourceData = useMemo(() => {
    if (!overviewAnalyticsData) return [];

    return Object.entries(overviewAnalyticsData.bySource).map(
      ([name, value]) => ({
        name,
        value,
        fill: `var(--color-${name})`,
      }),
    );
  }, [overviewAnalyticsData]);

  const bookingTypeData = useMemo(() => {
    if (!overviewAnalyticsData) return [];

    return Object.entries(overviewAnalyticsData.byBookingType).map(
      ([name, value]) => ({
        name,
        value,
        fill: `var(--color-${name})`,
      }),
    );
  }, [overviewAnalyticsData]);

  const bookingStatusData = useMemo(() => {
    if (!overviewAnalyticsData) return [];

    return Object.entries(overviewAnalyticsData.status).map(
      ([name, value]) => ({
        name,
        value,
        fill: `var(--color-${name})`,
      }),
    );
  }, [overviewAnalyticsData]);

  if (overviewAnalyticsIsLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      <OverviewFilters defaultValues={filters} onSubmit={setFilters} />

      <AnalyticsCards analytics={overviewAnalyticsData!} />

      <div className="grid gap-6 xl:grid-cols-2">
        <PieChartCard
          title="Booking Sources"
          description="Distribution by intake source"
          data={bookingSourceData}
          config={bookingSourceConfig}
        />

        <BarChartCard
          title="Booking Types"
          description="Bookings by type"
          data={bookingTypeData}
          config={bookingTypeConfig}
        />
      </div>

      <HorizontalBarChart
        title="Booking Status"
        description="Booking lifecycle overview"
        data={bookingStatusData}
        config={bookingStatusConfig}
      />
    </div>
  );
}

export default AnalyticContainer;
