import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { authenticateRequest } from "@/lib/auth/jwt";
import { isAdmin } from "@/lib/auth/rbac";
import { cacheGet, cacheSet } from "@/lib/cache/redis";
import type { RoleName } from "@/lib/auth/rbac";

export async function GET(req: NextRequest) {
  const user = await authenticateRequest(req);
  if (!user || !isAdmin(user.role as RoleName)) {
    return apiError("Forbidden", 403);
  }

  const cacheKey = "admin:stats";
  const cached = await cacheGet(cacheKey);
  if (cached) return apiSuccess(cached);

  // In production: query database aggregates
  const stats = {
    totalUsers: 12547,
    totalBarcodes: 1245890,
    totalQRCodes: 856234,
    totalBatchJobs: 3421,
    totalApiRequests: 4521890,
    revenue: 45280.50,
    activeSubscriptions: 234,
    newUsersToday: 45,
    barcodesGeneratedToday: 8923,
    qrCodesGeneratedToday: 6234,
    blogViews: 125678,
    contactMessages: 89,
    newsletterSubscribers: 8934,
    systemHealth: "healthy",
    uptime: "99.98%",
    cacheHitRate: "94.2%",
  };

  await cacheSet(cacheKey, stats, 300);
  return apiSuccess(stats);
}
