"use client";

import { useState } from "react";
import {
  Mail,
  Users,
  CheckCircle,
  Clock,
  Send,
  AlertTriangle,
} from "lucide-react";
import useCampaigns from "./useCampaigns";
import {
  ACTIVE_PERIODS,
  ActivePeriod,
  CampaignAudience,
  SendCampaignPayload,
} from "@/components/schema & types/campaign/campaign.types";

const AUDIENCES: {
  value: CampaignAudience;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "all",
    label: "All Clients",
    description: "Everyone with an email address on file",
    icon: <Users className="size-5" />,
  },
  {
    value: "active",
    label: "Active Clients",
    description: "Clients active within a selected period",
    icon: <Clock className="size-5" />,
  },
];

export default function CampaignsContainer() {
  const { sendCampaign, sendIsPending, sendResult, reset } = useCampaigns();

  const [audience, setAudience] = useState<CampaignAudience>("all");
  const [activePeriod, setActivePeriod] = useState<ActivePeriod>("month");
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const canSend =
    subject.trim().length > 0 && body.trim().length > 0 && !sendIsPending;

  const handleSend = () => {
    const payload: SendCampaignPayload = {
      subject,
      body,
      audience,
    };

    if (audience === "active") {
      payload.activePeriod = activePeriod;
    }
    setShowConfirm(false);
    setShowPreview(false);
    sendCampaign(payload);
  };

  const handleReset = () => {
    reset();
    setSubject("");
    setBody("");
    setAudience("all");
    setActivePeriod("month");
  };

  // Result screen
  if (sendResult) {
    return (
      <div className="container">
        <div className="flex items-center gap-x-3 mb-10">
          <Mail className="size-6 text-dried-mustard" />
          <h1 className="md:text-xl sm:max-md:text-base text-sm font-bold">
            Campaigns
          </h1>
        </div>
        <div className="w-full h-[0.5px] mb-10 bg-snow/30" />

        <div className="max-w-lg mx-auto">
          <div className="border border-snow/20 rounded-lg p-8 flex flex-col items-center gap-y-6 text-center">
            <div className="size-16 rounded-full bg-dried-mustard/10 flex items-center justify-center">
              <Send className="size-7 text-dried-mustard" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Campaign Sent</h2>
              <p className="text-sm text-snow/50">
                Your campaign has been dispatched
              </p>
            </div>

            <div className="w-full border border-snow/10 rounded-md divide-y divide-snow/10">
              <div className="flex justify-between px-5 py-3 text-sm">
                <span className="text-snow/50">Queued</span>
                <span className="font-bold text-dried-mustard">
                  {sendResult.queued}
                </span>
              </div>
              <div className="flex justify-between px-5 py-3 text-sm">
                <span className="text-snow/50">Skipped (no email)</span>
                <span className="font-medium">{sendResult.skipped}</span>
              </div>
              <div className="flex justify-between px-5 py-3 text-sm">
                <span className="text-snow/50">Batches sent</span>
                <span className="font-medium">{sendResult.batches}</span>
              </div>
              {sendResult.errors.length > 0 && (
                <div className="flex justify-between px-5 py-3 text-sm">
                  <span className="text-snow/50">Errors</span>
                  <span className="font-medium text-red-400">
                    {sendResult.errors.length}
                  </span>
                </div>
              )}
            </div>

            {sendResult.errors.length > 0 && (
              <div className="w-full bg-red-500/10 border border-red-500/20 rounded-md p-4 text-xs text-red-400 text-left">
                <p className="font-bold mb-2">Batch errors:</p>
                {sendResult.errors.map((e, i) => (
                  <p key={i} className="opacity-80">
                    • {e}
                  </p>
                ))}
              </div>
            )}

            <button onClick={handleReset} className="btn text-sm w-full">
              Send Another Campaign
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="flex items-center gap-x-3">
        <Mail className="size-6 text-dried-mustard" />
        <h1 className="md:text-xl sm:max-md:text-base text-sm font-bold">
          Campaigns
        </h1>
      </div>
      <div className="w-full h-[0.5px] my-10 bg-snow/30" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Left — Compose */}
        <div className="flex flex-col gap-y-8">
          {/* Audience */}
          <section>
            <p className="text-sm font-semibold text-snow/70 mb-4 uppercase tracking-widest">
              Audience
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AUDIENCES.map((a) => (
                <button
                  key={a.value}
                  onClick={() => {
                    setAudience(a.value);

                    if (a.value === "active") {
                      setActivePeriod("month");
                    }
                  }}
                  className={`text-left p-4 rounded-lg border transition-all duration-200 flex flex-col gap-y-2 cursor-pointer ${
                    audience === a.value
                      ? "border-dried-mustard bg-dried-mustard/5"
                      : "border-snow/15 hover:border-snow/30 bg-snow/2"
                  }`}
                >
                  <div
                    className={`${audience === a.value ? "text-dried-mustard" : "text-snow/50"}`}
                  >
                    {a.icon}
                  </div>
                  <p
                    className={`text-sm font-semibold ${audience === a.value ? "text-snow" : "text-snow/70"}`}
                  >
                    {a.label}
                  </p>
                  <p className="text-xs text-snow/40 leading-relaxed">
                    {a.description}
                  </p>
                </button>
              ))}
            </div>
          </section>
          {/* for active clients */}
          {audience === "active" && (
            <section>
              <label className="text-sm font-semibold text-snow/70 mb-2 block uppercase tracking-widest">
                Active Within
              </label>

              <select
                value={activePeriod}
                onChange={(e) =>
                  setActivePeriod(e.target.value as ActivePeriod)
                }
                className="w-full bg-snow/3 border border-snow/15 rounded-lg px-4 py-3 text-sm text-snow focus:outline-none focus:border-dried-mustard/60"
              >
                {ACTIVE_PERIODS.map((period) => (
                  <option
                    key={period.value}
                    value={period.value}
                    className="bg-carbon-black"
                  >
                    {period.label}
                  </option>
                ))}
              </select>
            </section>
          )}
          {/* Subject */}
          <section>
            <label className="text-sm font-semibold text-snow/70 mb-2 block uppercase tracking-widest">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Summer flash day — book your spot!"
              className="w-full bg-snow/3 border border-snow/15 rounded-lg px-4 py-3 text-sm text-snow placeholder:text-snow/25 focus:outline-none focus:border-dried-mustard/60 transition-colors"
            />
          </section>

          {/* Body */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-snow/70 uppercase tracking-widest">
                Message
              </label>
              <span className="text-xs text-snow/30">
                Wrapped in studio template automatically
              </span>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={"<p>Hey! We have a special event coming up…</p>"}
              rows={10}
              className="w-full bg-snow/3 border border-snow/15 rounded-lg px-4 py-3 text-sm text-snow placeholder:text-snow/25 focus:outline-none focus:border-dried-mustard/60 transition-colors resize-none font-mono"
            />
          </section>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(true)}
              disabled={!body.trim()}
              className="btn text-sm flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Preview Email
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!canSend}
              className="submit-btn text-sm flex-1 flex items-center justify-center gap-x-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="size-4" />
              <span>{sendIsPending ? "Sending..." : "Send Campaign"}</span>
            </button>
          </div>
        </div>

        {/* Right — Summary card */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="border border-snow/15 rounded-lg p-5 flex flex-col gap-y-5">
            <p className="text-sm font-semibold text-snow/70 uppercase tracking-widest">
              Summary
            </p>

            <div className="flex flex-col gap-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-snow/50">Audience</span>
                <span className="font-medium capitalize">
                  {AUDIENCES.find((a) => a.value === audience)?.label}
                </span>
              </div>

              {audience === "active" && (
                <div className="flex justify-between text-sm">
                  <span className="text-snow/50">Period</span>
                  <span className="font-medium">
                    {
                      ACTIVE_PERIODS.find((p) => p.value === activePeriod)
                        ?.label
                    }
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-snow/50">Subject</span>
                <span className="font-medium text-right max-w-45 truncate">
                  {subject || (
                    <span className="text-snow/30 italic">not set</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-snow/50">Message</span>
                <span
                  className={`font-medium ${body.trim() ? "text-dried-mustard" : "text-snow/30 italic"}`}
                >
                  {body.trim() ? "Ready" : "not set"}
                </span>
              </div>
            </div>

            <div className="h-[0.5px] bg-snow/10" />

            <div className="flex items-start gap-x-2 text-xs text-snow/35 leading-relaxed">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <span>
                Campaigns are sent immediately and cannot be undone.
                Double-check your subject and message before sending.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-onyx/80 backdrop-blur-sm px-4">
          <div className="bg-carbon-black border border-snow/15 rounded-xl p-7 max-w-sm w-full flex flex-col gap-y-5">
            <div className="flex items-center gap-x-3">
              <div className="size-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <Send className="size-4 text-red-400" />
              </div>
              <div>
                <p className="font-bold text-sm">Send Campaign?</p>
                <p className="text-xs text-snow/40 mt-0.5">
                  This cannot be undone
                </p>
              </div>
            </div>

            <div className="bg-snow/3 border border-snow/10 rounded-md p-4 text-sm flex flex-col gap-y-2">
              <div className="flex justify-between">
                <span className="text-snow/50">Audience</span>
                <span className="font-medium capitalize">
                  {AUDIENCES.find((a) => a.value === audience)?.label}
                </span>
              </div>

              {audience === "active" && (
                <div className="flex justify-between">
                  <span className="text-snow/50">Period</span>
                  <span className="font-medium">
                    {
                      ACTIVE_PERIODS.find((p) => p.value === activePeriod)
                        ?.label
                    }
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-snow/50">Subject</span>
                <span className="font-medium text-right max-w-45 truncate">
                  {subject}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn text-sm flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="flex-1 text-sm bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-x-2"
              >
                <Send className="size-4" />
                Confirm Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-onyx/80 backdrop-blur-sm px-4">
          <div className="bg-carbon-black border border-snow/15 rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-snow/10">
              <p className="font-semibold text-sm">Email Preview</p>
              <button
                onClick={() => setShowPreview(false)}
                className="text-snow/40 hover:text-snow text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto p-5">
              <div
                className="bg-white rounded text-black text-sm"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
