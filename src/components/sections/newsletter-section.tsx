"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

// ======================
// Newsletter Section - Premium CTA with gradient
// ======================

export function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail("");
    }
  };

  return (
    <Section variant="muted" spacing="lg">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900 dark:from-surface-800 dark:via-surface-900 dark:to-surface-800 p-8 sm:p-12 md:p-16"
        >
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-accent-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          <div className="relative z-10 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/20 mb-6"
            >
              <Mail className="h-6 w-6 text-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              {t.footer.newsletter}
            </h2>
            <p className="text-surface-300 text-base md:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.emailPlaceholder}
                  required
                  className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 text-sm backdrop-blur-sm transition-all"
                  aria-label={t.footer.emailPlaceholder}
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold hover:from-primary-400 hover:to-secondary-400 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 active:scale-[0.97] transition-all duration-200 disabled:opacity-70"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    {t.footer.subscribe}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social proof */}
            <p className="mt-6 text-xs text-surface-400 flex items-center justify-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Join 10,000+ developers. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
