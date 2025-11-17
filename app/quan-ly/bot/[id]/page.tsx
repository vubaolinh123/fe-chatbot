"use client";

import { useState, use, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Sparkles, FileText, Bot } from "lucide-react";
import { BotConfigHeader } from "@/components/quan-ly/bot/config/BotConfigHeader";
import { SystemPromptSection } from "@/components/quan-ly/bot/config/SystemPromptSection";
import { FirstMessageSection } from "@/components/quan-ly/bot/config/FirstMessageSection";
import { SaveChangesModal } from "@/components/quan-ly/bot/detail/SaveChangesModal";
import { getBotDetail, updateBot, BotDetailData } from "@/lib/api/bot.api";
import { showLoadingToast, updateToast, showErrorToast } from "@/lib/toast-config";

// Dynamic imports for feature cards
const PlatformIntegrationCard = dynamic(
  () =>
    import("@/components/quan-ly/bot/config/PlatformIntegrationCard").then(
      (mod) => ({ default: mod.PlatformIntegrationCard })
    ),
  { loading: () => <div className="h-24 animate-pulse rounded-xl bg-slate-200" /> }
);

const DataImportCard = dynamic(
  () =>
    import("@/components/quan-ly/bot/config/DataImportCard").then(
      (mod) => ({ default: mod.DataImportCard })
    ),
  { loading: () => <div className="h-24 animate-pulse rounded-xl bg-slate-200" /> }
);

const LLMSelectionCard = dynamic(
  () =>
    import("@/components/quan-ly/bot/config/LLMSelectionCard").then(
      (mod) => ({ default: mod.LLMSelectionCard })
    ),
  { loading: () => <div className="h-24 animate-pulse rounded-xl bg-slate-200" /> }
);

