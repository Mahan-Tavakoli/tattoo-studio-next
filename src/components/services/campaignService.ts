import { AxiosResponse } from "axios";
import http from "./httpService";
import {
  SendCampaignPayload,
  SendCampaignResult,
} from "../schema & types/campaign/campaign.types";

export function sendCampaignApi(
  payload: SendCampaignPayload,
): Promise<SendCampaignResult> {
  return http
    .post("/admin/campaigns/send", payload)
    .then(({ data }: AxiosResponse<SendCampaignResult>) => data);
}
