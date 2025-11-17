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
        <div className="max-w-[90%] rounded-2xl rounded-br-none bg-gradient-to-br from-red-600 to-red-700 px-4 py-2.5 text-white shadow-sm transition-all hover:shadow-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
          <p className="text-sm leading-relaxed">{messageText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-sm">
        <span className="text-xs font-bold text-stone-700">
          {botName.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="max-w-[90%] rounded-2xl rounded-bl-none bg-stone-100 px-4 py-2.5 shadow-sm transition-all hover:shadow-md md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <p className="text-sm leading-relaxed text-stone-900">{messageText}</p>
      </div>
    </div>
  );
}

