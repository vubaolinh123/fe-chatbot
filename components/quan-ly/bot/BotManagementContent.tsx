"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import { ChatbotList, type Chatbot } from "./ChatbotList";
import { FilterBar } from "./FilterBar";
import { CreateBotButton } from "./CreateBotButton";

const MOCK_CHATBOTS: Chatbot[] = [
  {
    id: "1",
    name: "Chatbot CSKH Website",
    type: "CSKH",
    status: "active",
    channel: "Website",
    trainingProgress: 92,
    lastUpdated: "Hôm qua",
  },
  {
    id: "2",
    name: "Trợ lý tư vấn hỗ trợ khách hàng",
    type: "Tư vấn",
    status: "active",
    channel: "Messenger",
    trainingProgress: 84,
    lastUpdated: "2 giờ trước",
  },
  {
    id: "3",
    name: "FAQ sản phẩm mới",
    type: "FAQ",
    status: "draft",
    channel: "Zalo",
    trainingProgress: 56,
    lastUpdated: "Hôm nay",
  },
  {
    id: "4",
    name: "Chatbot nhân sự và tuyển dụng",
    type: "CSKH",
    status: "inactive",
    channel: "Facebook",
    trainingProgress: 100,
    lastUpdated: "1 tuần trước",
  },
];

export function BotManagementContent() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setChatbots(MOCK_CHATBOTS);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const filteredChatbots = useMemo(() => {
    if (isLoading) return [];

    return chatbots.filter((bot) => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      if (!normalizedQuery) return true;

      const haystack = `${bot.name} ${bot.type} ${bot.channel}`.toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [chatbots, isLoading, searchQuery]);

  const handleEdit = (id: string) => {
    // TODO: Điều hướng sang màn hình sửa đổi thông tin bot
    console.log("Edit chatbot", id);
  };

  const handleDelete = (id: string) => {
    setChatbots((prev) => prev.filter((bot) => bot.id !== id));
  };

  const activeCount = chatbots.filter((bot) => bot.status === "active").length;
  const draftCount = chatbots.filter((bot) => bot.status === "draft").length;

  return (
    <section className="space-y-5">
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
                <span className="text-[10px] text-red-600">Chatbot đang chạy</span>
                <span className="text-sm font-semibold text-red-700">
                  {activeCount}
                </span>
              </div>
              <div className="flex flex-col rounded-2xl border border-red-200 bg-red-50 px-3 py-2">
                <span className="text-[10px] text-red-600">
                  Bản nháp / thử nghiệm
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

