// ======================
// JWT Authentication
// ======================

import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

/**
 * Lazily resolves the JWT secret. Never throws at import time.
 * Returns null if the secret is unavailable (caller must handle).
 */
function getJWTSecret(): Uint8Array | null {
  const raw = process.env.JWT_SECRET;
  if (raw) return new TextEncoder().encode(raw);
  if (process.env.NODE_ENV === "production") return null; // Will cause 500 at request time
  return new TextEncoder().encode("dev-only-insecure-key-do-not-use-in-production");
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function signToken(payload: { sub: string; email: string; role: string }): Promise<string> {
  const secret = getJWTSecret();
  if (!secret) throw new Error("JWT_SECRET environment variable is required");
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const secret = getJWTSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  const cookie = req.cookies.get("auth_token");
  return cookie?.value || null;
}

export async function authenticateRequest(req: NextRequest): Promise<JWTPayload | null> {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}
