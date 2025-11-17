"use client";

import { MessageCircle } from "lucide-react";

interface FirstMessageSectionProps {
  initialMessage?: string;
  onMessageChange?: (message: string) => void;
}

export function FirstMessageSection({
  initialMessage = "",
  onMessageChange,
}: FirstMessageSectionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    onMessageChange?.(newMessage);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-red-600" />
        <label htmlFor="first-message" className="text-sm font-semibold text-slate-900">
          Tin nhắn đầu tiên
        </label>
      </div>
      <p className="text-xs text-slate-600">
        Câu đầu tiên chatbot sẽ trả lời khi người dùng bắt đầu cuộc trò chuyện
      </p>
      <textarea
        id="first-message"
        value={initialMessage}
        onChange={handleChange}
        placeholder="Nhập tin nhắn đầu tiên mà chatbot sẽ gửi..."
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
        rows={4}
      />
    </div>
  );
}

