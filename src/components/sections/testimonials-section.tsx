"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { TESTIMONIALS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// Testimonials - Premium Glass Cards with Gradient Borders
// ======================

export function TestimonialsSection() {
  return (
    <Section variant="default" spacing="xl" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge="Testimonials"
          title="Loved by Thousands"
          subtitle="See what developers and businesses say about BarcodeGen."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 rounded-2xl bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/40 hover:border-primary-200/60 dark:hover:border-primary-800/40 hover:shadow-lg hover:shadow-primary-500/[0.04] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-5">
                <Quote className="absolute -top-1 -left-1 h-4 w-4 text-primary-200 dark:text-primary-900/60" aria-hidden="true" />
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed pl-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>


              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">
                      {testimonial.name}
                    </p>
                    <BadgeCheck className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white dark:bg-surface-800/60 border border-surface-200/60 dark:border-surface-700/40 shadow-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-surface-700 dark:text-surface-300">
              4.9/5 average from 2,000+ reviews
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
