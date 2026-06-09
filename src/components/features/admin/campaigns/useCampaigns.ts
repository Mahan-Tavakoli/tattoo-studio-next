"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  sendCampaignApi,
  SendCampaignPayload,
} from "@/components/services/campaignService";

export default function useCampaigns() {
  const { mutate: sendCampaign, isPending: sendIsPending, data: sendResult, reset } =
    useMutation({
      mutationFn: (payload: SendCampaignPayload) => sendCampaignApi(payload),
      onSuccess: (data) => {
        if (data.errors.length > 0) {
          toast.warn(`Campaign sent with ${data.errors.length} batch error(s).`, {
            className: "custom-toast",
          });
        } else {
          toast.success(`Campaign sent — ${data.queued} emails queued.`, {
            className: "custom-toast",
          });
        }
      },
      onError: () => {
        toast.error("Failed to send campaign. Please try again.", {
          className: "custom-toast",
        });
      },
    });

  return { sendCampaign, sendIsPending, sendResult, reset };
}
