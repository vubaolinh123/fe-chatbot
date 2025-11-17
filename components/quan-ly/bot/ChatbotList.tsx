"use client";

import { Bot as BotIcon } from "lucide-react";
import { ChatbotCard } from "./ChatbotCard";
import { CreateBotButton } from "./CreateBotButton";

export type ChatbotStatus = "running" | "testing" | "ACTIVE" | "INACTIVE";

export interface Chatbot {
  id: string;
  _id?: string; // API response uses _id
  uid?: string; // Unique UID used for deletion and messaging
  name: string;
  type?: string; // Optional for API data
  status: ChatbotStatus;
  channel?: string; // Optional for API data
  trainingProgress?: number; // Optional for API data
  lastUpdated: string;
  updatedAt?: number; // Unix timestamp from API
  description?: string;
  createdAt?: number;
  firstMessage?: string;
}

interface ChatbotListProps {
  chatbots: Chatbot[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ChatbotList({
  chatbots,
  isLoading,
  onEdit,
  onDelete,
}: ChatbotListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-2xl border border-slate-200 bg-slate-100 p-4 animate-pulse"
          >
            <div className="h-4 w-32 rounded-full bg-slate-300" />
            <div className="h-3 w-24 rounded-full bg-slate-300" />
            <div className="h-24 rounded-xl bg-slate-300" />
            <div className="h-8 rounded-full bg-slate-300" />
          </div>
        ))}
      </div>
    );
  }

  if (chatbots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/40 px-6 py-10 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80 text-rose-300 shadow-inner shadow-black/60">
          <BotIcon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-sm font-semibold text-slate-50">
         Chỉ ba bước tạo chatbot
        </h3>
        <p className="mb-4 max-w-md text-xs text-slate-50">
        Bắt đầu bằng việc tạo chatbot đầu tiên, kết nối với kênh nền tảng khác nhau và huấn luyện trên dữ liệu riêng của doanh nghiệp.
        </p>
        <CreateBotButton />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {chatbots.map((bot) => (
        <ChatbotCard
          key={bot.id}
          bot={bot}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

