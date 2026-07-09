"use client";

import { motion } from "framer-motion";
import {
  Link as LinkIcon,
  Type,
  Wifi,
  Contact,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { QR_TYPES } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";

// ======================
// QR Types Section - Premium Interactive Cards
// ======================

const qrIconMap: Record<string, React.ElementType> = {
  link: LinkIcon,
  type: Type,
  wifi: Wifi,
  contact: Contact,
  mail: Mail,
  phone: Phone,
  messageSquare: MessageSquare,
  mapPin: MapPin,
  calendar: Calendar,
  smartphone: Smartphone,
};

const qrGradients = [
  "from-primary-500 to-primary-600",
  "from-secondary-500 to-secondary-600",
  "from-accent-500 to-accent-600",
  "from-primary-600 to-secondary-500",
  "from-secondary-500 to-accent-500",
  "from-accent-500 to-primary-500",
  "from-primary-500 to-accent-600",
  "from-secondary-600 to-primary-500",
  "from-accent-600 to-secondary-500",
  "from-primary-500 to-secondary-600",
];


export function QRTypesSection() {
  return (
    <Section variant="default" spacing="xl" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Container size="xl" className="relative">
        <SectionHeader
          badge="QR Code Types"
          title="Create Any QR Code"
          subtitle="Generate QR codes for URLs, WiFi, contacts, emails, and much more."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {QR_TYPES.map((qrType, index) => {
            const Icon = qrIconMap[qrType.icon || "link"] || LinkIcon;
            return (
              <motion.div
                key={qrType.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <Link
                  href="/qr-generator"
                  className="group block h-full p-5 rounded-xl bg-white dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/30 hover:border-accent-200 dark:hover:border-accent-800/50 hover:shadow-lg hover:shadow-accent-500/[0.06] hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div className={`w-11 h-11 mx-auto rounded-xl bg-gradient-to-br ${qrGradients[index % qrGradients.length]} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                    {qrType.name}
                  </h3>
                  <p className="text-[11px] text-surface-500 dark:text-surface-400 mt-1 leading-relaxed">
                    {qrType.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/qr-generator"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors group"
          >
            Create your QR code now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
