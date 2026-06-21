export type CampaignAudience = "all" | "completed" | "active";

export interface SendCampaignPayload {
  subject: string;
  body: string;
  audience: CampaignAudience;
}

export interface SendCampaignResult {
  queued: number;
  skipped: number;
  batches: number;
  errors: string[];
}
