"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  QrCode,
  Download,
  Layers,
  Palette,
  Code,
  Zap,
  Smartphone,
} from "lucide-react";
import { FEATURES } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// Features Section - Glass Cards with Gradient Icons
// ======================

const iconMap: Record<string, React.ElementType> = {
  barChart: BarChart3,
  qrCode: QrCode,
  download: Download,
  layers: Layers,
  palette: Palette,
  code: Code,
  zap: Zap,
  smartphone: Smartphone,
};

const featureGradients = [
  "from-primary-500 to-primary-600",
  "from-secondary-500 to-secondary-600",
  "from-accent-500 to-accent-600",
  "from-primary-600 to-secondary-500",
  "from-secondary-500 to-primary-500",
  "from-accent-500 to-primary-500",
  "from-primary-500 to-accent-500",
  "from-secondary-600 to-accent-500",
];

export function FeaturesSection() {
  return (
    <Section variant="muted" spacing="xl" id="features" className="relative section-divider-top">
      {/* Background mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50 dark:opacity-30 pointer-events-none" />

      <Container className="relative">
        <SectionHeader
          badge="Features"
          title="Everything You Need"
          subtitle="Powerful tools to generate, customize, and manage barcodes and QR codes for any use case."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-7 md:p-8 rounded-3xl bg-white/70 dark:bg-surface-800/40 backdrop-blur-xl border border-surface-200/50 dark:border-surface-700/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-surface-900/[0.06] dark:hover:shadow-primary-500/[0.06] transition-all duration-500 cursor-default gradient-border-hover flex flex-col"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/[0.02] via-transparent to-secondary-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon with gradient background */}
                <div className="relative mb-5 md:mb-6">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${featureGradients[index % featureGradients.length]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="relative text-lg md:text-xl font-bold text-surface-900 dark:text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="relative text-sm md:text-[15px] text-surface-500 dark:text-surface-400 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