export default function BotConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Form data state
  const [formData, setFormData] = useState<BotDetailData | null>(null);
  const [originalData, setOriginalData] = useState<BotDetailData | null>(null);

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [nameError, setNameError] = useState<string>("");

  // Debounce timer ref
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastIdRef = useRef<string | null>(null);

  // Fetch bot detail on mount
  useEffect(() => {
    async function fetchBotDetail() {
      try {
        setIsLoading(true);
        const response = await getBotDetail(id);
        if (response.error === 0) {
          setFormData(response.data);
          setOriginalData(response.data);
        } else {
          showErrorToast("Không thể tải thông tin bot");
        }
      } catch (error) {
        console.error("Failed to fetch bot detail:", error);
        showErrorToast("Lỗi khi tải thông tin bot");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBotDetail();
  }, [id]);

  // Detect changes with debounce
  useEffect(() => {
    if (!formData || !originalData) return;

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      const hasChanged = JSON.stringify(formData) !== JSON.stringify(originalData);
      setHasChanges(hasChanged);
      setShowModal(hasChanged);
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formData, originalData]);

  // Handle save changes
  const handleSaveChanges = useCallback(async () => {
    if (!formData) return;

    setIsSubmitting(true);
    const toastId = showLoadingToast("⏳ Đang cập nhật thông tin bot...");
    toastIdRef.current = toastId;

    try {
      const response = await updateBot({
        _id: formData._id,
        name: formData.name,
        status: formData.status,
        description: formData.description,
        field: formData.field,
        target: formData.target,
        mainTarget: formData.mainTarget,
        firstMessage: formData.firstMessage,
        prompt: formData.prompt,
      });

      if (response.error === 0) {
        updateToast(toastId, "✓ Cập nhật thành công!", "success");
        setOriginalData(formData);
        setShowModal(false);
        setHasChanges(false);
      } else {
        const errorMsg = response.message || "Không thể cập nhật bot";
        updateToast(toastId, `✗ ${errorMsg}`, "error");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      console.error("Update bot failed:", error);
      updateToast(toastId, `✗ Không thể cập nhật: ${errorMessage}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Handle cancel changes
  const handleCancelChanges = useCallback(() => {
    setFormData(originalData);
    setShowModal(false);
    setHasChanges(false);
  }, [originalData]);

  // Handle status toggle
  const handleStatusToggle = useCallback(async () => {
    if (!formData) return;

    const newStatus: "ACTIVE" | "INACTIVE" = formData.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const toastMessage = newStatus === "ACTIVE" ? "⏳ Đang xuất bản bot..." : "⏳ Đang tạm dừng bot...";
    const successMessage = newStatus === "ACTIVE" ? "✓ Bot đã được xuất bản thành công!" : "✓ Bot đã được tạm dừng!";

    setIsSubmitting(true);
    const toastId = showLoadingToast(toastMessage);

    try {
      const response = await updateBot({
        _id: formData._id,
        name: formData.name,
        status: newStatus,
        description: formData.description,
        field: formData.field,
        target: formData.target,
        mainTarget: formData.mainTarget,
        firstMessage: formData.firstMessage,
        prompt: formData.prompt,
      });

      if (response.error === 0) {
        updateToast(toastId, successMessage, "success");
        const updatedData: BotDetailData = { ...formData, status: newStatus };
        setFormData(updatedData);
        setOriginalData(updatedData);
      } else {
        const errorMsg = response.message || "Không thể cập nhật trạng thái bot";
        updateToast(toastId, `✗ ${errorMsg}`, "error");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      console.error("Status toggle failed:", error);
      updateToast(toastId, `✗ Không thể cập nhật: ${errorMessage}`, "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Handle first message change
  const handleFirstMessageChange = useCallback((message: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      firstMessage: message,
    });
  }, [formData]);

  // Handle selected LLM change (placeholder for future use)
  const handleLLMChange = useCallback((llm: string) => {
    console.log("LLM changed to:", llm);
  }, []);

  // Validate bot name
  const validateBotName = useCallback((name: string): string => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return "Tên chatbot không được để trống";
    }
    if (trimmedName.length > 100) {
      return "Tên chatbot không được vượt quá 100 ký tự";
    }
    return "";
  }, []);

  // Handle bot name change
  const handleBotNameChange = useCallback((name: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      name,
    });
    // Clear error when user starts typing
    if (nameError) {
      setNameError("");
    }
  }, [formData, nameError]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-32 animate-pulse rounded-xl bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
          </div>
          <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-800">Không thể tải thông tin bot</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Action Buttons */}
      <BotConfigHeader
        botName={formData.name}
        botId={id}
        botStatus={formData.status === "ACTIVE" ? "running" : "testing"}
        onPublish={handleStatusToggle}
        isPublishing={isSubmitting}
      />

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* System Prompt Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-red-600" />
                <label className="text-sm font-semibold text-slate-900">
                  System Prompt
                </label>
              </div>
              <p className="text-xs text-slate-600">
                Hướng dẫn chi tiết về tính cách, vai trò và cách chatbot phản hồi
              </p>
              <textarea
                value={formData.prompt}
                onChange={(e) =>
                  setFormData({ ...formData, prompt: e.target.value })
                }
                placeholder="Nhập prompt hướng dẫn cho chatbot"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
                rows={12}
              />
            </div>
          </div>

          {/* First Message Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <FirstMessageSection
              initialMessage={formData.firstMessage || ""}
              onMessageChange={handleFirstMessageChange}
            />
          </div>
        </div>

        {/* Right Column - Feature Sidebar */}
        <div className="space-y-4">
          {/* Tính năng */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-900">
              Tính năng
            </p>
            <div className="space-y-3">
              <PlatformIntegrationCard />
              <DataImportCard />
              <LLMSelectionCard
                selectedLLM="gemini"
                onLLMChange={handleLLMChange}
              />
            </div>
          </div>

          {/* Tên Chatbot */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-red-600" />
                <label htmlFor="bot-name" className="text-sm font-semibold text-slate-900">
                  Tên Chatbot
                </label>
              </div>
              <p className="text-xs text-slate-600">
                Tên hiển thị của chatbot, sẽ xuất hiện trong danh sách và header
              </p>
              <input
                id="bot-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleBotNameChange(e.target.value)}
                placeholder="Nhập tên chatbot"
                maxLength={100}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
              />
              {nameError && (
                <p className="text-xs text-red-600 font-medium">{nameError}</p>
              )}
            </div>
          </div>

          {/* Mô tả */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-600" />
                <label htmlFor="bot-description" className="text-sm font-semibold text-slate-900">
                  Mô tả
                </label>
              </div>
              <p className="text-xs text-slate-600">
                Mô tả ngắn gọn về mục đích và chức năng của chatbot
              </p>
              <textarea
                id="bot-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Mô tả về chatbot của bạn"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Modal */}
      <SaveChangesModal
        isVisible={showModal}
        isSubmitting={isSubmitting}
        onSave={handleSaveChanges}
        onCancel={handleCancelChanges}
      />
    </div>
  );
}

