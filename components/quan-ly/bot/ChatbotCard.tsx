import { Bot, Clock3, Edit2, Trash2 } from "lucide-react";
import type { Chatbot, ChatbotStatus } from "./ChatbotList";

interface ChatbotCardProps {
  bot: Chatbot;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusConfig: Record<
  ChatbotStatus,
  { label: string; color: string; dot: string }
> = {
  active: {
    label: "Đang chạy",
    color: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40",
    dot: "bg-emerald-400",
  },
  inactive: {
    label: "Tạm dừng",
    color: "bg-slate-700/60 text-slate-200 border-slate-500/40",
    dot: "bg-slate-300",
  },
  draft: {
    label: "Bản nháp",
    color: "bg-amber-500/15 text-amber-200 border-amber-400/40",
    dot: "bg-amber-300",
  },
};

export function ChatbotCard({ bot, onEdit, onDelete }: ChatbotCardProps) {
  const status = statusConfig[bot.status];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-red-500/30 bg-slate-950 p-4 shadow-lg shadow-red-500/10 transition-all duration-200 hover:-translate-y-1.5 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20">
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/50">
            <Bot className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-sm font-semibold text-slate-50">
              {bot.name}
            </h3>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${status.color}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      <div className="relative mt-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-slate-400" />
            <span>Cập nhật: {bot.lastUpdated}</span>
          </span>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(bot.id)}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-100 transition-colors hover:border-red-500/80 hover:bg-red-500/20"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Chỉnh sửa
          </button>
          <button
            type="button"
            onClick={() => onDelete(bot.id)}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-500/60 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-100 transition-colors hover:border-red-500/80 hover:bg-red-500/20"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Xóa bot
          </button>
        </div>
      </div>
    </article>
  );
}
