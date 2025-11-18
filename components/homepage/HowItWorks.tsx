"use client";

import React from "react";
import Reveal from "./Reveal";
import { Plus, Settings2, Upload, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function HowItWorks() {
  const { language } = useI18n();
  const copy = {
    vi: {
      title: "Cách hoạt động",
      subtitle: "4 bước đơn giản để khởi chạy chatbot AI của bạn",
      steps: [
        { icon: Plus, title: "1. Tạo Chatbot", desc: "Tạo và chọn các lĩnh vực và nhu cầu mà khách hàng muốn chatbot thực hiện" },
        { icon: Settings2, title: "2. Cấu Hình", desc: "Tùy chỉnh giọng điệu, nguồn dữ liệu, kịch bản trả lời và tích hợp kênh" },
        { icon: Upload, title: "3. Nạp dữ liệu", desc: "Tải PDF, Doc, Sheet hoặc CSV – hệ thống tự xử lý và huấn luyện nhanh" },
        { icon: Rocket, title: "4. Triển khai", desc: "Nhúng lên các nền tảng mạng xã hội, website và sẵn sàng vận hành" },
      ],
    },
    en: {
      title: "How it works",
      subtitle: "4 simple steps to launch your AI chatbot",
      steps: [
        { icon: Plus, title: "1. Create Chatbot", desc: "Create and select the domains and needs that customers want the chatbot to perform" },
        { icon: Settings2, title: "2. Configure", desc: "Tune tone, data sources, answer flows and channel integrations" },
        { icon: Upload, title: "3. Ingest data", desc: "Upload PDF, Doc, Sheet or CSV – we process and train fast" },
        { icon: Rocket, title: "4. Deploy", desc: "Embed on social media platforms, website and ready to operate" },
      ],
    },
  } as const;

  const t = copy[language];

  return (
    <section id="huong-dan" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-cakelan text-3xl md:text-4xl font-semibold text-slate-900">{t.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">{t.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <Reveal key={i} delay={0.06 * i}>
              <div className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10">
                {/* Red accent gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-red-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-red-50 to-red-100/50 p-2 text-red-600 transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="size-5" />
                  </div>
                  <h3 className="font-cakelan text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-red-600">{s.title}</h3>
                </div>
                <p className="relative mt-3 text-sm text-slate-600">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

