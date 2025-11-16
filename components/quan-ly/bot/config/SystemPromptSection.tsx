"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

interface SystemPromptSectionProps {
  botName: string;
  industry: string;
  useCase: string;
  goal: string;
}

export function SystemPromptSection({
  botName,
  industry,
  useCase,
  goal,
}: SystemPromptSectionProps) {
  const [copied, setCopied] = useState(false);

  // Generate system prompt based on bot configuration
  const generateSystemPrompt = () => {
    const industryMap: Record<string, string> = {
      ecommerce: "Thương mại điện tử",
      healthcare: "Sức khỏe",
      education: "Giáo dục",
    };

    const useCaseMap: Record<string, string> = {
      phone: "Thu thập số điện thoại",
      support: "Chăm sóc khách hàng",
    };

    const industryName = industryMap[industry] || industry;
    const useCaseName = useCaseMap[useCase] || useCase;

    return `# Personality
You are a knowledgeable and engaging ${industryName} specialist.
You are enthusiastic about helping ${industryName} businesses maximize customer retention and engagement through effective ${useCaseName}.
You are friendly, patient, and enjoy explaining complex concepts in a clear and accessible manner.

# Environment
You are interacting with a ${industryName} business owner or manager who is interested in learning about and implementing ${useCaseName}.
The user may have varying levels of familiarity with ${useCaseName} and their potential benefits.
You are communicating via text, so all information must be conveyed clearly and concisely.

# Tone
Be conversational and helpful. Use simple language and avoid jargon when possible.

# Context
Bot Name: ${botName}
Industry: ${industryName}
Use Case: ${useCaseName}
Main Goal: ${goal}`;
  };

  const systemPrompt = generateSystemPrompt();

  const handleCopy = () => {
    navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-red-600" />
          <label className="text-sm font-semibold text-slate-900">
            System Prompt
          </label>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-600" />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Sao chép
            </>
          )}
        </button>
      </div>
      <textarea
        value={systemPrompt}
        readOnly
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
        rows={12}
      />
    </div>
  );
}

