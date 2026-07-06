"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap } from "lucide-react";
import { PLANS } from "@/lib/billing/plans";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingClient() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <Container>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button onClick={() => setBilling("monthly")} className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all", billing === "monthly" ? "bg-primary-600 text-white" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")}>Monthly</button>
        <button onClick={() => setBilling("yearly")} className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5", billing === "yearly" ? "bg-primary-600 text-white" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")}>
          Yearly <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-1.5 py-0.5 rounded-full font-bold">Save 17%</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {PLANS.map((plan, i) => (
          <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
            <Card padding="lg" className={cn("h-full flex flex-col relative", plan.popular && "border-2 border-primary-500 shadow-lg shadow-primary-500/10")}>
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full whitespace-nowrap flex items-center gap-1">
                  {plan.popular ? <Sparkles className="h-3 w-3" /> : <Zap className="h-3 w-3" />}{plan.badge}
                </span>
              )}
              <h3 className="text-lg font-bold text-surface-900 dark:text-white">{plan.name}</h3>
              <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{plan.description}</p>
              <div className="mt-4 mb-5">
                <span className="text-3xl font-bold text-surface-900 dark:text-white">${billing === "monthly" ? plan.price.monthly : Math.round(plan.price.yearly / 12)}</span>
                {plan.price.monthly > 0 && <span className="text-sm text-surface-500">/mo</span>}
                {billing === "yearly" && plan.price.yearly > 0 && (
                  <p className="text-xs text-surface-500 mt-1">${plan.price.yearly}/year</p>
                )}
              </div>
              <button className={cn("w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all mb-5", plan.popular ? "bg-primary-600 text-white hover:bg-primary-700" : "border-2 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800")}>
                {plan.price.monthly === 0 ? "Get Started Free" : plan.id === "enterprise" ? "Contact Sales" : "Subscribe"}
              </button>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-surface-600 dark:text-surface-400">
                    <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
