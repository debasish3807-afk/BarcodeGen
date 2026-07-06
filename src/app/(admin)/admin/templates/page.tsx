"use client";

import { ScanBarcode, QrCode, Plus, Edit3, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TEMPLATES = [
  { id: "1", name: "Product Label", type: "barcode", format: "EAN-13", usage: 2345, public: true },
  { id: "2", name: "WiFi QR", type: "qr", format: "WiFi", usage: 1892, public: true },
  { id: "3", name: "Shipping Label", type: "barcode", format: "Code 128", usage: 1456, public: true },
  { id: "4", name: "Event Ticket", type: "qr", format: "URL", usage: 987, public: true },
  { id: "5", name: "Asset Tag", type: "barcode", format: "Code 39", usage: 654, public: false },
];

export default function TemplatesManagerPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-surface-500">{TEMPLATES.length} templates</p>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" />Add Template</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => (
          <Card key={t.id} padding="md" hover>
            <div className="flex items-start justify-between mb-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", t.type === "barcode" ? "bg-primary-50 dark:bg-primary-950/50" : "bg-accent-50 dark:bg-accent-950/50")}>
                {t.type === "barcode" ? <ScanBarcode className="h-5 w-5 text-primary-600" /> : <QrCode className="h-5 w-5 text-accent-600" />}
              </div>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", t.public ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400" : "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400")}>{t.public ? "Public" : "Private"}</span>
            </div>
            <h4 className="text-sm font-bold text-surface-900 dark:text-white">{t.name}</h4>
            <p className="text-xs text-surface-500 mt-1">{t.format} • {t.usage.toLocaleString()} uses</p>
            <div className="flex gap-1 mt-3 pt-3 border-t border-surface-100 dark:border-surface-800">
              <button className="flex-1 px-2 py-1.5 text-xs font-medium rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors flex items-center justify-center gap-1"><Edit3 className="h-3 w-3" />Edit</button>
              <button className="px-2 py-1.5 text-xs font-medium rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"><Trash2 className="h-3 w-3 text-red-500" /></button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
