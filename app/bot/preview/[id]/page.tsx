"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Send, X, Circle } from "lucide-react";
import { ChatMessage } from "@/components/quan-ly/bot/preview/ChatMessage";
import { TypingIndicator } from "@/components/quan-ly/bot/preview/TypingIndicator";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

interface BotConfig {
  id: string;
  name: string;
  industry: string;
  useCase: string;
  goal: string;
  firstMessage: string;
  selectedLLM: string;
}

function getMockBotData(id: string): BotConfig {
  return {
    id,
    name: "Chatbot Demo",
    industry: "ecommerce",
    useCase: "phone",
    goal: "Thu thập thông tin liên hệ từ khách hàng",
    firstMessage: "Xin chào! Tôi có thể giúp bạn điều gì?",
    selectedLLM: "gemini",
  };
}

function generateMockResponse(userMessage: string): string {
  const responses = [
    `Cảm ơn bạn đã nói: "${userMessage}". Tôi sẽ cố gắng giúp bạn tốt nhất có thể.`,
    `Đó là một câu hỏi tuyệt vời! Liên quan đến "${userMessage}", tôi có thể cung cấp thêm thông tin.`,
    `Tôi hiểu rồi. Bạn đang hỏi về "${userMessage}". Hãy cho tôi biết thêm chi tiết.`,
    `Thú vị! Về "${userMessage}", tôi có một số gợi ý cho bạn.`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export default function BotPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [botData, setBotData] = useState<BotConfig | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize bot data and first message
  useEffect(() => {
    const data = getMockBotData(id);
    setBotData(data);
    setMessages([
      {
        id: "1",
        role: "bot",
        content: data.firstMessage,
      },
    ]);
  }, [id]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !botData) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true); // Show typing indicator immediately

    // Simulate bot thinking (1 second delay)
    setTimeout(() => {
      const botResponse = generateMockResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: botResponse,
      };

      // Hide typing indicator BEFORE adding the message
      setIsTyping(false);

      // Add bot message with typing effect
      setMessages((prev) => [...prev, botMessage]);

      // Stop loading after typewriter effect completes
      setTimeout(() => {
        setIsLoading(false);
      }, botResponse.length * 30 + 500);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!botData) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-slate-600">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
              <span className="text-sm font-bold text-red-600">
                {botData.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-white">{botData.name}</h1>
              <div className="flex items-center gap-1">
                <Circle className="h-2 w-2 fill-green-300 text-green-300" />
                <p className="text-xs text-green-100">Trực tuyến</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="rounded-lg p-2 text-white transition-all hover:bg-white/20 active:scale-95"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Container - Scrollable with proper spacing */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ marginTop: "72px", marginBottom: "120px" }}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ChatMessage
                role={message.role}
                content={message.content}
                botName={botData.name}
                isTyping={message.role === "bot" && message === messages[messages.length - 1]}
              />
            </div>
          ))}
          {isTyping && messages[messages.length - 1]?.role !== "bot" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <TypingIndicator botName={botData.name} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-6 py-4 shadow-lg">
        <div className="flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn của bạn..."
            disabled={isLoading}
            className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-200 disabled:bg-slate-50"
            rows={3}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md transition-all hover:shadow-lg hover:scale-105 active:scale-95 disabled:bg-slate-300 disabled:shadow-none"
            aria-label="Gửi"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

