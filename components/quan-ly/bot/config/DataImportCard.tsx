"use client";

import { useState, useEffect } from "react";
import { Upload, X, File, Trash2, AlertCircle, CheckCircle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  file?: File;
}

const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".xls", ".xlsx"];
const WEBHOOK_URL = "https://contentta.cloud/webhook/upload-file";

export function DataImportCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");

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

  const validateFileExtension = (fileName: string): boolean => {
    const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
    return ALLOWED_EXTENSIONS.includes(fileExtension);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles: UploadedFile[] = [];
    const invalidFiles: string[] = [];

    files.forEach((file) => {
      if (validateFileExtension(file.name)) {
        validFiles.push({
          id: Math.random().toString(36).substring(2, 11),
          name: file.name,
          size: file.size,
          file: file,
        });
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setUploadStatus("error");
      setUploadMessage(
        `Invalid file format(s): ${invalidFiles.join(", ")}. Only .pdf, .docx, .xls, .xlsx are allowed.`
      );
      setTimeout(() => setUploadStatus("idle"), 5000);
    }

    setUploadedFiles([...uploadedFiles, ...validFiles]);
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

  const uploadFilesToWebhook = async () => {
    if (uploadedFiles.length === 0) {
      setUploadStatus("error");
      setUploadMessage("Please select at least one file to upload.");
      setTimeout(() => setUploadStatus("idle"), 5000);
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");
    setUploadMessage("");

    try {
      // Upload each file to the webhook
      const uploadPromises = uploadedFiles.map(async (uploadedFile) => {
        if (!uploadedFile.file) return;

        const formData = new FormData();
        formData.append("file", uploadedFile.file);

        try {
          const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(
              `HTTP ${response.status}: ${response.statusText}`
            );
          }

          const data = await response.json();
          console.log(`✅ File uploaded successfully: ${uploadedFile.name}`, {
            fileName: uploadedFile.name,
            fileSize: uploadedFile.size,
            response: data,
          });

          return { success: true, fileName: uploadedFile.name };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error(
            `❌ Failed to upload file: ${uploadedFile.name}`,
            {
              fileName: uploadedFile.name,
              fileSize: uploadedFile.size,
              error: errorMessage,
              fullError: error,
            }
          );

          return { success: false, fileName: uploadedFile.name };
        }
      });

      const results = await Promise.all(uploadPromises);
      const successCount = results.filter((r) => r?.success).length;
      const failureCount = results.filter((r) => !r?.success).length;

      if (failureCount === 0) {
        setUploadStatus("success");
        setUploadMessage(
          `✅ All ${successCount} file(s) uploaded successfully!`
        );
        console.log("✅ All files uploaded successfully", {
          totalFiles: uploadedFiles.length,
          successCount,
        });
        // Clear files after successful upload
        setTimeout(() => {
          setUploadedFiles([]);
          setUploadStatus("idle");
          setIsOpen(false);
        }, 2000);
      } else {
        setUploadStatus("error");
        setUploadMessage(
          `⚠️ ${successCount} file(s) uploaded, ${failureCount} file(s) failed.`
        );
        console.warn("⚠️ Some files failed to upload", {
          totalFiles: uploadedFiles.length,
          successCount,
          failureCount,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setUploadStatus("error");
      setUploadMessage("Failed to upload files. Please try again.");
      console.error("❌ Upload process failed", {
        error: errorMessage,
        fullError: error,
        filesCount: uploadedFiles.length,
      });
    } finally {
      setIsUploading(false);
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

            {/* Status Message */}
            {uploadStatus !== "idle" && (
              <div
                className={`mb-6 flex items-center gap-3 rounded-lg p-4 ${
                  uploadStatus === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {uploadStatus === "success" ? (
                  <CheckCircle className="h-5 w-5 shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0" />
                )}
                <p className="text-sm font-medium">{uploadMessage}</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex gap-3 border-t border-slate-200 pt-6">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isUploading}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Thoát
              </button>
              <button
                onClick={uploadFilesToWebhook}
                disabled={isUploading || uploadedFiles.length === 0}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Đang tải lên..." : "Nhập dữ liệu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

