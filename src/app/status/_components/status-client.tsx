"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Activity, Server, Database, Globe, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: string;
  icon: React.ElementType;
}

const services: ServiceStatus[] = [
  { name: "Web Application", status: "operational", uptime: "99.99%", icon: Globe },
  { name: "API Gateway", status: "operational", uptime: "99.98%", icon: Zap },
  { name: "Database", status: "operational", uptime: "99.99%", icon: Database },
  { name: "Redis Cache", status: "operational", uptime: "99.97%", icon: Server },
  { name: "CDN", status: "operational", uptime: "100%", icon: Globe },
  { name: "Email Service", status: "operational", uptime: "99.95%", icon: Activity },
];

const statusConfig = {
  operational: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30", label: "Operational" },
  degraded: { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/30", label: "Degraded" },
  outage: { icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30", label: "Outage" },
};

export function StatusClient() {
  const [lastChecked, setLastChecked] = useState("");
  useEffect(() => { setLastChecked(new Date().toLocaleString()); }, []);

  const allOperational = services.every((s) => s.status === "operational");

  return (
    <Container size="md">
      {/* Overall Status */}
      <Card padding="lg" className={cn("text-center mb-8", allOperational ? "border-green-200 dark:border-green-800" : "border-yellow-200 dark:border-yellow-800")}>
        <CheckCircle className={cn("h-12 w-12 mx-auto mb-3", allOperational ? "text-green-600" : "text-yellow-600")} />
        <h2 className="text-xl font-bold text-surface-900 dark:text-white">{allOperational ? "All Systems Operational" : "Some Systems Degraded"}</h2>
        <p className="text-sm text-surface-500 mt-1">Last checked: {lastChecked}</p>
      </Card>

      {/* Service List */}
      <div className="space-y-3">
        {services.map((service) => {
          const config = statusConfig[service.status];
          const StatusIcon = config.icon;
          const ServiceIcon = service.icon;
          return (
            <Card key={service.name} padding="md" className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ServiceIcon className="h-5 w-5 text-surface-400" />
                <div>
                  <p className="text-sm font-semibold text-surface-900 dark:text-white">{service.name}</p>
                  <p className="text-xs text-surface-500">Uptime: {service.uptime}</p>
                </div>
              </div>
              <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold", config.bg, config.color)}>
                <StatusIcon className="h-3.5 w-3.5" />{config.label}
              </div>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}
