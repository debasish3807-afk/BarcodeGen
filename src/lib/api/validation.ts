// ======================
// Input Validation with Zod
// ======================

import { z } from "zod";

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
});

// Blog schemas
export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(50),
  categoryId: z.string().cuid(),
  author: z.string().min(2).max(100),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
});

// Contact schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z.string().min(10, "Message too short").max(5000),
});

// Newsletter schema
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional(),
});

// Settings schema
export const settingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.unknown(),
  group: z.string().max(50).optional(),
});

// API Key schema
export const apiKeySchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  scopes: z.array(z.string()).min(1, "At least one scope required"),
  rateLimit: z.number().min(10).max(10000).optional(),
  expiresAt: z.string().datetime().optional(),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// Validate helper
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  return { success: false, errors: result.error };
}
