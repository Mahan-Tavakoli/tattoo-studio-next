import getOverviewAnalyticsApi from "@/components/services/analyticService";
import { formatDate } from "@/components/utils/formatter";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseAnalyticProps {
  from: Date;
  to: Date;
  timezone: string;
  includeWalkIn: boolean;
}

export default function useAnalytic({
  from,
  to,
  timezone = "Europe/Berlin",
  includeWalkIn = true,
}: UseAnalyticProps) {
  const fromFormattedDate = useMemo(
    () => (from ? formatDate(from) : ""),
    [from],
  );

  const toFormattedDate = useMemo(() => (to ? formatDate(to) : ""), [to]);

  const {
    data: overviewAnalyticsData,
    isLoading: overviewAnalyticsIsLoading,
    isError: overviewAnalyticsIsError,
  } = useQuery({
    queryKey: [
      "overview",
      fromFormattedDate,
      toFormattedDate,
      timezone,
      includeWalkIn,
    ],
    queryFn: () =>
      getOverviewAnalyticsApi({
        from: fromFormattedDate,
        to: toFormattedDate,
        timezone,
        includeWalkIn,
      }),
  });

  return {
    // overview analytics
    overviewAnalyticsData,
    overviewAnalyticsIsLoading,
    overviewAnalyticsIsError,
  };
}
