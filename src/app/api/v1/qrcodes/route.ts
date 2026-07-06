import { NextRequest } from "next/server";
import { apiSuccess, apiError, apiPaginated } from "@/lib/api/response";
import { authenticateRequest } from "@/lib/auth/jwt";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { validate, paginationSchema } from "@/lib/api/validation";
import { z } from "zod";

const createQRSchema = z.object({
  value: z.string().min(1).max(4296),
  type: z.string().min(1),
  options: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  try {
    const body = await req.json();
    const result = validate(createQRSchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    const qrcode = {
      id: `qr_${Date.now()}`,
      ...result.data,
      createdAt: new Date().toISOString(),
    };

    return apiSuccess(qrcode, 201);
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

  return apiPaginated([], 0, pagination.data.page, pagination.data.limit);
}
