"use client";

import { motion } from "framer-motion";
import { Users, ScanBarcode, QrCode, DollarSign, TrendingUp, Layers, Mail, Globe, Activity, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Users", value: "12,547", change: "+12%", icon: Users, color: "primary" },
  { label: "Barcodes Generated", value: "1.24M", change: "+8%", icon: ScanBarcode, color: "secondary" },
  { label: "QR Codes Generated", value: "856K", change: "+15%", icon: QrCode, color: "accent" },
  { label: "Revenue", value: "$45,280", change: "+22%", icon: DollarSign, color: "primary" },
  { label: "API Requests", value: "4.5M", change: "+31%", icon: Activity, color: "secondary" },
  { label: "Batch Jobs", value: "3,421", change: "+5%", icon: Layers, color: "accent" },
  { label: "Newsletter Subs", value: "8,934", change: "+9%", icon: Mail, color: "primary" },
  { label: "Blog Views", value: "125K", change: "+18%", icon: Globe, color: "secondary" },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  primary: { bg: "bg-primary-50 dark:bg-primary-950/50", icon: "text-primary-600 dark:text-primary-400" },
  secondary: { bg: "bg-secondary-50 dark:bg-secondary-950/50", icon: "text-secondary-600 dark:text-secondary-400" },
  accent: { bg: "bg-accent-50 dark:bg-accent-950/50", icon: "text-accent-600 dark:text-accent-400" },
};

const recentActivity = [
  { id: 1, action: "User registered", detail: "john@example.com", time: "2 min ago" },
  { id: 2, action: "Batch job completed", detail: "500 barcodes generated", time: "5 min ago" },
  { id: 3, action: "Blog published", detail: "QR Codes in Healthcare", time: "1 hour ago" },
  { id: 4, action: "Payment received", detail: "$99.00 - Pro Plan", time: "2 hours ago" },
  { id: 5, action: "API key created", detail: "Integration - Shopify", time: "3 hours ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const colors = colorMap[stat.color];
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
              <Card padding="md" className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-surface-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{stat.change} this month</p>
                </div>
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.bg)}>
                  <Icon className={cn("h-5 w-5", colors.icon)} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary-600" />Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
                <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{item.action}</p>
                  <p className="text-xs text-surface-500 truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-surface-400 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* System Status */}
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2"><Activity className="h-4 w-4 text-green-600" />System Status</h3>
          <div className="space-y-4">
            {[
              { label: "Server Uptime", value: "99.98%", status: "healthy" },
              { label: "Database", value: "Connected", status: "healthy" },
              { label: "Redis Cache", value: "94.2% hit rate", status: "healthy" },
              { label: "API Response", value: "45ms avg", status: "healthy" },
              { label: "Storage", value: "23.4 GB / 100 GB", status: "healthy" },
              { label: "CDN", value: "Active", status: "healthy" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-surface-50 dark:bg-surface-800">
                <span className="text-sm text-surface-700 dark:text-surface-300">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-surface-900 dark:text-white">{item.value}</span>
                  <div className={cn("w-2 h-2 rounded-full", item.status === "healthy" ? "bg-green-500" : "bg-red-500")} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
