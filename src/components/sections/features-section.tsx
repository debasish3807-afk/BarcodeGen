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

const gradients = [
  "from-primary-500/10 to-primary-600/5",
  "from-accent-500/10 to-accent-600/5",
  "from-secondary-500/10 to-secondary-600/5",
  "from-primary-500/10 to-accent-500/5",
  "from-accent-500/10 to-primary-500/5",
  "from-secondary-500/10 to-primary-500/5",
  "from-primary-600/10 to-secondary-500/5",
  "from-accent-600/10 to-secondary-500/5",
];

const iconColors = [
  "text-primary-600 dark:text-primary-400",
  "text-accent-600 dark:text-accent-400",
  "text-secondary-600 dark:text-secondary-400",
  "text-primary-500 dark:text-primary-400",
  "text-accent-500 dark:text-accent-400",
  "text-secondary-500 dark:text-secondary-400",
  "text-primary-600 dark:text-primary-300",
  "text-accent-600 dark:text-accent-300",
];

export function FeaturesSection() {
  return (
    <Section variant="muted" spacing="lg" id="features">
      <Container>
        <SectionHeader
          badge="Features"
          title="Everything You Need"
          subtitle="Powerful tools to generate, customize, and manage barcodes and QR codes for any use case."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-6 rounded-2xl bg-white dark:bg-surface-900/80 border border-surface-200/70 dark:border-surface-700/50 hover-lift cursor-default"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${iconColors[index % iconColors.length]}`} />
                </div>
                <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
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
