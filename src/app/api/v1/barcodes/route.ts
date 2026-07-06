import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiPaginated } from "@/lib/api/response";
import { authenticateRequest } from "@/lib/auth/jwt";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { validate, paginationSchema } from "@/lib/api/validation";
import { cacheGet, cacheSet } from "@/lib/cache/redis";
import { z } from "zod";

const createBarcodeSchema = z.object({
  value: z.string().min(1).max(100),
  format: z.string().min(1),
  options: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const { allowed, remaining } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  const user = await authenticateRequest(req);

  try {
    const body = await req.json();
    const result = validate(createBarcodeSchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    // In production: save to database
    // const barcode = await prisma.generatedBarcode.create({ data: { ...result.data, userId: user?.sub } });

    const barcode = {
      id: `bc_${Date.now()}`,
      ...result.data,
      userId: user?.sub || null,
      createdAt: new Date().toISOString(),
    };

    const response = apiSuccess(barcode, 201);
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    return response;
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function GET(req: NextRequest) {
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  const user = await authenticateRequest(req);
  if (!user) return apiError("Unauthorized", 401);

  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams);
  const pagination = validate(paginationSchema, params);
  if (!pagination.success) return apiError("Invalid pagination", 400);

  const { page, limit } = pagination.data;
  const cacheKey = `barcodes:${user.sub}:${page}:${limit}`;

  // Check cache
  const cached = await cacheGet<{ data: unknown[]; total: number }>(cacheKey);
  if (cached) return apiPaginated(cached.data, cached.total, page, limit);

  // In production: query database
  const data: unknown[] = [];
  const total = 0;

  await cacheSet(cacheKey, { data, total }, 60);
  return apiPaginated(data, total, page, limit);
}
