import { AxiosResponse } from "axios";
import { OverviewAnalyticsInfo } from "../schema & types/analytics/analytics.types";
import http from "./httpService";

interface OverviewAnalyticsParams {
  from: string;
  to: string;
  timezone: string;
  includeWalkIn: boolean;
}

export default function getOverviewAnalyticsApi({
  from,
  to,
  timezone,
  includeWalkIn,
}: OverviewAnalyticsParams): Promise<OverviewAnalyticsInfo> {
  return http
    .get("/admin/analytics/overview", {
      params: {
        from,
        to,
        timezone,
        includeWalkIn,
      },
    })
    .then(({ data }: AxiosResponse<OverviewAnalyticsInfo>) => data);
}
