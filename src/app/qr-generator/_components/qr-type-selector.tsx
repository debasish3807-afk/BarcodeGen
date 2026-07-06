"use client";

import { motion } from "framer-motion";
import {
  Link as LinkIcon,
  Type,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Wifi,
  Contact,
  MapPin,
  IndianRupee,
  Check,
} from "lucide-react";
import type { QRType } from "../_types";
import { QR_TYPE_CONFIGS } from "../_lib/qr-types";
import { cn } from "@/lib/utils";

interface QRTypeSelectorProps {
  selectedType: QRType;
  onTypeChange: (type: QRType) => void;
}

const iconMap: Record<string, React.ElementType> = {
  link: LinkIcon,
  type: Type,
  mail: Mail,
  phone: Phone,
  messageSquare: MessageSquare,
  messageCircle: MessageCircle,
  wifi: Wifi,
  contact: Contact,
  mapPin: MapPin,
  indianRupee: IndianRupee,
};

const colorMap: Record<string, { bg: string; active: string; icon: string }> = {
  primary: {
    bg: "bg-primary-50 dark:bg-primary-950/50",
    active: "border-primary-500 bg-primary-50 dark:bg-primary-950/40",
    icon: "text-primary-600 dark:text-primary-400",
  },
  secondary: {
    bg: "bg-secondary-50 dark:bg-secondary-950/50",
    active: "border-secondary-500 bg-secondary-50 dark:bg-secondary-950/40",
    icon: "text-secondary-600 dark:text-secondary-400",
  },
  accent: {
    bg: "bg-accent-50 dark:bg-accent-950/50",
    active: "border-accent-500 bg-accent-50 dark:bg-accent-950/40",
    icon: "text-accent-600 dark:text-accent-400",
  },
};

export function QRTypeSelector({ selectedType, onTypeChange }: QRTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
        QR Code Type
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5 gap-2">
        {QR_TYPE_CONFIGS.map((config) => {
          const Icon = iconMap[config.icon] || LinkIcon;
          const colors = colorMap[config.color] || colorMap.primary;
          const isActive = selectedType === config.id;

          return (
            <motion.button
              key={config.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTypeChange(config.id)}
              className={cn(
                "relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 text-center",
                isActive
                  ? cn(colors.active, "shadow-sm")
                  : "border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600"
              )}
              aria-pressed={isActive}
              aria-label={`Select ${config.label} QR type`}
            >
              {isActive && (
                <div className="absolute top-1 right-1">
                  <Check className="h-3 w-3 text-primary-600 dark:text-primary-400" />
                </div>
              )}
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.bg)}>
                <Icon className={cn("h-4 w-4", colors.icon)} />
              </div>
              <span className={cn(
                "text-xs font-semibold",
                isActive ? "text-surface-900 dark:text-white" : "text-surface-600 dark:text-surface-400"
              )}>
                {config.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
