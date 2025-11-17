"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleMore, AlertCircle } from "lucide-react";
import { ChatbotList, type Chatbot } from "./ChatbotList";
import { FilterBar } from "./FilterBar";
import { CreateBotButton } from "./CreateBotButton";
import { getListBots, type BotData } from "@/lib/api/bot.api";

type BotStatus = "running" | "testing" | "ACTIVE" | "INACTIVE";

export function BotManagementContent() {
  const router = useRouter();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BotStatus | null>(null);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const botData = await getListBots();

        // Transform API response to Chatbot interface
        const transformedBots: Chatbot[] = botData.map((bot: BotData) => ({
          id: bot._id,
          _id: bot._id,
          name: bot.name,
          status: bot.status as BotStatus,
          lastUpdated: "",
          updatedAt: bot.updatedAt,
          description: bot.description,
          createdAt: bot.createdAt,
          firstMessage: bot.firstMessage,
        }));

        setChatbots(transformedBots);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Không thể tải danh sách chatbot";
        setError(errorMessage);
        console.error("Error fetching bots:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBots();
  }, []);

  const filteredChatbots = useMemo(() => {
    if (isLoading) return [];

    return chatbots.filter((bot) => {
      // Filter by search query
      const normalizedQuery = searchQuery.trim().toLowerCase();
      if (normalizedQuery) {
        const haystack = `${bot.name}`.toLowerCase();
        if (!haystack.includes(normalizedQuery)) return false;
      }

      // Filter by status
      if (statusFilter && bot.status !== statusFilter) return false;

      return true;
    });
  }, [chatbots, isLoading, searchQuery, statusFilter]);

  const handleEdit = (id: string) => {
    router.push(`/quan-ly/bot/${id}`);
  };

  const handleDelete = (id: string) => {
    setChatbots((prev) => prev.filter((bot) => bot.id !== id));
  };

  const activeCount = chatbots.filter(
    (bot) => bot.status === "running" || bot.status === "ACTIVE"
  ).length;
  const draftCount = chatbots.filter(
    (bot) => bot.status === "testing" || bot.status === "INACTIVE"
  ).length;

  return (
    <section className="space-y-5">
      {error && (
        <div className="relative overflow-hidden rounded-3xl border border-red-300 bg-red-50 p-4 shadow-lg shadow-red-100">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Lỗi tải dữ liệu</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden rounded-3xl border border-red-200 bg-white p-5 shadow-lg shadow-red-100 sm:p-6">
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/50">
              <MessageCircleMore className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-red-600">
                Quản lý chatbot
              </p>
              <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
                Tạo và huấn luyện chatbot theo định lực của bạn
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 sm:w-60">
              <div className="flex flex-col rounded-2xl border border-red-200 bg-red-50 px-3 py-2">
                <span className="text-[10px] text-red-600">Chatbot hoạt động</span>
                <span className="text-sm font-semibold text-red-700">
                  {activeCount}
                </span>
              </div>
              <div className="flex flex-col rounded-2xl border border-red-200 bg-red-50 px-3 py-2">
                <span className="text-[10px] text-red-600">
                  Không hoạt động
                </span>
                <span className="text-sm font-semibold text-red-700">
                  {draftCount}
                </span>
              </div>
            </div>
            <CreateBotButton />
          </div>
        </div>

        <div className="relative mt-5 space-y-3">
          <FilterBar
            onSearchChange={setSearchQuery}
            onStatusChange={setStatusFilter}
          />
          <ChatbotList
            chatbots={filteredChatbots}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}

