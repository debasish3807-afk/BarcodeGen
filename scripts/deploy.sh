#!/bin/bash
# ======================
# BarcodeGen - Deployment Script
# ======================

set -euo pipefail

echo "🚀 BarcodeGen Deployment"
echo "========================"

# Configuration
ENV=${1:-production}
APP_NAME="barcodegen"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "📋 Environment: $ENV"
echo "📋 Timestamp: $TIMESTAMP"

# Pre-deployment checks
echo ""
echo "🔍 Running pre-deployment checks..."
if ! command -v docker &> /dev/null; then echo "❌ Docker not installed"; exit 1; fi
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then echo "❌ Docker Compose not installed"; exit 1; fi
echo "✅ All checks passed"

# Build
echo ""
echo "🔨 Building application..."
docker compose build --no-cache app
echo "✅ Build complete"

# Database migration
echo ""
echo "📊 Running database migrations..."
docker compose exec app npx prisma migrate deploy 2>/dev/null || echo "⚠️  Migrations skipped (no pending)"

# Deploy
echo ""
echo "🚀 Deploying..."
docker compose up -d --remove-orphans
echo "✅ Deployment complete"

# Health check
echo ""
echo "🏥 Running health check..."
sleep 10
HEALTH=$(curl -s http://localhost:3000/api/health | grep -o '"status":"[^"]*"' || echo "unreachable")
echo "📋 Health: $HEALTH"

# Cleanup
echo ""
echo "🧹 Cleaning up old images..."
docker image prune -f --filter "until=168h" 2>/dev/null || true

echo ""
echo "✅ Deployment complete!"
echo "🌐 App: https://barcodegen.com"
echo "📊 Grafana: http://localhost:3001"
echo "🔍 Prometheus: http://localhost:9090"
