"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface FilterBarProps {
  onSearchChange: (value: string) => void;
  onSortChange?: (sort: "newest" | "oldest") => void;
  onCategoryChange?: (category: "comments" | "messages") => void;
}

export function FilterBar({
  onSearchChange,
  onSortChange,
  onCategoryChange,
}: FilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"newest" | "oldest">(
    "newest"
  );
  const [selectedCategory, setSelectedCategory] = useState<
    "comments" | "messages"
  >("comments");

  const handleSortChange = (sort: "newest" | "oldest") => {
    setSelectedSort(sort);
    setSortOpen(false);
    onSortChange?.(sort);
  };

  const handleCategoryChange = (category: "comments" | "messages") => {
    setSelectedCategory(category);
    setCategoryOpen(false);
    onCategoryChange?.(category);
  };

  const sortLabel = selectedSort === "newest" ? "Mới nhất" : "Cũ nhất";
  const categoryLabel =
    selectedCategory === "comments" ? "Trả lời bình luận" : "Trả lời tin nhắn";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-red-500/20 bg-slate-950 px-4 py-3 shadow-sm shadow-red-500/5 font-sans md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bot, loại bot..."
            className="h-9 w-full rounded-xl border border-red-500/20 bg-slate-900/50 pl-9 pr-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none ring-0 transition-colors focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-red-500/40 hover:bg-red-500/10"
          >
            <span>{sortLabel}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-red-500/20 bg-slate-900 shadow-lg">
              <button
                type="button"
                onClick={() => handleSortChange("newest")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedSort === "newest"
                    ? "bg-red-500/20 text-red-200"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Mới nhất
              </button>
              <button
                type="button"
                onClick={() => handleSortChange("oldest")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedSort === "oldest"
                    ? "bg-red-500/20 text-red-200"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Cũ nhất
              </button>
            </div>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-red-500/40 hover:bg-red-500/10"
          >
            <span>{categoryLabel}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {categoryOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-red-500/20 bg-slate-900 shadow-lg">
              <button
                type="button"
                onClick={() => handleCategoryChange("comments")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedCategory === "comments"
                    ? "bg-red-500/20 text-red-200"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Trả lời bình luận
              </button>
              <button
                type="button"
                onClick={() => handleCategoryChange("messages")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedCategory === "messages"
                    ? "bg-red-500/20 text-red-200"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                Trả lời tin nhắn
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

