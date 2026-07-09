"use client";

import { motion } from "framer-motion";
import { MousePointer, Edit, Palette, Download } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";


// ======================
// How It Works - Premium Timeline v5.0
// ======================

const STEP_ICONS = [MousePointer, Edit, Palette, Download];
const stepGradients = [
  "from-primary-500 to-primary-600",
  "from-secondary-500 to-secondary-600",
  "from-accent-500 to-accent-600",
  "from-primary-600 to-secondary-500",
];

export function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    { title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
    { title: t.howItWorks.step4Title, desc: t.howItWorks.step4Desc },
  ];

  return (
    <Section variant="muted" spacing="xl" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-50 to-white dark:from-surface-900 dark:to-surface-950 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-300/50 dark:via-surface-700/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge={t.howItWorks.badge}
          title={t.howItWorks.title}
          subtitle={t.howItWorks.subtitle}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Connector line - desktop */}
          <div className="hidden md:block absolute top-[76px] left-[12%] right-[12%] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-primary-200/60 via-secondary-200/60 to-accent-200/60 dark:from-primary-800/40 dark:via-secondary-800/40 dark:to-accent-800/40 rounded-full" />
            <motion.div
              animate={{ x: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-primary-500/70 to-transparent rounded-full"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-center group"
                >
                  {/* Step number + icon container */}
                  <div className="relative inline-flex items-center justify-center mb-7">
                    {/* Dashed border */}
                    <div className="absolute w-[76px] h-[76px] rounded-2xl border-2 border-dashed border-surface-200 dark:border-surface-700 group-hover:border-primary-300 dark:group-hover:border-primary-700 transition-colors duration-500" />
                    {/* Icon */}
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${stepGradients[index]} flex items-center justify-center text-white shadow-lg shadow-primary-500/10 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary-500/20 transition-all duration-500`}>
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    {/* Step number */}
                    <span className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-white dark:bg-surface-900 border-2 border-primary-500 rounded-xl flex items-center justify-center text-[11px] font-bold text-primary-600 dark:text-primary-400 shadow-sm group-hover:bg-primary-50 dark:group-hover:bg-primary-950/50 transition-colors duration-300">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed max-w-[200px] mx-auto">
                    {step.desc}
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
