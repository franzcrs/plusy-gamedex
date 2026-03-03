#!/bin/bash
set -e

# ═══════════════════════════════════════════════════════════════════
# 📍 GCS BUCKET SETUP SCRIPT
# Purpose: Configures GCS to enable object versioning and sets CORS policies
# When to Execute:
#   - Run once during initial project setup
#   - Run again if you need to add new domains to CORS policy
# ═══════════════════════════════════════════════════════════════════

# Load environment variables from .env file in root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

if [ -f "$ROOT_DIR/.env" ]; then
  export $(grep -v '^#' "$ROOT_DIR/.env" | xargs)
else
  echo "❌ .env file not found at $ROOT_DIR/.env"
  echo "   Please create one based on .env.example"
  exit 1
fi

echo "🔧 Configuring GCS Bucket: $BUCKET_NAME"

# 1. Enable Object Versioning
echo "→ Enabling versioning..."
gsutil versioning set on gs://$BUCKET_NAME

# ═══════════════════════════════════════════════════════════════════
# 📍 CORS CONFIGURATION - All allowed domains must be listed here
# These domains come from .env file
# Re-run this script after adding new domains to .env
# ═══════════════════════════════════════════════════════════════════
echo "→ Applying CORS configuration..."
cat <<EOF > /tmp/cors-config.json
[
  {
    "origin": [
      "http://localhost:5173",
      "https://$PERSONAL_DOMAIN",
      "https://$CLIENT_DOMAIN",
      "https://www.taikentokyo.com"
    ],
    "method": ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    "responseHeader": ["Content-Type", "Authorization", "x-goog-resumable"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set /tmp/cors-config.json gs://$BUCKET_NAME
rm /tmp/cors-config.json

# 3. Verify configuration
echo "→ Verifying setup..."
echo "Versioning status:"
gsutil versioning get gs://$BUCKET_NAME

echo "CORS configuration:"
gsutil cors get gs://$BUCKET_NAME

echo "✅ GCS Bucket configured successfully!"
