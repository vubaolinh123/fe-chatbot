"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleMore, AlertCircle } from "lucide-react";
import { ChatbotList, type Chatbot } from "./ChatbotList";
import { FilterBar } from "./FilterBar";
import { CreateBotButton } from "./CreateBotButton";
import { getListBots, type BotData, deleteBot } from "@/lib/api/bot.api";
import { showSuccessToast, showErrorToast } from "@/lib/toast-config";

type BotStatus = "running" | "testing" | "ACTIVE" | "INACTIVE";

export function BotManagementContent() {
  const router = useRouter();
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BotStatus | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [botToDelete, setBotToDelete] = useState<Chatbot | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const fetchBots = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const botData = await getListBots();

      const transformedBots: Chatbot[] = botData.map((bot: BotData) => ({
        id: bot._id,
        _id: bot._id,
        uid: bot.uid,
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

  useEffect(() => {
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
    if (isDeleting) return;

    const bot = chatbots.find((item) => item.id === id);
    if (!bot) {
      console.warn("Bot not found for deletion:", id);
      return;
    }

    setBotToDelete(bot);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;
    setIsDeleteModalOpen(false);
    setBotToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!botToDelete) return;
    if (!botToDelete.uid) {
      showErrorToast("Không thể xóa bot này (thiếu UID)");
      return;
    }
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteBot(botToDelete.uid);
      showSuccessToast("Đã xóa bot thành công");

      setIsDeleteModalOpen(false);
      setBotToDelete(null);

      await fetchBots();
    } catch (err) {
      console.error("Failed to delete bot:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Không thể xóa bot. Vui lòng thử lại.";
      showErrorToast(`Không thể xóa bot: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
    }
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

      {isDeleteModalOpen && botToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-xl shadow-red-200/60">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Xác nhận xóa Bot
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Bạn có chắc chắn muốn xóa bot{" "}
                  <span className="font-semibold">"{botToDelete.name}"</span>?
                </p>
                <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-3">
                  <p className="text-xs font-semibold text-red-900">
                    ⚠️ Cảnh báo: Hành động này sẽ xóa vĩnh viễn:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-red-800">
                    <li>Bot và toàn bộ cấu hình</li>
                    <li>Tất cả dữ liệu đã train</li>
                    <li>Lịch sử chat</li>
                    <li>Không thể khôi phục sau khi xóa</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-70"
              >
                {isDeleting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                )}
                {isDeleting ? "Đang xóa..." : "Xóa Bot"}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

