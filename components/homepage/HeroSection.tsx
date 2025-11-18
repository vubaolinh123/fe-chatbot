"use client";

import React from "react";
import Reveal from "./Reveal";
import ScrollLink from "./ScrollLink";
import { Sparkles, PlayCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import Image from "next/image";

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section id="hero" className="relative bg-white pt-28 md:pt-32">
      {/* Accent background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-gradient-to-br from-red-400/40 to-red-600/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-6rem] h-80 w-80 rounded-full bg-red-500/10 blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Copy */}
          <Reveal className="font-cakelan">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-700">
              <Sparkles className="size-3.5" /> <span>AI Chatbot cho doanh nghiệp</span>
            </div>
            <h1 className="mt-4 text-4xl leading-tight text-slate-900 md:text-5xl">
              {t.hero.title}
            </h1>
            <p className="mt-4 text-base text-slate-600 md:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ScrollLink
                href="#mua-goi"
                className="inline-flex items-center rounded-md bg-red-600 px-5 py-3 text-white shadow-sm hover:bg-red-700"
              >
                {t.hero.cta}
              </ScrollLink>
              <ScrollLink
                href="#huong-dan"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-700 hover:bg-slate-50"
              >
                <PlayCircle className="size-5" /> Demo / Hướng dẫn
              </ScrollLink>
            </div>
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white">
              <Image
                src="/mockup/Card.jpg"
                alt="Product preview"
                width={1280}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

