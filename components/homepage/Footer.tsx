"use client";

import Image from "next/image";
import ScrollLink from "./ScrollLink";
import { useI18n } from "@/lib/i18n/context";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Image src="/logo/logo-black.png" width={28} height={28} alt="ASI Everest" />
            <span className="font-cakelan text-slate-800">ASI Everest</span>
          </div>
          <nav className="flex items-center gap-5 text-sm text-slate-600">
            <ScrollLink href="#hero">{t.header.home}</ScrollLink>
            <ScrollLink href="#tinh-nang">{t.header.features}</ScrollLink>
            <ScrollLink href="#huong-dan">{t.header.guide}</ScrollLink>
            <ScrollLink href="#mua-goi">{t.header.pricing}</ScrollLink>
          </nav>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} ASI Everest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

