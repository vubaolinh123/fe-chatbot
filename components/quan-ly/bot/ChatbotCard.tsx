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
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    dot: "bg-emerald-600",
  },
  inactive: {
    label: "Tạm dừng",
    color: "bg-slate-200 text-slate-700 border-slate-300",
    dot: "bg-slate-600",
  },
  draft: {
    label: "Bản nháp",
    color: "bg-amber-100 text-amber-700 border-amber-300",
    dot: "bg-amber-600",
  },
};

export function ChatbotCard({ bot, onEdit, onDelete }: ChatbotCardProps) {
  const status = statusConfig[bot.status];

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-red-200 bg-white p-4 shadow-lg shadow-red-100 transition-all duration-200 hover:-translate-y-1.5 hover:border-red-300 hover:shadow-lg hover:shadow-red-200">
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/50">
            <Bot className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3 className="line-clamp-1 text-sm font-semibold text-slate-900">
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
        <div className="flex items-center justify-between text-[11px] text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-slate-600" />
            <span>Cập nhật: {bot.lastUpdated}</span>
          </span>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(bot.id)}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:border-red-400 hover:bg-red-100"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Chỉnh sửa
          </button>
          <button
            type="button"
            onClick={() => onDelete(bot.id)}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:border-red-400 hover:bg-red-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Xóa bot
          </button>
        </div>
      </div>
    </article>
  );
}
