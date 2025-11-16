"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  BookOpen,
  HelpCircle,
} from "lucide-react";

interface IndustryStepProps {
  onSelect: (industry: string) => void;
}

interface Industry {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const industries: Industry[] = [
  { id: "ecommerce", name: "Thương mại điện tử", icon: ShoppingBag },
  { id: "healthcare", name: "Sức khỏe", icon: Heart },
  { id: "education", name: "Giáo dục", icon: BookOpen },
  { id: "other", name: "Khác", icon: HelpCircle },
];

export function IndustryStep({ onSelect }: IndustryStepProps) {
  const [customIndustry, setCustomIndustry] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelect = (id: string) => {
    if (id === "other") {
      setShowCustomInput(true);
    } else {
      onSelect(id);
    }
  };

  const handleCustomSubmit = () => {
    if (customIndustry.trim()) {
      onSelect(customIndustry);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Chọn lĩnh vực kinh doanh
        </h1>
        <p className="mt-2 text-slate-600">
          Lĩnh vực nào phù hợp nhất với doanh nghiệp của bạn?
        </p>
      </div>

      {/* Custom Input */}
      {showCustomInput && (
        <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <input
            type="text"
            placeholder="Nhập lĩnh vực của bạn..."
            value={customIndustry}
            onChange={(e) => setCustomIndustry(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomIndustry("");
              }}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              onClick={handleCustomSubmit}
              className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Xác nhận
            </button>
          </div>
        </div>
      )}

      {/* Industry Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <button
              key={industry.id}
              onClick={() => handleSelect(industry.id)}
              className="group rounded-xl border-2 border-slate-200 bg-white p-6 text-center transition-all hover:border-red-300 hover:bg-red-50"
            >
              <Icon className="mx-auto h-8 w-8 text-slate-600 transition-colors group-hover:text-red-600" />
              <p className="mt-3 font-semibold text-slate-900">
                {industry.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

