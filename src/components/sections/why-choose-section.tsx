"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Infinity, Globe, Cpu, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";


// ======================
// Why Choose BarcodeGen Section - Premium v5.0
// ======================

const REASON_ICONS = [Shield, Clock, Infinity, Globe, Cpu, Lock];
const REASON_GRADIENTS = [
  "from-primary-500 to-primary-600",
  "from-secondary-500 to-secondary-600",
  "from-accent-500 to-accent-600",
  "from-primary-600 to-secondary-500",
  "from-secondary-500 to-accent-500",
  "from-accent-500 to-primary-500",
];

const REASON_HOVER_BORDERS = [
  "hover:border-primary-200/70 dark:hover:border-primary-800/50",
  "hover:border-secondary-200/70 dark:hover:border-secondary-800/50",
  "hover:border-accent-200/70 dark:hover:border-accent-800/50",
  "hover:border-primary-200/70 dark:hover:border-primary-800/50",
  "hover:border-secondary-200/70 dark:hover:border-secondary-800/50",
  "hover:border-accent-200/70 dark:hover:border-accent-800/50",
];

export function WhyChooseSection() {
  const { t } = useTranslation();

  const reasons = [
    { title: t.whyChoose.reason1Title, desc: t.whyChoose.reason1Desc },
    { title: t.whyChoose.reason2Title, desc: t.whyChoose.reason2Desc },
    { title: t.whyChoose.reason3Title, desc: t.whyChoose.reason3Desc },
    { title: t.whyChoose.reason4Title, desc: t.whyChoose.reason4Desc },
    { title: t.whyChoose.reason5Title, desc: t.whyChoose.reason5Desc },
    { title: t.whyChoose.reason6Title, desc: t.whyChoose.reason6Desc },
  ];

  return (
    <Section variant="default" spacing="xl" className="relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -left-40 w-[400px] h-[400px] bg-secondary-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-600 bg-primary-50/80 dark:bg-primary-950/40 dark:text-primary-400 rounded-2xl border border-primary-200/60 dark:border-primary-800/40">
                {t.whyChoose.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white text-balance leading-[1.1]">
                {t.whyChoose.title}{" "}
                <span className="gradient-text-shimmer">{t.whyChoose.titleHighlight}</span>
              </h2>
              <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 leading-relaxed max-w-lg">
                {t.whyChoose.subtitle}
              </p>
              <div className="mt-8">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
                >
                  {t.whyChoose.exploreFeatures}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>


          {/* Right: Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => {
              const Icon = REASON_ICONS[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`group p-5 rounded-2xl bg-white dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/30 ${REASON_HOVER_BORDERS[index]} hover:shadow-xl hover:shadow-primary-500/[0.05] hover:-translate-y-1.5 transition-all duration-500`}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${REASON_GRADIENTS[index]} flex items-center justify-center mb-3.5 shadow-sm group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                    <Icon className="h-4.5 w-4.5 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-1.5 tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
                    {reason.desc}
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
