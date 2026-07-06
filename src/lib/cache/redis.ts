// ======================
// Redis Cache Client
// ======================

import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis: Redis | null };

function createRedisClient(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  try {
    const client = new Redis(url, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => Math.min(times * 50, 2000),
      lazyConnect: true,
    });
    return client;
  } catch {
    console.warn("Redis connection failed, caching disabled");
    return null;
  }
}

export const redis = globalForRedis.redis || createRedisClient();
if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

// Cache helpers
export async function cacheGet<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export async function cacheSet(key: string, value: unknown, ttl: number = 300): Promise<void> {
  if (!redis) return;
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch { /* silent */ }
}

export async function cacheDel(key: string): Promise<void> {
  if (!redis) return;
  try { await redis.del(key); } catch { /* silent */ }
}

export async function cacheFlush(pattern: string): Promise<void> {
  if (!redis) return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(...keys);
  } catch { /* silent */ }
}
