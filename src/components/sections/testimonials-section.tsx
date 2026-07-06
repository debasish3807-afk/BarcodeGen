"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

// ======================
// Testimonials Section
// ======================

export function TestimonialsSection() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <SectionHeader
          badge="Testimonials"
          title="Loved by Thousands"
          subtitle="See what our users have to say about BarcodeGen."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card padding="lg" className="h-full flex flex-col">
                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-yellow-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative flex-1 mb-4">
                  <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary-100 dark:text-primary-900" aria-hidden="true" />
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed relative z-10 pl-3">
                    {testimonial.content}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-surface-100 dark:border-surface-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
