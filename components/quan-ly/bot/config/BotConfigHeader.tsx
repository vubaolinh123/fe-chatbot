"use client";

import { useRouter } from "next/navigation";
import { Play, Rocket } from "lucide-react";

interface BotConfigHeaderProps {
  botName: string;
  botId: string;
  onPublish?: () => void;
  isPublishing?: boolean;
}

export function BotConfigHeader({
  botName,
  botId,
  onPublish,
  isPublishing = false,
}: BotConfigHeaderProps) {
  const router = useRouter();

  const handleTest = () => {
    router.push(`/bot/preview/${botId}`);
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{botName}</h1>
        <p className="mt-2 text-slate-600">
          Cấu hình và quản lý chatbot của bạn
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleTest}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 hover:shadow-md"
        >
          <Play className="h-4 w-4" />
          Thử nghiệm Bot
        </button>
        <button
          onClick={onPublish}
          disabled={isPublishing}
          className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2.5 font-semibold text-white shadow-lg shadow-red-500/40 transition-all hover:shadow-lg hover:shadow-red-500/60 disabled:opacity-50"
        >
          <Rocket className="h-4 w-4" />
          {isPublishing ? "Đang xuất bản..." : "Xuất bản Bot"}
        </button>
      </div>
    </div>
  );
}

