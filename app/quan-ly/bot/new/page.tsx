"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { IndustryStep } from "@/components/quan-ly/bot/new/IndustryStep";
import { UseCaseStep } from "@/components/quan-ly/bot/new/UseCaseStep";
import { DetailsStep } from "@/components/quan-ly/bot/new/DetailsStep";
import { ProgressIndicator } from "@/components/quan-ly/bot/new/ProgressIndicator";
import { createBot } from "@/lib/api/bot.api";
import { showSuccessToast, showErrorToast, showLoadingToast, updateToast } from "@/lib/toast-config";

export interface CreateBotFormData {
  industry: string;
  useCase: string;
  name: string;
  goal: string;
  firstMessage: string;
  website?: string;
  chatOnly: boolean;
}

export default function CreateBotPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CreateBotFormData>({
    industry: "",
    useCase: "",
    name: "",
    goal: "",
    firstMessage: "Xin chào! Tôi có thể giúp bạn điều gì?",
    website: "",
    chatOnly: false,
  });

  const handleIndustrySelect = (industry: string) => {
    setFormData({ ...formData, industry });
    setCurrentStep(2);
  };

  const handleUseCaseSelect = (useCase: string) => {
    setFormData({ ...formData, useCase });
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (data: CreateBotFormData) => {
    // Show loading toast
    const loadingToastId = showLoadingToast("⏳ Đang tạo chatbot của bạn...");

    try {
      // Prepare data for API
      const createBotData = {
        name: data.name,
        status: "INACTIVE" as const,
        description: `${data.industry} - ${data.useCase}`,
        field: data.industry,
        target: data.useCase,
        firstMessage: data.firstMessage,
        mainTarget: data.goal,
      };

      // Call API to create bot
      const response = await createBot(createBotData);

      // Update loading toast to success
      updateToast(loadingToastId, "✓ Tạo chatbot thành công! Đang chuyển hướng...", "success");

      // Redirect to bot details page
      const botId = response.data._id;
      setTimeout(() => {
        router.push(`/quan-ly/bot/${botId}`);
      }, 1500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Không thể tạo chatbot";

      // Update loading toast to error
      updateToast(loadingToastId, `✗ Không thể tạo chatbot: ${errorMessage}`, "error");
      console.error("Error creating bot:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} />

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Back Button */}
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Quay lại
            </button>
          )}

          {/* Step Content */}
          <div className="animate-in fade-in duration-300">
            {currentStep === 1 && (
              <IndustryStep onSelect={handleIndustrySelect} />
            )}
            {currentStep === 2 && (
              <UseCaseStep onSelect={handleUseCaseSelect} />
            )}
            {currentStep === 3 && (
              <DetailsStep
                formData={formData}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

