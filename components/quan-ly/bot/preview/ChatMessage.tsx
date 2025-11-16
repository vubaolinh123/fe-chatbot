"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface ChatMessageProps {
  role: "user" | "bot";
  content: string;
  botName?: string;
  isTyping?: boolean;
}

export function ChatMessage({
  role,
  content,
  botName = "Bot",
  isTyping = false,
}: ChatMessageProps) {
  const { displayedText } = useTypewriter(isTyping ? content : "", {
    speed: 30,
  });

  const messageText = isTyping ? displayedText : content;

  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs rounded-2xl rounded-br-none bg-gradient-to-br from-red-600 to-red-700 px-4 py-2.5 text-white shadow-md transition-all hover:shadow-lg">
          <p className="text-sm leading-relaxed">{messageText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm">
        <span className="text-xs font-bold text-slate-700">
          {botName.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="max-w-xs rounded-2xl rounded-bl-none border border-slate-200 bg-white px-4 py-2.5 shadow-md transition-all hover:shadow-lg">
        <p className="text-sm leading-relaxed text-slate-900">{messageText}</p>
      </div>
    </div>
  );
}

