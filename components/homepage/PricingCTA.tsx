"use client";

import React from "react";
import Reveal from "./Reveal";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export default function PricingCTA() {
  const { t } = useI18n();

  const plans = [
    {
      name: t.pricing.basic.name,
      price: t.pricing.basic.price,
      period: t.pricing.basic.period,
      description: t.pricing.basic.description,
      badge: t.pricing.basic.badge,
      features: t.pricing.basic.features,
      cta: t.pricing.basic.cta,
      highlighted: false,
    },
    {
      name: t.pricing.professional.name,
      price: t.pricing.professional.price,
      period: t.pricing.professional.period,
      description: t.pricing.professional.description,
      badge: t.pricing.professional.badge,
      features: t.pricing.professional.features,
      cta: t.pricing.professional.cta,
      highlighted: true,
    },
  ];

  return (
    <section id="mua-goi" className="relative overflow-hidden bg-white py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-32 h-64 w-64 rounded-full bg-red-100 blur-3xl" />
        <div className="absolute -right-24 bottom-32 h-64 w-64 rounded-full bg-red-100 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <h2 className="font-cakelan text-3xl md:text-4xl font-semibold text-slate-900">
            {t.pricing.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">{t.pricing.subtitle}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:max-w-5xl lg:mx-auto">
          {plans.map((plan, idx) => (
            <Reveal key={idx} delay={0.1 * idx}>
              <div
                className={`group relative rounded-3xl transition-all duration-300 ${
                  plan.highlighted
                    ? "border-2 border-red-500 bg-gradient-to-br from-white to-red-50/30 shadow-xl hover:shadow-2xl hover:shadow-red-500/20"
                    : "border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl hover:border-red-300"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-red-600 to-red-500 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <h3 className="font-cakelan text-2xl font-semibold text-slate-900">{plan.name}</h3>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-cakelan text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-sm text-slate-600">{plan.description}</p>

                  {/* CTA Button */}
                  <a
                    href="/quan-ly/bot"
                    className={`mt-6 block w-full rounded-lg py-3 px-4 text-center font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-500/30 hover:from-red-700 hover:to-red-600"
                        : "border-2 border-red-600 text-red-600 hover:bg-red-50"
                    }`}
                  >
                    {plan.cta}
                  </a>

                  {/* Features List */}
                  <div className="mt-8 space-y-4 border-t border-slate-200 pt-8">
                    <p className="text-sm font-semibold text-slate-900">Bạn nhận được:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="mt-0.5 size-5 flex-shrink-0 text-red-600" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

