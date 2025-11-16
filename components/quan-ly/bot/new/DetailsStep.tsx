"use client";

import { useState } from "react";
import type { CreateBotFormData } from "@/app/quan-ly/bot/new/page";

interface DetailsStepProps {
  formData: CreateBotFormData;
  onSubmit: (data: CreateBotFormData) => void;
  onBack: () => void;
}

interface FormErrors {
  name?: boolean;
  goal?: boolean;
}

export function DetailsStep({
  formData,
  onSubmit,
  onBack,
}: DetailsStepProps) {
  const [localFormData, setLocalFormData] = useState(formData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!localFormData.name.trim()) {
      newErrors.name = true;
    }
    if (!localFormData.goal.trim()) {
      newErrors.goal = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        onSubmit(localFormData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Hoàn tất thông tin chatbot
        </h1>
        <p className="mt-2 text-slate-600">
          Đặt tên cho chatbot và mô tả mục tiêu của nó
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Chatbot Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900">
            Tên Chatbot <span className="text-red-600">*</span>
          </label>
          <div className="relative mt-2">
            <input
              id="name"
              type="text"
              maxLength={50}
              placeholder="Nhập tên chatbot..."
              value={localFormData.name}
              onChange={(e) => {
                setLocalFormData({ ...localFormData, name: e.target.value });
                if (errors.name) {
                  setErrors({ ...errors, name: false });
                }
              }}
              className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200 ${
                errors.name ? "border-red-300" : "border-slate-200"
              }`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              {localFormData.name.length}/50
            </span>
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">Vui lòng nhập tên chatbot</p>
          )}
        </div>

        {/* Main Goal */}
        <div>
          <label htmlFor="goal" className="block text-sm font-semibold text-slate-900">
            Mục Tiêu Chính <span className="text-red-600">*</span>
          </label>
          <textarea
            id="goal"
            placeholder="Mô tả mục tiêu chính của chatbot..."
            value={localFormData.goal}
            onChange={(e) => {
              setLocalFormData({ ...localFormData, goal: e.target.value });
              if (errors.goal) {
                setErrors({ ...errors, goal: false });
              }
            }}
            className={`mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200 ${
              errors.goal ? "border-red-300" : "border-slate-200"
            }`}
            rows={5}
          />
          {errors.goal && (
            <p className="mt-1 text-xs text-red-600">Vui lòng nhập mục tiêu chính</p>
          )}
        </div>

        {/* Chat Only Toggle */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <button
            type="button"
            onClick={() =>
              setLocalFormData({ ...localFormData, chatOnly: !localFormData.chatOnly })
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              localFormData.chatOnly ? "bg-red-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                localFormData.chatOnly ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">Chỉ Chat</p>
            <p className="text-xs text-slate-600">
              Chỉ xử lý tin nhắn văn bản, không xử lý âm thanh
            </p>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
        >
          Quay lại
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-700/40 disabled:opacity-50"
        >
          {isSubmitting ? "Đang tạo..." : "Tạo Chatbot"}
        </button>
      </div>
    </form>
  );
}

