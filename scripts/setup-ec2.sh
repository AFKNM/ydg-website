#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# YDG — EC2 Server Setup Script
# Run this ONCE on a fresh Amazon Linux 2023 / Ubuntu 22.04 EC2 instance
# Usage: chmod +x setup-ec2.sh && sudo ./setup-ec2.sh
# ═══════════════════════════════════════════════════════════════════

set -e
echo "🚀 YDG EC2 Setup Starting..."

# ── Detect OS ──────────────────────────────────────────────────────
if [ -f /etc/os-release ]; then
  . /etc/os-release
  OS=$ID
fi

# ── Update system ──────────────────────────────────────────────────
echo "📦 Updating system packages..."
if [ "$OS" = "ubuntu" ]; then
  apt-get update -y && apt-get upgrade -y
  apt-get install -y curl git nginx certbot python3-certbot-nginx
else
  dnf update -y
  dnf install -y curl git nginx
fi

# ── Install Node.js 20 ─────────────────────────────────────────────
echo "📦 Installing Node.js 20..."
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - 2>/dev/null || \
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
if [ "$OS" = "ubuntu" ]; then
  apt-get install -y nodejs
else
  dnf install -y nodejs
fi
echo "Node: $(node --version) | npm: $(npm --version)"

# ── Install PM2 ────────────────────────────────────────────────────
echo "📦 Installing PM2..."
npm install -g pm2
pm2 startup

# ── Create app directory ────────────────────────────────────────────
echo "📁 Creating app directory..."
mkdir -p /var/www/ydg-website
chown -R $SUDO_USER:$SUDO_USER /var/www/ydg-website 2>/dev/null || true

# ── Configure Nginx ────────────────────────────────────────────────
echo "🌐 Configuring Nginx..."
cat > /etc/nginx/conf.d/ydg.conf << 'NGINX_EOF'
server {
    listen 80;
    server_name yourdigitalguy.co.za www.yourdigitalguy.co.za;

    # Redirect HTTP → HTTPS (after SSL cert is installed)
    # Uncomment after running certbot:
    # return 301 https://$host$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}
NGINX_EOF

nginx -t && systemctl enable nginx && systemctl start nginx
echo "✅ Nginx configured"

# ── Configure firewall ─────────────────────────────────────────────
echo "🔒 Configuring firewall..."
if command -v ufw &>/dev/null; then
  ufw allow 'Nginx Full'
  ufw allow OpenSSH
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ EC2 BASE SETUP COMPLETE"
echo ""
echo "NEXT STEPS:"
echo "1. Clone your repo:  cd /var/www && git clone YOUR_GITHUB_REPO_URL ydg-website"
echo "2. Add env vars:     cp .env.production.template /var/www/ydg-website/.env.local"
echo "                     nano /var/www/ydg-website/.env.local  (fill in real values)"
echo "3. Install & build:  cd /var/www/ydg-website && npm install && npm run db:migrate && npm run build"
echo "4. Start with PM2:   pm2 start npm --name 'ydg' -- start && pm2 save"
echo "5. SSL cert:         certbot --nginx -d yourdigitalguy.co.za -d www.yourdigitalguy.co.za"
echo "═══════════════════════════════════════════════════════════════"
