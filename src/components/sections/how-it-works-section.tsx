"use client";

import { motion } from "framer-motion";
import { MousePointer, Edit, Palette, Download } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// How It Works - Animated Timeline
// ======================

const stepIconMap: Record<string, React.ElementType> = {
  mousePointer: MousePointer,
  edit: Edit,
  palette: Palette,
  download: Download,
};

export function HowItWorksSection() {
  return (
    <Section variant="default" spacing="lg">
      <Container>
        <SectionHeader
          badge="How It Works"
          title="Four Simple Steps"
          subtitle="No registration, no software downloads. Start generating barcodes in seconds."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-200 dark:via-surface-700 to-transparent" />

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = stepIconMap[step.icon] || MousePointer;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-center group"
                >
                  {/* Step circle */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-600 text-white shadow-lg shadow-primary-500/20 mb-5 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-shadow duration-300">
                    <Icon className="h-7 w-7" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-surface-900 border-2 border-primary-500 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-600">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
