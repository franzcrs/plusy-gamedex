#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# 📍 CLOUDFLARE TUNNEL DEVELOPMENT SCRIPT
# Purpose: Starts Cloudflare tunnel for local development
# When tunnel runs: $PERSONAL_DOMAIN → localhost:8080
# When tunnel stops: $PERSONAL_DOMAIN → Cloud Run (via DNS)
# ═══════════════════════════════════════════════════════════════════

# Get the project root directory (two levels up from this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Load environment variables from .env file
if [ -f "$PROJECT_ROOT/.env" ]; then
  export $(grep -v '^#' "$PROJECT_ROOT/.env" | grep -v '^$' | xargs)
else
  echo "❌ .env file not found at $PROJECT_ROOT/.env"
  echo "   Please copy .env.example to .env and configure your settings."
  exit 1
fi

# Verify PERSONAL_DOMAIN is set
if [ -z "$PERSONAL_DOMAIN" ]; then
  echo "❌ PERSONAL_DOMAIN is not set in .env"
  exit 1
fi

echo "🔗 Starting Cloudflare Tunnel for local development..."
echo "   Your Cloud API will be available at: https://$PERSONAL_DOMAIN"
echo ""
echo "   ⚠️  While this tunnel is running, traffic goes to localhost"
echo "   ⚠️  Stop this tunnel to route traffic to Cloud Run (production)"
echo ""

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
  echo "❌ cloudflared is not installed."
  echo "   Install it with: brew install cloudflared"
  echo ""
  echo "   After installation, run these one-time setup commands:"
  echo "   1. cloudflared tunnel login"
  echo "   2. cloudflared tunnel create localhost-tunnel"
  echo "   3. cloudflared tunnel route dns localhost-tunnel $PERSONAL_DOMAIN"
  echo "   4. Get the tunnel ID: cloudflared tunnel info localhost-tunnel"
  echo "   5. Update your ~/.cloudflared/config.yml with the correct tunnel ID and credentials file path"
  echo "   Example config.yml content:"
  echo "     tunnel: <TUNNEL-ID>"
  echo "     credentials-file: /Users/<YOUR-USERNAME>/.cloudflared/<TUNNEL-ID>.json"
  echo "     ingress:"
  echo "       # Rule for first service (Gamedex)"
  echo "       - hostname: $PERSONAL_DOMAIN"
  echo "         service: http://localhost:8080"
  echo "       # Rule for next service (example), must also run \"cloudflared tunnel route dns localhost-tunnel example.nomoreboringtimes.com\""
  echo "       - hostname: example.nomoreboringtimes.com"
  echo "         service: http://localhost:5678"
  echo "       # Catch-all rule (must be last)"
  echo "       - service: http_status:404"
  exit 1
fi

cloudflared tunnel run localhost-tunnel
