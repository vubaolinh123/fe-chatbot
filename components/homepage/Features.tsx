"use client";

import { useI18n } from "@/lib/i18n/context";
import { FeatureCard } from "./FeatureCard";
import {
  Database,
  MessageCircle,
  Brain,
  Send,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const { t } = useI18n();

  const featuresList = [
    {
      icon: Database,
      title: t.features.dataIntegration.title,
      description: t.features.dataIntegration.description,
      features: t.features.dataIntegration.features,
      mockupImage: "/mockup/Card.jpg",
    },
    {
      icon: MessageCircle,
      title: t.features.autoResponse.title,
      description: t.features.autoResponse.description,
      features: t.features.autoResponse.features,
    },
    {
      icon: Brain,
      title: t.features.consultation.title,
      description: t.features.consultation.description,
      features: t.features.consultation.features,
    },
    {
      icon: Send,
      title: t.features.messengerIntegration.title,
      description: t.features.messengerIntegration.description,
      features: t.features.messengerIntegration.features,
      mockupImage: "/mockup/Signboard.jpg",
    },
    {
      icon: Users,
      title: t.features.customerData.title,
      description: t.features.customerData.description,
      features: t.features.customerData.features,
    },
  ];

  return (
    <section id="features" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
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
            Tính Năng <span className="text-red-500">Mạnh Mẽ</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tất cả những gì bạn cần để xây dựng một chatbot AI thông minh cho doanh nghiệp
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-0">
          {featuresList.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              index={index}
              mockupImage={feature.mockupImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

