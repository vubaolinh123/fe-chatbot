"use client";

import { useState, useEffect } from "react";
import { Upload, X, File, Trash2 } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
}

export function DataImportCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <>
      {/* Card */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left transition-all hover:border-red-300 hover:shadow-md hover:scale-[1.02]"
      >
        <div className="flex items-start gap-3">
          <Upload className="h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h3 className="font-semibold text-slate-900">
              Import dữ liệu huấn luyện
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Tải lên tài liệu để huấn luyện chatbot
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
                Import FAQs
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mb-6 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                isDragging
                  ? "border-red-400 bg-red-50"
                  : "border-slate-300 bg-slate-50"
              }`}
            >
              <Upload className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-3 font-medium text-slate-900">
                Tải tài liệu từ máy tính, chọn, hoặc kéo thả
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Cho phép các định dạng file: .pdf .docx .xls, .xlsx
              </p>
              <label className="mt-4 inline-block">
                <input
                  type="file"
                  multiple
                  accept=".xls,.xlsx,.txt,.pdf,.docx,.csv"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <span className="inline-block rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-900 transition-colors hover:bg-slate-300">
                  Chọn tài liệu
                </span>
              </label>
            </div>

            {/* File Info */}
            <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-900">
                Các định dạng tệp được chấp nhận bao gồm .pdf .docx .xls, .xlsx. Tệp chứa
                tối đa 1000 dòng dữ liệu và không vượt quá 100MB
              </p>
              <a href="#" className="mt-2 inline-block text-sm font-medium text-red-600 hover:text-red-700">
                Tải đây
              </a>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mb-6 space-y-2">
                <p className="text-sm font-semibold text-slate-900">
                  Tệp đã tải lên ({uploadedFiles.length})
                </p>
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
                  >
                    <div className="flex items-center gap-3">
                      <File className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="rounded-lg p-1 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex gap-3 border-t border-slate-200 pt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Thoát
              </button>
              <button
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
              >
                Nhập dữ liệu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

