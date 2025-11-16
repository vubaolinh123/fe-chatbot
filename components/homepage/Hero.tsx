"use client";

import { useI18n } from "@/lib/i18n/context";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { t } = useI18n();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-100 leading-tight"
          >
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2">
                {t.hero.cta}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button className="px-8 py-4 border-2 border-red-600 text-red-400 font-bold rounded-lg hover:bg-red-600/10 transition-all hover:shadow-lg hover:shadow-red-600/30">
              {t.hero.features}
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "Conversations" },
              { number: "99.9%", label: "Uptime" },
              { number: "50MB", label: "Max File Size" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-red-600/60 transition-colors">
                <div className="text-2xl font-bold text-red-500">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

