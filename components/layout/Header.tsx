"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { language, setLanguage, t } = useI18n();
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src="/logo/logo-white.png"
              alt="ASI Everest"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 hover:text-red-500 transition-colors font-medium">
              {t.header.home}
            </a>
            <a href="#features" className="text-gray-300 hover:text-red-500 transition-colors font-medium">
              {t.header.features}
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition-colors font-medium">
              {t.header.pricing}
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition-colors font-medium">
              {t.header.contact}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-300 transition-colors border border-gray-700/50 hover:border-red-600/50"
            >
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
              <ChevronDown size={16} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700/50 rounded-lg overflow-hidden shadow-lg">
                <button
                  onClick={() => {
                    setLanguage("vi");
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${
                    language === "vi" ? "bg-gray-700 text-red-400" : "text-gray-300"
                  }`}
                >
                  Tiếng Việt
                </button>
                <button
                  onClick={() => {
                    setLanguage("en");
                    setIsLangOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${
                    language === "en" ? "bg-gray-700 text-red-400" : "text-gray-300"
                  }`}
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

