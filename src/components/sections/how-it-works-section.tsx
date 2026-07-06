"use client";

import { motion } from "framer-motion";
import { MousePointer, Edit, Palette, Download } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// How It Works Section
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
          title="Generate Barcodes in 4 Easy Steps"
          subtitle="No registration, no software downloads. Start generating barcodes in seconds."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = stepIconMap[step.icon] || MousePointer;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Connector Line */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-surface-200 dark:border-surface-700" />
                )}

                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/20 mb-5">
                  <Icon className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-white dark:bg-surface-900 border-2 border-primary-500 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
