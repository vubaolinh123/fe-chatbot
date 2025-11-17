"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Send, X, Circle, Paperclip } from "lucide-react";
import { ChatMessage } from "@/components/quan-ly/bot/preview/ChatMessage";
import { TypingIndicator } from "@/components/quan-ly/bot/preview/TypingIndicator";
import { getMessageHistory, sendMessage, getBotDetail, BotDetailData } from "@/lib/api/bot.api";
import { showErrorToast } from "@/lib/toast-config";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ParsedMessage {
  type: "ai" | "human";
  data: {
    content: string;
    [key: string]: any;
  };
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function parseMessageHistory(rawMessages: string[]): Message[] {
  const messages: Message[] = [];

  for (const jsonString of rawMessages) {
    try {
      const parsed: ParsedMessage = JSON.parse(jsonString);

      if (!parsed.type || !parsed.data?.content) {
        console.warn("Invalid message structure:", parsed);
        continue;
      }

      messages.push({
        id: generateId(),
        role: parsed.type === "ai" ? "assistant" : "user",
        content: parsed.data.content,
      });
    } catch (error) {
      console.error("Failed to parse message:", jsonString, error);
    }
  }

  return messages;
}

export default function BotPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [botData, setBotData] = useState<BotDetailData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch bot detail & message history on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsInitialLoading(true);

      try {
        const [botDetailResult, historyResult] = await Promise.allSettled([
          getBotDetail(id),
          getMessageHistory(id),
        ]);

        if (!isMounted) return;

        // Handle bot detail
        if (botDetailResult.status === "fulfilled") {
          const detailResponse = botDetailResult.value;
          if (detailResponse.error === 0 && detailResponse.data) {
            setBotData(detailResponse.data);
          } else {
            console.error("Failed to fetch bot detail or missing data", detailResponse);
          }
        } else {
          console.error("Failed to fetch bot detail:", botDetailResult.reason);
        }

        // Handle message history
        if (historyResult.status === "fulfilled") {
          const historyResponse = historyResult.value;
          if (historyResponse.error === 0 && historyResponse.data?.data) {
            const parsedMessages = parseMessageHistory(historyResponse.data.data);
            setMessages(parsedMessages.reverse());
          } else {
            console.warn("No message history found or API error");
            setMessages([]);
          }
        } else {
          console.error("Failed to fetch message history:", historyResult.reason);
          showErrorToast("Không thể tải lịch sử chat");
          setMessages([]);
        }
      } finally {
        if (isMounted) {
          setIsInitialLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    const tempUserMessage: Message = {
      id: generateId(),
      role: "user",
      content: userMessageText,
    };

    // Optimistic update: Add user message to UI
    setMessages((prev) => [...prev, tempUserMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Call send message API
      const sendResponse = await sendMessage({
        _id: id,
        text: userMessageText,
        kind: "text",
        uid: "",
      });

      if (sendResponse.error === 0) {
        // Fetch updated message history
        const historyResponse = await getMessageHistory(id);

        if (historyResponse.error === 0 && historyResponse.data?.data) {
          const parsedMessages = parseMessageHistory(historyResponse.data.data);
          setMessages(parsedMessages.reverse());
        }
      } else {
        throw new Error("API returned error");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      showErrorToast("Không thể gửi tin nhắn");
      // Rollback: Remove the optimistic user message
      setMessages((prev) => prev.filter((msg) => msg.id !== tempUserMessage.id));
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isInitialLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-50">
        <div className="text-stone-600">Đang tải lịch sử chat...</div>
      </div>
    );
  }

  const botName = botData?.name || "Chatbot";
  const botInitial = botName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen flex-col bg-stone-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-rose-500 via-red-500 to-orange-400 px-6 py-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 shadow-sm">
              <span className="text-sm font-bold text-red-600">
                {botInitial}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-white">{botName}</h1>
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
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" style={{ marginTop: "72px", marginBottom: "120px" }}>
        <div className="mx-auto max-w-2xl space-y-2.5">
          {messages.length === 0 ? (
            botData?.firstMessage ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <ChatMessage
                  role="bot"
                  content={botData.firstMessage}
                  botName={botName}
                  isTyping={false}
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-stone-500">
                <p>Chưa có lịch sử chat</p>
              </div>
            )
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ChatMessage
                    role={message.role === "assistant" ? "bot" : "user"}
                    content={message.content}
                    botName={botName}
                    isTyping={
                      message.role === "assistant" &&
                      message === messages[messages.length - 1] &&
                      isTyping
                    }
                  />
                </div>
              ))}
              {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <TypingIndicator botName={botName} />
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-stone-50 px-4 py-4 sm:px-6 shadow-md">
        <div className="mx-auto max-w-2xl">
          <div className="flex gap-3 items-end rounded-2xl border border-stone-300 bg-stone-100 px-4 py-3 shadow-sm transition-all focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-200">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn của bạn..."
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent text-sm text-stone-800 placeholder:text-stone-400 outline-none disabled:bg-transparent"
              rows={3}
            />

            {/* Upload Button */}
            <button
              disabled={isLoading}
              className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-stone-600 transition-all hover:bg-stone-200 active:scale-95 disabled:text-stone-400"
              aria-label="Đính kèm file"
              title="Đính kèm file/ảnh"
            >
              <Paperclip className="h-5 w-5" />
              <span className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded-lg bg-stone-800 px-3 py-1 text-xs text-white group-hover:block">
                Đính kèm file/ảnh
              </span>
            </button>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-white transition-all hover:shadow-md active:scale-95 disabled:bg-stone-300"
              aria-label="Gửi tin nhắn"
              title="Gửi tin nhắn"
            >
              <Send className="h-5 w-5" />
              <span className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded-lg bg-stone-800 px-3 py-1 text-xs text-white group-hover:block">
                Gửi tin nhắn
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

