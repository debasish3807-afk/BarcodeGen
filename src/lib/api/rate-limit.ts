// ======================
// Rate Limiting
// ======================

import { NextRequest } from "next/server";
import { redis } from "@/lib/cache/redis";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60,
};

export async function checkRateLimit(
  req: NextRequest,
  config: RateLimitConfig = DEFAULT_CONFIG
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const key = `ratelimit:${ip}:${req.nextUrl.pathname}`;

  if (!redis) {
    // If no Redis, allow all (fallback)
    return { allowed: true, remaining: config.maxRequests, resetAt: Date.now() + config.windowMs };
  }

  try {
    const windowKey = `${key}:${Math.floor(Date.now() / config.windowMs)}`;
    const current = await redis.incr(windowKey);

    if (current === 1) {
      await redis.pexpire(windowKey, config.windowMs);
    }

    const remaining = Math.max(0, config.maxRequests - current);
    const resetAt = Date.now() + config.windowMs;

    return {
      allowed: current <= config.maxRequests,
      remaining,
      resetAt,
    };
  } catch {
    return { allowed: true, remaining: config.maxRequests, resetAt: Date.now() + config.windowMs };
  }
}
