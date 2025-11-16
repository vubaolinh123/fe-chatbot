"use client";

import { Play, Rocket } from "lucide-react";

interface BotActionsFooterProps {
  onTest?: () => void;
  onPublish?: () => void;
  isPublishing?: boolean;
}

export function BotActionsFooter({
  onTest,
  onPublish,
  isPublishing = false,
}: BotActionsFooterProps) {
  return (
    <div className="flex gap-3 border-t border-slate-200 pt-6">
      <button
        onClick={onTest}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
      >
        <Play className="h-4 w-4" />
        Thử nghiệm Bot
      </button>
      <button
        onClick={onPublish}
        disabled={isPublishing}
        className="ml-auto inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2.5 font-semibold text-white shadow-lg shadow-red-500/40 transition-all hover:shadow-lg hover:shadow-red-500/60 disabled:opacity-50"
      >
        <Rocket className="h-4 w-4" />
        {isPublishing ? "Đang xuất bản..." : "Xuất bản Bot"}
      </button>
    </div>
  );
}

