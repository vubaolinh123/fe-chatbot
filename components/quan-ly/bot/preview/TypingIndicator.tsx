"use client";

interface TypingIndicatorProps {
  botName?: string;
}

export function TypingIndicator({ botName = "Bot" }: TypingIndicatorProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-slate-200 to-slate-300 shadow-sm">
        <span className="text-xs font-bold text-slate-700">
          {botName.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="rounded-2xl rounded-bl-none border border-slate-200 bg-white px-4 py-2.5 shadow-md">
        <div className="flex gap-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-red-500" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-red-500" style={{ animationDelay: "0.1s" }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-red-500" style={{ animationDelay: "0.2s" }} />
        </div>
      </div>
    </div>
  );
}

