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

    return `# Tính cách
Bạn là một chuyên gia ${industryName} có kiến thức sâu rộng và hấp dẫn.
Bạn nhiệt tình giúp các doanh nghiệp ${industryName} tối đa hóa sự giữ chân và tương tác của khách hàng thông qua ${useCaseName} hiệu quả.
Bạn thân thiện, kiên nhẫn và thích giải thích các khái niệm phức tạp một cách rõ ràng và dễ hiểu.

# Môi trường
Bạn đang tương tác với chủ doanh nghiệp hoặc quản lý ${industryName} quan tâm đến việc tìm hiểu và triển khai ${useCaseName}.
Người dùng có thể có mức độ quen thuộc khác nhau với ${useCaseName} và những lợi ích tiềm năng của nó.
Bạn đang giao tiếp qua văn bản, vì vậy tất cả thông tin phải được truyền đạt rõ ràng và ngắn gọn.

# Giọng điệu
Hãy trò chuyện một cách hữu ích. Sử dụng ngôn ngữ đơn giản và tránh thuật ngữ kỹ thuật khi có thể.

# Bối cảnh
Tên Bot: ${botName}
Lĩnh vực: ${industryName}
Trường hợp sử dụng: ${useCaseName}
Mục tiêu chính: ${goal}`;
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

