#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# YDG — Deploy / Update Script
# Run this on EC2 to pull latest code and restart the app
# Usage: ./scripts/deploy.sh
# ═══════════════════════════════════════════════════════════════════

set -e
APP_DIR="/var/www/ydg-website"

echo "🚀 Deploying YDG..."
cd $APP_DIR

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm ci --production=false

echo "🗄️  Running database migrations..."
npm run db:migrate

echo "🔨 Building..."
npm run build

echo "♻️  Restarting PM2..."
pm2 restart ydg || pm2 start npm --name "ydg" -- start
pm2 save

echo "✅ Deploy complete! Site is live at https://yourdigitalguy.co.za"
