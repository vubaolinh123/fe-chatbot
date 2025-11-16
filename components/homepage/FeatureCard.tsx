"use client";

import { motion } from "framer-motion";
import { LucideIcon, CheckCircle } from "lucide-react";
import Image from "next/image";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  index: number;
  mockupImage?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
  index,
  mockupImage,
}: FeatureCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 lg:py-24`}
    >
      {/* Content */}
      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gray-800/50 border border-red-600/50">
              <Icon size={32} className="text-red-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-100">{title}</h2>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={20} className="text-red-500 shrink-0 mt-1" />
                <span className="text-gray-400">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Icon/Visual */}
      <div className={isEven ? "lg:order-2" : "lg:order-1"}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="relative h-80 rounded-2xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center overflow-hidden group hover:border-red-600/50 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {mockupImage ? (
            <div className="relative z-10 w-full h-full">
              <Image
                src={mockupImage}
                alt={`${title} mockup`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="relative z-10 p-8">
              <Icon size={120} className="text-red-500/20 group-hover:text-red-500/40 transition-colors" />
            </div>
          )}
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/5 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </motion.div>
  );
}

