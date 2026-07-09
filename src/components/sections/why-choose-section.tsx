"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Infinity, Globe, Cpu, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// Why Choose BarcodeGen Section (i18n)
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
      <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-primary-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 -left-40 w-[400px] h-[400px] bg-secondary-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <Container size="xl" className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50/80 dark:bg-primary-950/40 dark:text-primary-400 rounded-full border border-primary-200/60 dark:border-primary-800/40">
                {t.whyChoose.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white text-balance leading-[1.1]">
                {t.whyChoose.title}{" "}
                <span className="gradient-text-vibrant">{t.whyChoose.titleHighlight}</span>
              </h2>
              <p className="mt-5 text-lg text-surface-500 dark:text-surface-400 leading-relaxed max-w-lg">
                {t.whyChoose.subtitle}
              </p>
              <div className="mt-8">
                <Link href="/features" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group">
                  {t.whyChoose.exploreFeatures}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, index) => {
              const Icon = REASON_ICONS[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-5 rounded-xl bg-white dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/30 hover:border-primary-200/60 dark:hover:border-primary-800/40 hover:shadow-lg hover:shadow-primary-500/[0.04] transition-all duration-300"
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${REASON_GRADIENTS[index]} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-1.5">{reason.title}</h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">{reason.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
