"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { IndustryStep } from "@/components/quan-ly/bot/new/IndustryStep";
import { UseCaseStep } from "@/components/quan-ly/bot/new/UseCaseStep";
import { DetailsStep } from "@/components/quan-ly/bot/new/DetailsStep";
import { ProgressIndicator } from "@/components/quan-ly/bot/new/ProgressIndicator";

export interface CreateBotFormData {
  industry: string;
  useCase: string;
  name: string;
  goal: string;
  website?: string;
  chatOnly: boolean;
}

export default function CreateBotPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CreateBotFormData>({
    industry: "",
    useCase: "",
    name: "",
    goal: "",
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

  const handleSubmit = (data: CreateBotFormData) => {
    console.log("Creating chatbot with data:", data);
    // TODO: Implement actual chatbot creation logic
    // For now, redirect to a placeholder bot details page
    window.location.href = `/quan-ly/bot/new-bot-${Date.now()}`;
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

