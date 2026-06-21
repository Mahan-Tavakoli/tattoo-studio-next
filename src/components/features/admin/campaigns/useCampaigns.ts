"use client";

import { sendCampaignApi } from "@/components/services/campaignService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useCampaigns() {
  const {
    mutate: sendCampaign,
    isPending: sendIsPending,
    data: sendResult,
    reset,
  } = useMutation({
    mutationFn: sendCampaignApi,
    onSuccess: (data) => {
      if (data.errors.length > 0) {
        toast.warn(`Campaign sent with ${data.errors.length} batch error(s).`);
      } else {
        toast.success(`Campaign sent — ${data.queued} emails queued.`);
      }
    },
    onError: () => {
      toast.error("Failed to send campaign. Please try again.");
    },
  });

  return { sendCampaign, sendIsPending, sendResult, reset };
}
