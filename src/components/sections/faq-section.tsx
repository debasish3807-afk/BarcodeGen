"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ======================
// FAQ - Premium Accordion (i18n)
// ======================

function FAQItem({ question, answer, isOpen, onToggle, index }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}>
      <div className={cn(
        "rounded-xl border transition-all duration-300",
        isOpen
          ? "border-primary-200/60 dark:border-primary-800/40 bg-white dark:bg-surface-800/60 shadow-sm shadow-primary-500/5"
          : "border-surface-200/60 dark:border-surface-700/40 bg-white/60 dark:bg-surface-900/40 hover:border-surface-300 dark:hover:border-surface-600"
      )}>
        <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl" aria-expanded={isOpen}>
          <span className={cn("text-[15px] font-semibold pr-4 transition-colors", isOpen ? "text-primary-700 dark:text-primary-300" : "text-surface-900 dark:text-white")}>{question}</span>
          <div className={cn("flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300", isOpen ? "bg-primary-100 dark:bg-primary-900/50 rotate-180" : "bg-surface-100 dark:bg-surface-800")}>
            <ChevronDown className={cn("h-4 w-4 transition-colors", isOpen ? "text-primary-600 dark:text-primary-400" : "text-surface-400")} />
          </div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <div className="px-5 pb-5">
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ];

  return (
    <Section variant="default" spacing="xl" className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <Container size="md" className="relative">
        <SectionHeader badge={t.faq.badge} title={t.faq.title} subtitle={t.faq.subtitle} />
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} index={index} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/faq">
            <Button variant="outline" className="rounded-full px-6" rightIcon={<ArrowRight className="h-4 w-4" />}>
              {t.faq.viewAll}
            </Button>
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <HelpCircle className="h-4 w-4" />
            {t.faq.stillHaveQuestions}
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
