"use client";

import { useState, use } from "react";
import dynamic from "next/dynamic";
import { BotConfigHeader } from "@/components/quan-ly/bot/config/BotConfigHeader";
import { SystemPromptSection } from "@/components/quan-ly/bot/config/SystemPromptSection";
import { FirstMessageSection } from "@/components/quan-ly/bot/config/FirstMessageSection";

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

interface BotConfig {
  id: string;
  name: string;
  industry: string;
  useCase: string;
  goal: string;
  firstMessage: string;
  selectedLLM: string;
}

// Mock bot data - in production, this would come from the database
const getMockBotData = (id: string): BotConfig => {
  return {
    id,
    name: "Chatbot Demo",
    industry: "ecommerce",
    useCase: "phone",
    goal: "Thu thập thông tin liên hệ từ khách hàng",
    firstMessage: "Xin chào! Tôi có thể giúp bạn điều gì?",
    selectedLLM: "gemini",
  };
};

export default function BotConfigPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const botData = getMockBotData(id);

  const [firstMessage, setFirstMessage] = useState(botData.firstMessage);
  const [selectedLLM, setSelectedLLM] = useState(botData.selectedLLM);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // TODO: Implement actual publish logic
      console.log("Publishing bot:", {
        id,
        firstMessage,
        selectedLLM,
      });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } finally {
      setIsPublishing(false);
    }
  };

  const handleTest = () => {
    // TODO: Implement test bot logic
    console.log("Testing bot:", id);
  };

  return (
    <div className="space-y-8">
      {/* Header with Action Buttons */}
      <BotConfigHeader
        botName={botData.name}
        onTest={handleTest}
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* System Prompt Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <SystemPromptSection
              botName={botData.name}
              industry={botData.industry}
              useCase={botData.useCase}
              goal={botData.goal}
            />
          </div>

          {/* First Message Section */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <FirstMessageSection
              initialMessage={firstMessage}
              onMessageChange={setFirstMessage}
            />
          </div>
        </div>

        {/* Right Column - Feature Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-sm font-semibold text-slate-900">
              Tính năng
            </p>
            <div className="space-y-3">
              <PlatformIntegrationCard />
              <DataImportCard />
              <LLMSelectionCard
                selectedLLM={selectedLLM}
                onLLMChange={setSelectedLLM}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

