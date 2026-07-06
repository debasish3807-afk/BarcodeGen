-- BarcodeGen - Database Initialization
-- This runs on first container start

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for full-text search
-- These supplement Prisma's schema indexes
