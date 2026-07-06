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
} from "lucide-react";
import { QR_TYPES } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

// ======================
// QR Types Section
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

export function QRTypesSection() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <SectionHeader
          badge="QR Code Types"
          title="Create Any QR Code"
          subtitle="Generate QR codes for URLs, WiFi, contacts, emails, and much more."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {QR_TYPES.map((qrType, index) => {
            const Icon = qrIconMap[qrType.icon || "link"] || LinkIcon;
            return (
              <motion.div
                key={qrType.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  hover
                  padding="md"
                  className="h-full text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-accent-50 dark:bg-accent-950/50 flex items-center justify-center mb-3 group-hover:bg-accent-100 dark:group-hover:bg-accent-900/50 transition-colors">
                    <Icon className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                    {qrType.name}
                  </h3>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                    {qrType.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
