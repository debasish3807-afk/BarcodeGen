"use client";

import { motion } from "framer-motion";
import { MousePointer, Edit, Palette, Download } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// How It Works - Animated Timeline with Step Cards
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

        <div className="relative max-w-5xl mx-auto">
          {/* Gradient connecting line */}
          <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-primary-500/40 via-secondary-500/40 to-accent-500/40 rounded-full" />
          </div>

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
                  {/* Step circle with gradient */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20 mb-5 group-hover:shadow-xl group-hover:shadow-primary-500/30 group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-7 w-7" />
                    {/* Numbered badge */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-surface-900 border-2 border-primary-500 rounded-full flex items-center justify-center text-xs font-bold text-primary-600 shadow-sm">
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
