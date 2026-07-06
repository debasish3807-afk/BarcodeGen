"use client";

import { useState } from "react";
import { Key, BarChart3, Terminal, Package, Activity, Shield, Copy, Check, RefreshCw, Eye, EyeOff, Trash2, Plus } from "lucide-react";
import { SDK_LANGUAGES } from "@/lib/billing/sdk-data";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DevTab = "keys" | "usage" | "playground" | "sdks" | "logs" | "webhooks";

const DEMO_KEYS = [
  { id: "1", name: "Production", key: "bg_live_sk_1234567890abcdef", created: "2025-01-15", lastUsed: "2 min ago", requests: 45230, status: "active" },
  { id: "2", name: "Development", key: "bg_test_sk_0987654321fedcba", created: "2025-01-20", lastUsed: "1 hour ago", requests: 1250, status: "active" },
];

export function DeveloperClient() {
  const [tab, setTab] = useState<DevTab>("keys");
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedSDK, setSelectedSDK] = useState("javascript");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const tabs: { id: DevTab; label: string; icon: React.ElementType }[] = [
    { id: "keys", label: "API Keys", icon: Key },
    { id: "usage", label: "Usage", icon: BarChart3 },
    { id: "playground", label: "Playground", icon: Terminal },
    { id: "sdks", label: "SDKs", icon: Package },
    { id: "logs", label: "Logs", icon: Activity },
    { id: "webhooks", label: "Webhooks", icon: Shield },
  ];

  return (
    <Container>
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-6 border-b border-surface-200 dark:border-surface-800">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} className={cn("flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-px", tab === id ? "border-primary-600 text-primary-600 dark:text-primary-400" : "border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-700")}>
            <Icon className="h-4 w-4" />{label}
          </button>
        ))}
      </div>


      {/* API Keys Tab */}
      {tab === "keys" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-surface-500">Manage your API keys for authentication.</p>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" />Generate Key</button>
          </div>
          {DEMO_KEYS.map((apiKey) => (
            <Card key={apiKey.id} padding="md">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm font-bold text-surface-900 dark:text-white">{apiKey.name}</h4>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 text-xs font-medium rounded-full">{apiKey.status}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-xs font-mono bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded-lg text-surface-700 dark:text-surface-300">
                      {showKeys[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 12) + "•".repeat(20)}
                    </code>
                    <button onClick={() => setShowKeys((p) => ({ ...p, [apiKey.id]: !p[apiKey.id] }))} className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-800" aria-label="Toggle visibility">
                      {showKeys[apiKey.id] ? <EyeOff className="h-3.5 w-3.5 text-surface-400" /> : <Eye className="h-3.5 w-3.5 text-surface-400" />}
                    </button>
                    <button onClick={() => handleCopy(apiKey.key, apiKey.id)} className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-800" aria-label="Copy key">
                      {copied === apiKey.id ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-surface-400" />}
                    </button>
                  </div>
                  <div className="flex gap-4 text-xs text-surface-500">
                    <span>Created: {apiKey.created}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                    <span>Requests: {apiKey.requests.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800" aria-label="Regenerate"><RefreshCw className="h-4 w-4 text-surface-500" /></button>
                  <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30" aria-label="Revoke"><Trash2 className="h-4 w-4 text-red-500" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}


      {/* API Keys Tab */}
      {tab === "keys" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-surface-500">Manage your API keys.</p>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"><Plus className="h-4 w-4" />Generate Key</button>
          </div>
          {DEMO_KEYS.map((apiKey) => (
            <Card key={apiKey.id} padding="md">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2"><h4 className="text-sm font-bold text-surface-900 dark:text-white">{apiKey.name}</h4><span className="px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 text-xs font-medium rounded-full">{apiKey.status}</span></div>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-xs font-mono bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded-lg">{showKeys[apiKey.id] ? apiKey.key : apiKey.key.substring(0, 12) + "••••••••••"}</code>
                    <button onClick={() => setShowKeys((p) => ({ ...p, [apiKey.id]: !p[apiKey.id] }))} className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-800">{showKeys[apiKey.id] ? <EyeOff className="h-3.5 w-3.5 text-surface-400" /> : <Eye className="h-3.5 w-3.5 text-surface-400" />}</button>
                    <button onClick={() => handleCopy(apiKey.key, apiKey.id)} className="p-1 rounded hover:bg-surface-100 dark:hover:bg-surface-800">{copied === apiKey.id ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-surface-400" />}</button>
                  </div>
                  <div className="flex gap-4 text-xs text-surface-500"><span>Created: {apiKey.created}</span><span>Requests: {apiKey.requests.toLocaleString()}</span></div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"><RefreshCw className="h-4 w-4 text-surface-500" /></button>
                  <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 className="h-4 w-4 text-red-500" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Usage Tab */}
      {tab === "usage" && (
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4">API Usage This Month</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[{ label: "Total Requests", value: "46,480", limit: "100,000" }, { label: "Barcodes", value: "28,230", limit: "50,000" }, { label: "QR Codes", value: "18,250", limit: "50,000" }].map((s) => (
              <div key={s.label} className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800 text-center">
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-surface-500">of {s.limit}</p>
                <p className="text-xs font-medium text-surface-700 dark:text-surface-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
            <div className="h-full w-[46%] bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
          </div>
          <p className="text-xs text-surface-500 mt-2">46% of monthly quota used. Resets in 15 days.</p>
        </Card>
      )}

      {/* Playground Tab */}
      {tab === "playground" && (
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2"><Terminal className="h-4 w-4 text-primary-600" />API Playground</h3>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-2">Request</label>
              <pre className="p-4 bg-surface-900 dark:bg-surface-950 text-green-400 text-xs font-mono rounded-xl overflow-x-auto whitespace-pre-wrap">{`POST /v1/barcodes\nContent-Type: application/json\nAuthorization: Bearer bg_live_sk_...\n\n{\n  "value": "5901234123457",\n  "format": "EAN13",\n  "options": { "width": 2, "height": 100 }\n}`}</pre>
              <button className="mt-3 w-full px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors">Send Request</button>
            </div>
            <div>
              <label className="text-xs font-medium text-surface-700 dark:text-surface-300 block mb-2">Response</label>
              <pre className="p-4 bg-surface-900 dark:bg-surface-950 text-blue-400 text-xs font-mono rounded-xl overflow-x-auto whitespace-pre-wrap">{`{\n  "success": true,\n  "data": {\n    "id": "bc_abc123",\n    "value": "5901234123457",\n    "format": "EAN13",\n    "imageUrl": "https://api.barcodegen.com/...",\n    "createdAt": "2025-01-20T10:30:00Z"\n  }\n}`}</pre>
            </div>
          </div>
        </Card>
      )}


      {/* SDKs Tab */}
      {tab === "sdks" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {SDK_LANGUAGES.map((sdk) => (
              <button key={sdk.id} onClick={() => setSelectedSDK(sdk.id)} className={cn("px-3 py-2 rounded-xl text-xs font-semibold transition-all border", selectedSDK === sdk.id ? "border-primary-500 bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300" : "border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-50")}>{sdk.name}</button>
            ))}
          </div>
          {SDK_LANGUAGES.filter((s) => s.id === selectedSDK).map((sdk) => (
            <Card key={sdk.id} padding="lg">
              <h4 className="text-sm font-bold text-surface-900 dark:text-white mb-3">{sdk.name} SDK</h4>
              <div className="mb-4">
                <label className="text-xs font-medium text-surface-500 block mb-1.5">Installation</label>
                <pre className="p-3 bg-surface-100 dark:bg-surface-800 text-xs font-mono rounded-lg overflow-x-auto">{sdk.installCommand}</pre>
              </div>
              <div>
                <label className="text-xs font-medium text-surface-500 block mb-1.5">Example</label>
                <pre className="p-4 bg-surface-900 text-green-400 text-xs font-mono rounded-xl overflow-x-auto whitespace-pre-wrap">{sdk.example}</pre>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Logs Tab */}
      {tab === "logs" && (
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4">Request Logs</h3>
          <div className="space-y-2">
            {[
              { method: "POST", path: "/v1/barcodes", status: 201, time: "45ms", timestamp: "2 min ago" },
              { method: "GET", path: "/v1/qrcodes", status: 200, time: "23ms", timestamp: "5 min ago" },
              { method: "POST", path: "/v1/barcodes", status: 400, time: "12ms", timestamp: "8 min ago" },
              { method: "POST", path: "/v1/qrcodes", status: 201, time: "67ms", timestamp: "15 min ago" },
              { method: "GET", path: "/v1/barcodes", status: 200, time: "31ms", timestamp: "20 min ago" },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-50 dark:bg-surface-800 text-xs">
                <span className={cn("px-2 py-0.5 rounded font-bold", log.method === "GET" ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300")}>{log.method}</span>
                <span className="font-mono text-surface-700 dark:text-surface-300 flex-1">{log.path}</span>
                <span className={cn("font-bold", log.status < 300 ? "text-green-600" : "text-red-600")}>{log.status}</span>
                <span className="text-surface-500 w-12 text-right">{log.time}</span>
                <span className="text-surface-400 w-20 text-right">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Webhooks Tab */}
      {tab === "webhooks" && (
        <Card padding="lg">
          <h3 className="text-sm font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-accent-600" />Webhooks</h3>
          <p className="text-sm text-surface-500 mb-4">Configure webhooks to receive real-time notifications about events in your account.</p>
          <button className="px-4 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors mb-6"><Plus className="h-4 w-4 inline mr-1.5" />Add Webhook Endpoint</button>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between mb-2"><code className="text-xs font-mono bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded">https://your-app.com/webhooks/barcodegen</code><span className="px-2 py-0.5 bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400 text-xs rounded-full font-medium">Active</span></div>
              <p className="text-xs text-surface-500">Events: barcode.created, qrcode.created, batch.completed, payment.success</p>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
}
