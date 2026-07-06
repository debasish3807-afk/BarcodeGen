"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ScanBarcode, QrCode, Contact, Package, Truck, Monitor, BookOpen,
  Tag, GraduationCap, Building, Ticket, Utensils, Wifi, MessageCircle,
  Share2, Percent, Heart as HeartPulse, IndianRupee, Search, Warehouse,
} from "lucide-react";
import { TEMPLATES, type Template, type TemplateCategory } from "../_lib/templates-data";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  contact: Contact, package: Package, truck: Truck, monitor: Monitor,
  warehouse: Warehouse, heartPulse: HeartPulse, bookOpen: BookOpen,
  tag: Tag, graduationCap: GraduationCap, building: Building,
  ticket: Ticket, utensils: Utensils, wifi: Wifi, indianRupee: IndianRupee,
  messageCircle: MessageCircle, share2: Share2, percent: Percent,
};

const colorMap: Record<string, { bg: string; icon: string }> = {
  primary: { bg: "bg-primary-50 dark:bg-primary-950/50", icon: "text-primary-600 dark:text-primary-400" },
  secondary: { bg: "bg-secondary-50 dark:bg-secondary-950/50", icon: "text-secondary-600 dark:text-secondary-400" },
  accent: { bg: "bg-accent-50 dark:bg-accent-950/50", icon: "text-accent-600 dark:text-accent-400" },
};

export function TemplatesClient() {
  const [filter, setFilter] = useState<TemplateCategory | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = TEMPLATES.filter((t) => {
    if (filter !== "all" && t.category !== filter) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleUseTemplate = (template: Template) => {
    const configJSON = JSON.stringify(template.config);
    localStorage.setItem("barcodegen_template_load", configJSON);
    const path = template.category === "barcode" ? "/barcode-generator" : "/qr-generator";
    window.open(path, "_self");
  };

  return (
    <Container>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2">
          {([
            { key: "all" as const, label: "All", icon: null },
            { key: "barcode" as const, label: "Barcode", icon: ScanBarcode },
            { key: "qr" as const, label: "QR Code", icon: QrCode },
          ]).map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setFilter(key)} className={cn("flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all border", filter === key ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800")} aria-pressed={filter === key}>
              {Icon && <Icon className="h-4 w-4" />}{label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-surface-400" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="w-full pl-10 pr-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" aria-label="Search templates" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((template, i) => {
          const Icon = iconMap[template.icon] || Tag;
          const colors = colorMap[template.color] || colorMap.primary;
          return (
            <motion.div key={template.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}>
              <Card hover padding="lg" className="h-full flex flex-col cursor-pointer group" onClick={() => handleUseTemplate(template)}>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", colors.bg)}>
                  <Icon className={cn("h-6 w-6", colors.icon)} />
                </div>
                <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-1">{template.name}</h3>
                <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed flex-1">{template.description}</p>
                <div className="mt-3 pt-3 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", template.category === "barcode" ? "bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400" : "bg-accent-50 text-accent-600 dark:bg-accent-950/50 dark:text-accent-400")}>{template.category === "barcode" ? "Barcode" : "QR Code"}</span>
                  <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Use →</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-surface-500 dark:text-surface-400">No templates match your search.</p>
        </div>
      )}
    </Container>
  );
}
