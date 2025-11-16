"use client";

import { useState, useEffect } from "react";
import { Zap, X } from "lucide-react";

export function PlatformIntegrationCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

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

  return (
    <>
      {/* Card */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-red-300 hover:shadow-md hover:scale-[1.02]"
      >
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h3 className="font-semibold text-slate-900">
              Tích hợp đa nền tảng
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Kết nối với các nền tảng khác
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
                Tích hợp đa nền tảng
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="mb-6 flex gap-2">
              {[
                { id: "all", label: "Tất cả" },
                { id: "pending", label: "Chờ kích hoạt" },
                { id: "facebook", label: "Facebook" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? "bg-red-600 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Facebook Integration Card */}
            {(selectedFilter === "all" || selectedFilter === "facebook") && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                    <span className="text-xl font-bold text-blue-600">f</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">Facebook</h3>
                    <p className="mt-2 text-sm text-slate-700">
                      Kết nối ASI Everest với Facebook. Sử dụng ASI Everest để
                      khóa mục tiêu mua hàng qua tin nhắn trên Ads Manager.
                      Chatbot AI tự động nhắn tin, chốt đơn tăng tỷ lệ 50%
                    </p>
                    <button
                      className="mt-4 rounded-lg px-4 py-2 font-semibold text-white transition-colors"
                      style={{
                        backgroundColor: "#1877F2",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#0a66c2";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#1877F2";
                      }}
                    >
                      Kết nối với Facebook
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {selectedFilter === "pending" && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-slate-600">
                  Không có nền tảng nào đang chờ kích hoạt
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

