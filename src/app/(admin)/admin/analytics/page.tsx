"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, ScanBarcode, QrCode, Calendar, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

const monthlyData = [
  { month: "Jan", barcodes: 85000, qrcodes: 62000 },
  { month: "Feb", barcodes: 92000, qrcodes: 71000 },
  { month: "Mar", barcodes: 98000, qrcodes: 78000 },
  { month: "Apr", barcodes: 105000, qrcodes: 82000 },
  { month: "May", barcodes: 112000, qrcodes: 89000 },
  { month: "Jun", barcodes: 124000, qrcodes: 95000 },
];

const topFormats = [
  { format: "Code 128", count: 245000, percent: 28 },
  { format: "EAN-13", count: 198000, percent: 23 },
  { format: "QR URL", count: 156000, percent: 18 },
  { format: "UPC-A", count: 134000, percent: 15 },
  { format: "QR WiFi", count: 89000, percent: 10 },
  { format: "Others", count: 52000, percent: 6 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Generations", value: "2.1M", change: "+12%", icon: BarChart3, color: "primary" },
          { label: "Barcodes", value: "1.24M", change: "+8%", icon: ScanBarcode, color: "secondary" },
          { label: "QR Codes", value: "856K", change: "+15%", icon: QrCode, color: "accent" },
          { label: "Growth Rate", value: "23%", change: "+5%", icon: TrendingUp, color: "primary" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card padding="md">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-xs text-green-600 font-medium flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-surface-500">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Chart (Bar representation) */}
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2"><Calendar className="h-4 w-4 text-primary-600" />Monthly Generation</h3>
          <div className="space-y-3">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="text-xs font-medium text-surface-500 w-8">{d.month}</span>
                <div className="flex-1 flex gap-1 h-5">
                  <div className="bg-primary-500 rounded-sm" style={{ width: `${(d.barcodes / 130000) * 100}%` }} title={`Barcodes: ${d.barcodes.toLocaleString()}`} />
                  <div className="bg-accent-500 rounded-sm" style={{ width: `${(d.qrcodes / 130000) * 100}%` }} title={`QR: ${d.qrcodes.toLocaleString()}`} />
                </div>
                <span className="text-xs text-surface-500 w-16 text-right">{((d.barcodes + d.qrcodes) / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 pt-3 border-t border-surface-100 dark:border-surface-800">
            <span className="text-xs text-surface-500 flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary-500" />Barcodes</span>
            <span className="text-xs text-surface-500 flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-accent-500" />QR Codes</span>
          </div>
        </Card>

        {/* Top Formats */}
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2"><BarChart3 className="h-4 w-4 text-accent-600" />Top Formats</h3>
          <div className="space-y-3">
            {topFormats.map((f) => (
              <div key={f.format} className="flex items-center gap-3">
                <span className="text-sm text-surface-700 dark:text-surface-300 w-20 truncate">{f.format}</span>
                <div className="flex-1 h-3 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" style={{ width: `${f.percent}%` }} />
                </div>
                <span className="text-xs font-medium text-surface-500 w-12 text-right">{f.percent}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
