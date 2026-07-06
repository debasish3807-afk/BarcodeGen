"use client";

import { useState } from "react";
import { Settings, Globe, Mail, Shield, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SettingsTab = "general" | "email" | "security" | "appearance";

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("general");

  const tabs = [
    { id: "general" as const, label: "General", icon: Settings },
    { id: "email" as const, label: "Email", icon: Mail },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all", tab === id ? "bg-primary-600 text-white" : "text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800")} aria-pressed={tab === id}>
            <Icon className="h-4 w-4" />{label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {tab === "general" && (
        <Card padding="lg" className="space-y-6">
          <h3 className="text-lg font-bold text-surface-900 dark:text-white flex items-center gap-2"><Globe className="h-5 w-5 text-primary-600" />General Settings</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { label: "Site Name", value: "BarcodeGen", type: "text" },
              { label: "Site URL", value: "https://barcodegen.com", type: "url" },
              { label: "Support Email", value: "support@barcodegen.com", type: "email" },
              { label: "Default Language", value: "en", type: "select" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-medium text-surface-700 dark:text-surface-300 mb-1.5">{field.label}</label>
                <input type={field.type} defaultValue={field.value} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4 border-t border-surface-200 dark:border-surface-800">
            <button className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">Save Changes</button>
          </div>
        </Card>
      )}

      {/* Other tabs - placeholder content */}
      {tab !== "general" && (
        <Card padding="lg">
          <div className="flex items-center gap-3 mb-6">
            {tab === "email" && <Mail className="h-5 w-5 text-primary-600" />}
            {tab === "security" && <Shield className="h-5 w-5 text-primary-600" />}
            {tab === "appearance" && <Palette className="h-5 w-5 text-primary-600" />}
            <h3 className="text-lg font-bold text-surface-900 dark:text-white capitalize">{tab} Settings</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                <div>
                  <p className="text-sm font-medium text-surface-900 dark:text-white">{tab === "email" ? ["SMTP Host", "SMTP Port", "From Email"][i - 1] : tab === "security" ? ["2FA Required", "Session Timeout", "IP Whitelist"][i - 1] : ["Primary Color", "Logo URL", "Favicon"][i - 1]}</p>
                  <p className="text-xs text-surface-500 mt-0.5">Configure {tab} setting {i}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg text-xs font-medium border border-surface-200 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">Edit</button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
