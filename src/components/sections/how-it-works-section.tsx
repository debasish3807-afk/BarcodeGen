"use client";

import { motion } from "framer-motion";
import { MousePointer, Edit, Palette, Download } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// How It Works - Premium Timeline with Connected Steps
// ======================

const stepIconMap: Record<string, React.ElementType> = {
  mousePointer: MousePointer,
  edit: Edit,
  palette: Palette,
  download: Download,
};

const stepGradients = [
  "from-primary-500 to-primary-600",
  "from-secondary-500 to-secondary-600",
  "from-accent-500 to-accent-600",
  "from-primary-600 to-secondary-500",
];

export function HowItWorksSection() {
  return (
    <Section variant="muted" spacing="xl" className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-50 to-white dark:from-surface-900 dark:to-surface-950 pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge="How It Works"
          title="Four Simple Steps"
          subtitle="No registration, no software downloads. Start generating barcodes in seconds."
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[72px] left-[12%] right-[12%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-primary-300/40 via-secondary-300/40 to-accent-300/40 dark:from-primary-700/40 dark:via-secondary-700/40 dark:to-accent-700/40 rounded-full" />
            {/* Animated pulse on the line */}
            <motion.div
              animate={{ x: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-primary-500/60 to-transparent rounded-full"
            />
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
                  {/* Step icon with ring */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Outer ring */}
                    <div className="absolute inset-0 w-[72px] h-[72px] rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 group-hover:border-primary-300 dark:group-hover:border-primary-700 transition-colors duration-500 mx-auto" style={{ margin: "auto" }} />
                    {/* Inner icon */}
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${stepGradients[index % stepGradients.length]} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {/* Step number */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-surface-900 border-2 border-primary-500 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-600 dark:text-primary-400 shadow-sm">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-[200px] mx-auto">
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
