#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# 📍 CLOUDFLARE TUNNEL DEVELOPMENT SCRIPT
# Purpose: Starts Cloudflare tunnel for local development
# When tunnel runs: plusy.nomoreboringtimes.com → localhost:8080
# When tunnel stops: plusy.nomoreboringtimes.com → Cloud Run (via DNS)
# ═══════════════════════════════════════════════════════════════════

echo "🔗 Starting Cloudflare Tunnel for local development..."
echo "   Your Cloud API will be available at: https://plusy.nomoreboringtimes.com"
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
  echo "   2. cloudflared tunnel create gamedex-tunnel"
  echo "   3. cloudflared tunnel route dns gamedex-tunnel plusy.nomoreboringtimes.com"
  exit 1
fi

cloudflared tunnel run gamedex-tunnel
