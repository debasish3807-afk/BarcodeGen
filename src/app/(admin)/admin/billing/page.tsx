"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, CreditCard, Receipt, TrendingUp, Gift, RefreshCw, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DEMO_COUPONS } from "@/lib/billing/coupons";
import { cn } from "@/lib/utils";

type BillingTab = "overview" | "transactions" | "coupons" | "plans" | "tax";

export default function AdminBillingPage() {
  const [tab, setTab] = useState<BillingTab>("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "transactions" as const, label: "Transactions" },
    { id: "coupons" as const, label: "Coupons" },
    { id: "plans" as const, label: "Plans" },
    { id: "tax" as const, label: "Tax Settings" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map(({ id, label }) => (
          <button key={id} onClick={() => setTab(id)} className={cn("px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all", tab === id ? "bg-primary-600 text-white" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")}>{label}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Revenue", value: "$45,280", change: "+22%", icon: DollarSign },
              { label: "Active Subs", value: "234", change: "+12%", icon: CreditCard },
              { label: "MRR", value: "$8,920", change: "+8%", icon: TrendingUp },
              { label: "Invoices", value: "1,892", change: "+15%", icon: Receipt },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card padding="md">
                    <div className="flex items-center justify-between mb-2"><Icon className="h-5 w-5 text-primary-600" /><span className="text-xs text-green-600 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{s.change}</span></div>
                    <p className="text-2xl font-bold text-surface-900 dark:text-white">{s.value}</p>
                    <p className="text-xs text-surface-500">{s.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "coupons" && (
        <Card padding="lg">
          <div className="flex justify-between mb-4"><h3 className="text-sm font-bold text-surface-900 dark:text-white flex items-center gap-2"><Gift className="h-4 w-4 text-accent-600" />Active Coupons</h3><button className="px-3 py-1.5 bg-primary-600 text-white text-xs font-semibold rounded-lg">+ Add Coupon</button></div>
          <div className="space-y-3">
            {DEMO_COUPONS.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                <div><p className="font-mono font-bold text-sm text-surface-900 dark:text-white">{c.code}</p><p className="text-xs text-surface-500 mt-0.5">{c.type === "percentage" ? `${c.value}% off` : c.type === "fixed" ? `$${c.value} off` : `${c.value} days trial`}</p></div>
                <div className="text-right"><p className="text-xs text-surface-500">{c.usedCount}/{c.maxUses} uses</p>{c.expiresAt && <p className="text-xs text-surface-400 mt-0.5">Expires: {c.expiresAt}</p>}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {(tab === "transactions" || tab === "plans" || tab === "tax") && (
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white capitalize flex items-center gap-2 mb-4"><RefreshCw className="h-4 w-4 text-primary-600" />{tab.replace(/([A-Z])/g, " $1")}</h3>
          <p className="text-sm text-surface-500">Admin {tab} management panel. Configure and monitor all billing operations here.</p>
        </Card>
      )}
    </div>
  );
}
