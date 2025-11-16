"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

interface CreateBotButtonProps {
  onClick?: () => void;
}

export function CreateBotButton({ onClick }: CreateBotButtonProps) {
  return (
    <Link
      href="/quan-ly/bot/new"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-rose-500 via-red-500 to-orange-400 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-500/40 transition-all duration-150 hover:scale-[1.02] hover:shadow-red-500/60 active:scale-[0.98]"
    >
      <Sparkles className="h-4 w-4" />
      <span>Tạo ChatBot</span>
    </Link>
  );
}

