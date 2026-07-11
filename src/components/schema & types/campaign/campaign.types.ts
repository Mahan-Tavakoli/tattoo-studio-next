export type CampaignAudience = "all" | "active";

export type ActivePeriod = "month" | "2months" | "6months" | "year";

export interface SendCampaignPayload {
  subject: string;
  body: string;
  audience: CampaignAudience;
  activePeriod?: ActivePeriod;
}

export interface SendCampaignResult {
  queued: number;
  skipped: number;
  batches: number;
  errors: string[];
}

export const ACTIVE_PERIODS = [
  {
    value: "month",
    label: "Last Month",
  },
  {
    value: "2months",
    label: "Last 2 Months",
  },
  {
    value: "6months",
    label: "Last 6 Months",
  },
  {
    value: "year",
    label: "Last Year",
  },
] as const;
