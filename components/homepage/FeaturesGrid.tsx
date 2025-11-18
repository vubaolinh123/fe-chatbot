"use client";

import React from "react";
import Reveal from "./Reveal";
import { Database, MessageCircle, Brain, Send, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

function FeatureCard({
  icon: Icon,
  title,
  description,
  bullets,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10">
      {/* Red accent gradient on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 to-red-500/0 opacity-0 transition-opacity duration-300 group-hover:from-red-500/5 group-hover:to-red-500/0 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <div className="rounded-lg bg-gradient-to-br from-red-50 to-red-100/50 p-2 text-red-600 transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-cakelan text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-red-600">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <ul className="relative mt-4 space-y-2 text-sm text-slate-700">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 size-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-transform duration-300 group-hover:scale-125" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FeaturesGrid() {
  const { t } = useI18n();
  const list = [
    {
      icon: Database,
      title: t.features.dataIntegration.title,
      description: t.features.dataIntegration.description,
      bullets: t.features.dataIntegration.features,
    },
    {
      icon: MessageCircle,
      title: t.features.autoResponse.title,
      description: t.features.autoResponse.description,
      bullets: t.features.autoResponse.features,
    },
    {
      icon: Brain,
      title: t.features.consultation.title,
      description: t.features.consultation.description,
      bullets: t.features.consultation.features,
    },
    {
      icon: Send,
      title: t.features.messengerIntegration.title,
      description: t.features.messengerIntegration.description,
      bullets: t.features.messengerIntegration.features,
    },
    {
      icon: Users,
      title: t.features.customerData.title,
      description: t.features.customerData.description,
      bullets: t.features.customerData.features,
    },
  ];

  return (
    <section id="tinh-nang" className="relative bg-white py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-12 h-48 w-48 rounded-full bg-red-100 blur-3xl sm:left-[-6rem] sm:top-24 sm:h-64 sm:w-64" />
        <div className="absolute -right-32 bottom-12 h-48 w-48 rounded-full bg-red-100 blur-3xl sm:right-[-6rem] sm:bottom-24 sm:h-64 sm:w-64" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-cakelan text-3xl md:text-4xl font-semibold text-slate-900">
            {t.features.title} <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">{t.features.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            {t.features.subtitle}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {/* First row - 3 columns with equal heights */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {list.slice(0, 3).map((f, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <FeatureCard icon={f.icon} title={f.title} description={f.description} bullets={f.bullets} />
              </Reveal>
            ))}
          </div>

          {/* Second row - 2 columns, centered with equal heights */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:mx-auto lg:w-2/3 auto-rows-fr">
            {list.slice(3).map((f, i) => (
              <Reveal key={i + 3} delay={0.05 * (i + 3)}>
                <FeatureCard icon={f.icon} title={f.title} description={f.description} bullets={f.bullets} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

