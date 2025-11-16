"use client";

import { useState, useEffect } from "react";
import { Brain, X } from "lucide-react";

interface LLMOption {
  id: string;
  name: string;
  provider: string;
}

const llmOptions: LLMOption[] = [
  { id: "gemini", name: "Gemini 2.5 Flash", provider: "Google" },
  { id: "gpt4", name: "GPT-4.1", provider: "OpenAI" },
];

interface LLMSelectionCardProps {
  selectedLLM?: string;
  onLLMChange?: (llmId: string) => void;
}

export function LLMSelectionCard({
  selectedLLM = "gemini",
  onLLMChange,
}: LLMSelectionCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedLLM);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const selectedOption = llmOptions.find((opt) => opt.id === selected);

  const handleSelect = (llmId: string) => {
    setSelected(llmId);
    onLLMChange?.(llmId);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Card */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-red-300 hover:shadow-md hover:scale-[1.02]"
      >
        <div className="flex items-start gap-3">
          <Brain className="h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h3 className="font-semibold text-slate-900">
              Chọn mô hình AI
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              {selectedOption?.name || "Chưa chọn"}
            </p>
          </div>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Chọn mô hình AI
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* LLM Options */}
            <div className="mb-6 space-y-3">
              {llmOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                    selected === option.id
                      ? "border-red-600 bg-red-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {option.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {option.provider}
                      </p>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full border-2 transition-all ${
                        selected === option.id
                          ? "border-red-600 bg-red-600"
                          : "border-slate-300"
                      }`}
                    >
                      {selected === option.id && (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex gap-3 border-t border-slate-200 pt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

