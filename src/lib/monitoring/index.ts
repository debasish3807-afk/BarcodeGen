// ======================
// Monitoring & Health Check System
// ======================

export interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  version: string;
  checks: ServiceCheck[];
}

export interface ServiceCheck {
  name: string;
  status: "up" | "down" | "degraded";
  responseTime: number;
  message?: string;
}

const startTime = Date.now();

export async function getHealthStatus(): Promise<HealthStatus> {
  const checks: ServiceCheck[] = [];

  // Database check
  checks.push(await checkDatabase());
  // Redis check
  checks.push(await checkRedis());
  // Storage check
  checks.push({ name: "Storage", status: "up", responseTime: 5 });

  const allUp = checks.every((c) => c.status === "up");
  const anyDown = checks.some((c) => c.status === "down");

  return {
    status: anyDown ? "unhealthy" : allUp ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    version: process.env.npm_package_version || "1.0.0",
    checks,
  };
}

async function checkDatabase(): Promise<ServiceCheck> {
  const start = Date.now();
  try {
    // In production: await prisma.$queryRaw`SELECT 1`
    return { name: "PostgreSQL", status: "up", responseTime: Date.now() - start };
  } catch (e) {
    return { name: "PostgreSQL", status: "down", responseTime: Date.now() - start, message: String(e) };
  }
}

async function checkRedis(): Promise<ServiceCheck> {
  const start = Date.now();
  try {
    // In production: await redis.ping()
    return { name: "Redis", status: "up", responseTime: Date.now() - start };
  } catch (e) {
    return { name: "Redis", status: "down", responseTime: Date.now() - start, message: String(e) };
  }
}
