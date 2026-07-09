"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { TESTIMONIALS } from "@/constants/content";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";


// ======================
// Testimonial Card
// ======================

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  return (
    <div className="group relative flex-shrink-0 w-[320px] md:w-[360px] p-6 rounded-3xl bg-white dark:bg-surface-900/60 border border-surface-200/60 dark:border-surface-700/40 hover:border-primary-200/60 dark:hover:border-primary-800/40 hover:shadow-xl hover:shadow-primary-500/[0.05] hover:-translate-y-1 transition-all duration-400">
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mb-5">
        <Quote className="absolute -top-1 -left-1 h-5 w-5 text-primary-200/80 dark:text-primary-900/60" aria-hidden="true" />
        <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed pl-5 line-clamp-4">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-sm">
          <span className="text-white text-xs font-bold">{testimonial.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold text-surface-900 dark:text-white truncate">{testimonial.name}</p>
            <BadgeCheck className="h-3.5 w-3.5 text-primary-500 flex-shrink-0" />
          </div>
          <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
            {testimonial.role} — {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}


// ======================
// Testimonials Section - Premium Marquee v5.0
// ======================

export function TestimonialsSection() {
  const { t } = useTranslation();

  // Split testimonials into two rows for marquee
  const midpoint = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = TESTIMONIALS.slice(0, midpoint);
  const row2 = TESTIMONIALS.slice(midpoint);

  return (
    <Section variant="default" spacing="xl" className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge={t.testimonials.badge}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />
      </Container>

      {/* Marquee Row 1 */}
      <div className="relative mt-8 overflow-hidden fade-edges-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex gap-5 animate-marquee hover:[animation-play-state:paused]"
        >
          {[...row1, ...row1, ...row1].map((testimonial, index) => (
            <TestimonialCard key={`row1-${index}`} testimonial={testimonial} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 - Reverse */}
      <div className="relative mt-5 overflow-hidden fade-edges-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-5 animate-marquee-reverse hover:[animation-play-state:paused]"
        >
          {[...row2, ...row2, ...row2].map((testimonial, index) => (
            <TestimonialCard key={`row2-${index}`} testimonial={testimonial} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Overall Rating */}
      <Container size="xl" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl bg-white dark:bg-surface-800/60 border border-surface-200/60 dark:border-surface-700/40 shadow-depth">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4.5 w-4.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="w-px h-5 bg-surface-200 dark:bg-surface-700" />
            <span className="text-sm font-bold text-surface-700 dark:text-surface-300">
              {t.testimonials.overallRating}
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
