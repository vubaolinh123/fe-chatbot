"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  badge: string;
  features: string[];
  cta: string;
  isPopular?: boolean;
}

export function Pricing() {
  const { language, t } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const pricingTiers: PricingTier[] = [
    {
      name: t.pricing.basic.name,
      price: t.pricing.basic.price,
      period: t.pricing.basic.period,
      description: t.pricing.basic.description,
      badge: t.pricing.basic.badge,
      features: t.pricing.basic.features,
      cta: t.pricing.basic.cta,
      isPopular: true,
    },
    {
      name: t.pricing.professional.name,
      price: t.pricing.professional.price,
      period: t.pricing.professional.period,
      description: t.pricing.professional.description,
      badge: t.pricing.professional.badge,
      features: t.pricing.professional.features,
      cta: t.pricing.professional.cta,
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 -z-10" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
            {t.pricing.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative rounded-2xl border transition-all duration-300 hover:scale-105 hover:border-red-600/50 ${
                tier.isPopular
                  ? "bg-gray-800/80 border-red-600/50 ring-2 ring-red-600/30"
                  : "bg-gray-800/50 border-gray-700/50"
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {tier.badge}
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Tier Name */}
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 rounded-full border border-red-600/50 bg-gray-900/50 mb-4">
                    <span className="text-red-500 text-sm font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-100">
                      {tier.price}
                    </span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 mb-8 ${
                    tier.isPopular
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800"
                      : "bg-gray-700/50 text-gray-100 border border-gray-600/50 hover:bg-gray-700 hover:border-red-600/50"
                  }`}
                >
                  {tier.cta}
                </button>

                {/* Features List */}
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm font-semibold mb-4">
                    Bao gồm:
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <Check size={20} className="text-red-500 shrink-0 mt-0.5" />
                        <span className="text-gray-400">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

