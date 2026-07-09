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
// Features Section - Premium Glass Cards
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
  "from-secondary-500 to-accent-500",
  "from-accent-500 to-primary-500",
  "from-primary-500 to-accent-500",
  "from-secondary-600 to-primary-500",
];


export function FeaturesSection() {
  return (
    <Section variant="muted" spacing="xl" id="features" className="relative section-divider-top">
      {/* Background mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-40 dark:opacity-20 pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge="Features"
          title="Everything You Need"
          subtitle="Powerful tools to generate, customize, and manage barcodes and QR codes for any use case."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 md:p-7 rounded-2xl bg-white/80 dark:bg-surface-800/40 backdrop-blur-xl border border-surface-200/50 dark:border-surface-700/30 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary-500/[0.05] dark:hover:shadow-primary-500/[0.08] transition-all duration-500 cursor-default flex flex-col overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/[0.02] via-transparent to-secondary-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Gradient top border on hover */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${featureGradients[index % featureGradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`} />

                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${featureGradients[index % featureGradients.length]} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="relative text-base font-bold text-surface-900 dark:text-white mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="relative text-sm text-surface-500 dark:text-surface-400 leading-relaxed flex-1">
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
