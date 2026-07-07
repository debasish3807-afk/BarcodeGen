"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FAQS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ======================
// FAQ - Premium Accordion with Gradient Active States
// ======================

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      "rounded-2xl border transition-all duration-300",
      isOpen
        ? "border-primary-200/60 dark:border-primary-800/40 bg-gradient-to-r from-primary-50/50 via-secondary-50/30 to-accent-50/20 dark:from-primary-950/30 dark:via-secondary-950/20 dark:to-accent-950/10 shadow-sm shadow-primary-500/5"
        : "border-surface-200/70 dark:border-surface-700/50 bg-white dark:bg-surface-900/60 hover:border-surface-300 dark:hover:border-surface-600"
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-semibold text-surface-900 dark:text-white pr-4">
          {question}
        </span>
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-gradient-to-br from-primary-500 to-secondary-500 rotate-180" : "bg-surface-100 dark:bg-surface-800"
        )}>
          <ChevronDown className={cn("h-4 w-4 transition-colors", isOpen ? "text-white" : "text-surface-400")} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = FAQS.slice(0, 5);

  return (
    <Section variant="muted" spacing="lg">
      <Container size="md">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions about BarcodeGen."
        />

        <div className="space-y-3">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/faq">
            <Button variant="outline" className="rounded-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All FAQs
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
