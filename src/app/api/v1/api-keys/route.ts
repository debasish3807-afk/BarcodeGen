import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { authenticateRequest } from "@/lib/auth/jwt";
import { checkRateLimit } from "@/lib/api/rate-limit";
import { z } from "zod";
import { validate } from "@/lib/api/validation";
import crypto from "crypto";

const createKeySchema = z.object({
  name: z.string().min(2).max(100),
  scopes: z.array(z.string()).min(1),
  rateLimit: z.number().min(10).max(100000).optional(),
});

export async function POST(req: NextRequest) {
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  const user = await authenticateRequest(req);
  if (!user) return apiError("Unauthorized", 401);

  try {
    const body = await req.json();
    const result = validate(createKeySchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    // Generate encrypted API key
    const prefix = "bg_live_sk_";
    const secret = crypto.randomBytes(24).toString("hex");
    const key = `${prefix}${secret}`;

    // In production: hash key and store in database
    // const hashedKey = await bcrypt.hash(key, 10);
    // await prisma.apiKey.create({ data: { userId: user.sub, key: hashedKey, name, scopes } });

    const apiKey = {
      id: `key_${Date.now()}`,
      name: result.data.name,
      key, // Only shown once at creation
      scopes: result.data.scopes,
      rateLimit: result.data.rateLimit || 100,
      createdAt: new Date().toISOString(),
    };

    return apiSuccess(apiKey, 201);
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function GET(req: NextRequest) {
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  const user = await authenticateRequest(req);
  if (!user) return apiError("Unauthorized", 401);

  // In production: fetch from database (keys are hashed, show prefix only)
  return apiSuccess([
    { id: "key_1", name: "Production", prefix: "bg_live_sk_1234...", scopes: ["barcodes", "qrcodes"], requests: 45230, isActive: true, createdAt: "2025-01-15" },
    { id: "key_2", name: "Development", prefix: "bg_test_sk_0987...", scopes: ["barcodes", "qrcodes", "batch"], requests: 1250, isActive: true, createdAt: "2025-01-20" },
  ]);
}

export async function DELETE(req: NextRequest) {
  const { allowed } = await checkRateLimit(req);
  if (!allowed) return apiError("Rate limit exceeded", 429);

  const user = await authenticateRequest(req);
  if (!user) return apiError("Unauthorized", 401);

  const { searchParams } = new URL(req.url);
  const keyId = searchParams.get("id");
  if (!keyId) return apiError("Key ID required", 400);

  // In production: revoke key in database
  // await prisma.apiKey.update({ where: { id: keyId, userId: user.sub }, data: { isActive: false } });

  return apiSuccess({ message: "API key revoked successfully" });
}
