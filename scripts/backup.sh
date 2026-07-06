#!/bin/bash
# ======================
# BarcodeGen - Database Backup Script
# ======================

set -euo pipefail

BACKUP_DIR="/backups/barcodegen"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30
DB_CONTAINER="barcodegen-db"
S3_BUCKET=${S3_BACKUP_BUCKET:-""}

mkdir -p "$BACKUP_DIR"

echo "📦 Starting backup... ($TIMESTAMP)"

# PostgreSQL Dump
echo "💾 Backing up PostgreSQL..."
docker exec $DB_CONTAINER pg_dump -U barcodegen -Fc barcodegen > "$BACKUP_DIR/db_$TIMESTAMP.dump"
echo "✅ Database backup: db_$TIMESTAMP.dump ($(du -h "$BACKUP_DIR/db_$TIMESTAMP.dump" | cut -f1))"

# Redis Dump
echo "💾 Backing up Redis..."
docker exec barcodegen-redis redis-cli BGSAVE
sleep 2
docker cp barcodegen-redis:/data/dump.rdb "$BACKUP_DIR/redis_$TIMESTAMP.rdb" 2>/dev/null || echo "⚠️  Redis backup skipped"

# Upload to S3 (if configured)
if [ -n "$S3_BUCKET" ]; then
  echo "☁️  Uploading to S3..."
  aws s3 cp "$BACKUP_DIR/db_$TIMESTAMP.dump" "s3://$S3_BUCKET/backups/db_$TIMESTAMP.dump" --storage-class STANDARD_IA
  echo "✅ Uploaded to S3"
fi

# Cleanup old backups
echo "🧹 Cleaning backups older than ${RETENTION_DAYS} days..."
find "$BACKUP_DIR" -name "*.dump" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "*.rdb" -mtime +$RETENTION_DAYS -delete

echo "✅ Backup complete!"
