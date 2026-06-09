import { AxiosResponse } from "axios";
import http from "./httpService";

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

export function sendCampaignApi(
  payload: SendCampaignPayload
): Promise<SendCampaignResult> {
  return http
    .post("/admin/campaigns/send", payload)
    .then(({ data }: AxiosResponse<SendCampaignResult>) => data);
}
