#!/bin/bash
set -e

# ═══════════════════════════════════════════════════════════════════
# 📍 CLOUD RUN DEPLOYMENT SCRIPT
# Purpose: Deploys the Cloud API to Google Cloud Run
# Environment variables including domains are passed to Cloud Run
# ═══════════════════════════════════════════════════════════════════

# Load environment variables from .env file in root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ -f "$ROOT_DIR/.env" ]; then
  export $(grep -v '^#' "$ROOT_DIR/.env" | xargs)
else
  echo "❌ .env file not found at $ROOT_DIR/.env"
  echo "   Please create one based on .env.example"
  exit 1
fi

echo "🚀 Deploying PlusY-Gamedex Cloud API to Cloud Run..."

# ═══════════════════════════════════════════════════════════════════
# 📍 DEPLOYMENT - Environment variables including domains are passed here
# ═══════════════════════════════════════════════════════════════════
gcloud run deploy plusy-gamedex-api \
  --source "$ROOT_DIR/cloud-api" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars "BUCKET_NAME=$BUCKET_NAME,PERSONAL_DOMAIN=$PERSONAL_DOMAIN,CLIENT_DOMAIN=$CLIENT_DOMAIN" \
  --project "$PROJECT_ID" \
  --memory 512Mi \
  --timeout 60s \
  --min-instances 0 \
  --max-instances 10

echo "✅ Deployment complete!"

# Get the service URL
SERVICE_URL=$(gcloud run services describe plusy-gamedex-api \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --format 'value(status.url)')

echo "📍 Service URL: $SERVICE_URL"
echo ""
echo "Next steps:"
echo "  1. Add a CNAME record in Cloudflare pointing $PERSONAL_DOMAIN to: $SERVICE_URL"
echo "  2. Configure domain mapping in Cloud Run console"
echo "  3. When ready for client, add CNAME in Wix for $CLIENT_DOMAIN"
