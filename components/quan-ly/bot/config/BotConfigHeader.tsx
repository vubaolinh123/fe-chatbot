"use client";

import { useRouter } from "next/navigation";
import { Play, Rocket, ChevronLeft, Pause } from "lucide-react";

type BotStatus = "running" | "testing";

interface BotConfigHeaderProps {
  botName: string;
  botId: string;
  botStatus?: BotStatus;
  onPublish?: () => void;
  isPublishing?: boolean;
}

export function BotConfigHeader({
  botName,
  botId,
  botStatus = "testing",
  onPublish,
  isPublishing = false,
}: BotConfigHeaderProps) {
  const router = useRouter();

  const handleTest = () => {
    router.push(`/bot/preview/${botId}`);
  };

  const handleBack = () => {
    router.push("/quan-ly/bot");
  };

  const isRunning = botStatus === "running";
  const publishButtonText = isPublishing
    ? isRunning
      ? "Đang tạm dừng..."
      : "Đang xuất bản..."
    : isRunning
      ? "Tạm dừng Bot"
      : "Xuất bản Bot";

  return (
    <div className="mb-8 space-y-4">
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Quay lại
      </button>
      <div className="flex items-center justify-between">
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
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white shadow-lg transition-all ${
              isRunning
                ? "bg-linear-to-r from-slate-500 to-slate-600 shadow-slate-500/40 hover:shadow-slate-500/60"
                : "bg-linear-to-r from-rose-500 via-red-500 to-orange-400 shadow-red-500/40 hover:shadow-red-500/60"
            } disabled:opacity-50`}
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Rocket className="h-4 w-4" />
            )}
            {publishButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

