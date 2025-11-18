"use client";

import Image from "next/image";
import React from "react";
import { useI18n } from "@/lib/i18n/context";
import ScrollLink from "./ScrollLink";
import { Languages } from "lucide-react";

export default function Header() {
  const { language, setLanguage, t } = useI18n();
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`font-cakelan fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 supports-[backdrop-filter]:bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-white/60 supports-[backdrop-filter]:bg-white/50 backdrop-blur"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo/logo-red.png" width={36} height={36} alt="ASI Everest" />
            <span className="text-xl md:text-2xl font-semibold text-red-600 tracking-tight">
              ASI Everest
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-slate-700">
            <ScrollLink href="#hero" className="hover:text-red-600 transition-colors">{t.header.home}</ScrollLink>
            <ScrollLink href="#tinh-nang" className="hover:text-red-600 transition-colors">{t.header.features}</ScrollLink>
            <ScrollLink href="#huong-dan" className="hover:text-red-600 transition-colors">{t.header.guide}</ScrollLink>
            <ScrollLink href="#mua-goi" className="hover:text-red-600 transition-colors">{t.header.pricing}</ScrollLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              aria-label="Toggle language"
            >
              <Languages className="size-4 text-slate-500" />
              <span>{language === "vi" ? "VI" : "EN"}</span>
            </button>
            <ScrollLink
              href="#mua-goi"
              className="hidden md:inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 shadow-sm"
            >
              {t.pricing?.basic?.cta ?? "Bắt đầu ngay"}
            </ScrollLink>
          </div>
        </div>
      </div>
    </header>
  );
}

