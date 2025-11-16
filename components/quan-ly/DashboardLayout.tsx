"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageCircleMore,
  Database,
  Settings2,
  User,
  Menu,
  X,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    label: "Tổng quan",
    href: "/quan-ly",
    icon: LayoutDashboard,
  },
  {
    label: "Chatbot",
    href: "/quan-ly/bot",
    icon: MessageCircleMore,
    badge: "Mới",
  },
  {
    label: "Dữ liệu",
    href: "/quan-ly/data",
    icon: Database,
  },
  {
    label: "Cài đặt",
    href: "/quan-ly/settings",
    icon: Settings2,
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  const isActive = (href: string) => {
    if (href === "/quan-ly") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex font-sans">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Đóng menu điều hướng"
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 border-r border-red-500/20 bg-slate-950 transition-all duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "w-20" : "w-72"}`}
      >
        <div className="flex h-16 items-center justify-between gap-3 border-b border-red-500/20 px-4">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? "justify-center w-full" : ""}`}>
            <div className="relative h-9 w-9 flex-shrink-0">
              <Image
                src="/logo/logo-red.png"
                alt="ASI Everest Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-50">
                  ASI Everest
                </span>
                <span className="text-xs text-slate-400">
                  Quản lý Chatbot
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            aria-label={sidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
            className="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 text-red-300 transition-colors hover:border-red-500/60 hover:text-red-200"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-3 py-4 text-sm">
          {!sidebarCollapsed && (
            <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Điều hướng
            </div>
          )}
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group block"
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div
                  className={`flex h-10 items-center rounded-xl border px-3 text-xs font-medium transition-colors duration-150 ${
                    sidebarCollapsed ? "justify-center" : "justify-between"
                  } ${
                    active
                      ? "border-red-500/60 bg-red-500/15 text-slate-50"
                      : "border-transparent bg-slate-900/40 text-slate-400 hover:border-red-500/40 hover:bg-slate-900/80 hover:text-slate-50"
                  }`}
                >
                  <div className={`flex items-center ${sidebarCollapsed ? "" : "gap-3"}`}>
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-xl border text-[11px] ${
                        active
                          ? "border-red-500/60 bg-red-500/20 text-red-200"
                          : "border-slate-700/80 bg-slate-950 text-slate-300 group-hover:border-red-500/40 group-hover:text-red-200"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-red-300">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}


        </nav>

        <div className="mt-auto border-t border-red-500/20 px-4 py-3 text-[11px] text-slate-400">
          <div className={`flex items-center gap-2 mb-3 ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
            <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "gap-2"}`}>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-500/40 flex-shrink-0">
                <User className="h-4 w-4 text-red-300" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-100">Duy Phạm</span>
                  <span className="text-[10px] text-red-300 font-medium">Gói dùng thử</span>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-300 transition-colors hover:border-red-500/60 hover:text-red-200"
              >
                <Settings2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {!sidebarCollapsed && (
            <div className="space-y-2 rounded-xl border border-red-500/20 bg-red-500/10 p-2.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MessageSquare className="h-3 w-3 text-red-400" />
                  Cuộc hội thoại
                </span>
                <span className="font-semibold text-slate-100">0 / 2.000</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-900/60">
                <div className="h-full w-0 rounded-full bg-red-500 transition-all duration-300" />
              </div>
              <div className="text-[9px] text-slate-400">
                Còn lại: <span className="font-medium text-red-300">2.000</span> tin nhắn
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex min-h-screen flex-1 flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-red-500/20 bg-slate-950/85 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Mở menu điều hướng"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10 text-red-300 shadow-sm shadow-slate-950/60 transition-colors hover:border-red-500/60 hover:text-red-200 lg:hidden"
                onClick={() => setSidebarOpen((open) => !open)}
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Bảng điều khiển
                </span>
                <span className="text-sm font-semibold text-slate-50">
                  ASI Everest
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="hidden items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-200 shadow-sm shadow-slate-950/60 transition-colors hover:border-red-500/60 hover:text-red-100 md:inline-flex"
              >
                Trang Chủ
              </Link>
              <button
                type="button"
                className="hidden items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-200 shadow-sm shadow-slate-950/60 transition-colors hover:border-red-500/60 hover:text-red-100 md:inline-flex"
              >
                Hướng dẫn
              </button>
              <button
                type="button"
                className="hidden items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-200 shadow-sm shadow-slate-950/60 transition-colors hover:border-red-500/60 hover:text-red-100 md:inline-flex"
              >
                Mua Gói
              </button>
              <button
                type="button"
                aria-label="Chuyển đổi ngôn ngữ"
                className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-2 py-1.5 text-xs font-medium text-red-200 shadow-sm shadow-slate-950/60 transition-colors hover:border-red-500/60 hover:text-red-100"
                onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{language === "vi" ? "VI" : "EN"}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-950">
          <div className="w-full px-4 py-6 lg:px-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

