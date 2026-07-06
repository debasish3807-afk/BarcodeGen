import { NextRequest } from "next/server";
import { apiSuccess, apiError } from "@/lib/api/response";
import { validate, registerSchema } from "@/lib/api/validation";
import { signToken } from "@/lib/auth/jwt";
import { checkRateLimit } from "@/lib/api/rate-limit";

export async function POST(req: NextRequest) {
  const { allowed } = await checkRateLimit(req, { windowMs: 60000, maxRequests: 5 });
  if (!allowed) return apiError("Too many registration attempts.", 429);

  try {
    const body = await req.json();
    const result = validate(registerSchema, body);
    if (!result.success) return apiError("Validation failed", 400, result.errors.issues);

    // In production:
    // const hashed = await bcrypt.hash(result.data.password, 12);
    // const user = await prisma.user.create({ data: { ...result.data, password: hashed, roleId: defaultRoleId } });

    const token = await signToken({
      sub: "new-user-id",
      email: result.data.email,
      role: "user",
    });

    return apiSuccess({ token, message: "Registration successful" }, 201);
  } catch {
    return apiError("Internal server error", 500);
  }
}
