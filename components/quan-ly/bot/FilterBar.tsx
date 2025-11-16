"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

type BotStatus = "running" | "testing";

interface FilterBarProps {
  onSearchChange: (value: string) => void;
  onStatusChange?: (status: BotStatus | null) => void;
}

export function FilterBar({
  onSearchChange,
  onStatusChange,
}: FilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<"newest" | "oldest">(
    "newest"
  );
  const [selectedStatus, setSelectedStatus] = useState<BotStatus | null>(null);

  const handleSortChange = (sort: "newest" | "oldest") => {
    setSelectedSort(sort);
    setSortOpen(false);
  };

  const handleStatusChange = (status: BotStatus | null) => {
    setSelectedStatus(status);
    setStatusOpen(false);
    onStatusChange?.(status);
  };

  const sortLabel = selectedSort === "newest" ? "Mới nhất" : "Cũ nhất";
  const statusLabel = selectedStatus
    ? selectedStatus === "running"
      ? "Đang chạy"
      : "Thử nghiệm"
    : "Tất cả trạng thái";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-white px-4 py-3 shadow-sm shadow-red-100 font-sans md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bot, loại bot..."
            className="h-9 w-full rounded-xl border border-red-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-500 outline-none ring-0 transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-200"
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
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
          >
            <span>{sortLabel}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-red-200 bg-white shadow-lg">
              <button
                type="button"
                onClick={() => handleSortChange("newest")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedSort === "newest"
                    ? "bg-red-100 text-red-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Mới nhất
              </button>
              <button
                type="button"
                onClick={() => handleSortChange("oldest")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedSort === "oldest"
                    ? "bg-red-100 text-red-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Cũ nhất
              </button>
            </div>
          )}
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setStatusOpen(!statusOpen)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
          >
            <span>{statusLabel}</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {statusOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-48 rounded-lg border border-red-200 bg-white shadow-lg">
              <button
                type="button"
                onClick={() => handleStatusChange(null)}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedStatus === null
                    ? "bg-red-100 text-red-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Tất cả trạng thái
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("running")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedStatus === "running"
                    ? "bg-red-100 text-red-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Đang chạy
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("testing")}
                className={`block w-full px-3 py-2 text-left text-xs transition-colors ${
                  selectedStatus === "testing"
                    ? "bg-red-100 text-red-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                Thử nghiệm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

