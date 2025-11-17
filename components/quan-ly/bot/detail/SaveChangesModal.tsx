"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Save, X, Loader2 } from "lucide-react";

interface SaveChangesModalProps {
  isVisible: boolean;
  isSubmitting?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function SaveChangesModal({
  isVisible,
  isSubmitting = false,
  onSave,
  onCancel,
}: SaveChangesModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);

  if (!isVisible && !isAnimating) {
    return null;
  }

  return (
    <>
      {/* Modal */}
      <div
        className={`fixed bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 transform rounded-xl border border-slate-200 bg-white p-6 shadow-2xl transition-all duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 pointer-events-none opacity-0"
        }`}
        style={{
          fontFamily: "1FTV-Cakelan, sans-serif",
        }}
      >
        {/* Content */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">
                Bạn vừa thay đổi thông tin
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Bạn có muốn lưu các thay đổi không?
              </p>
            </div>
            <button
              onClick={onCancel}
              disabled={isSubmitting}
              className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Hủy
            </button>
            <button
              onClick={onSave}
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Lưu
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

