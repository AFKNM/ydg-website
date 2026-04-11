# YDG — Deployment Guide
## AWS EC2 + RDS + ElastiCache

### 1. Prerequisites
- Node.js 20+ on EC2 instance
- PostgreSQL on AWS RDS (af-south-1)
- Redis on AWS ElastiCache
- AWS S3 bucket: `ydg-media-bucket`
- Domain: yourdigitalguy.co.za → Route 53

### 2. First-Time Setup

```bash
# Clone repo
git clone https://github.com/YOUR_ORG/ydg-website.git
cd ydg-website

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local with all real values

# Generate Prisma client + run migrations
npm run db:generate
npm run db:migrate

# Build
npm run build

# Start (use PM2 for production)
npx pm2 start npm --name "ydg" -- start
npx pm2 save
npx pm2 startup
```

### 3. Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl;
    server_name yourdigitalguy.co.za www.yourdigitalguy.co.za;

    ssl_certificate     /etc/letsencrypt/live/yourdigitalguy.co.za/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdigitalguy.co.za/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name yourdigitalguy.co.za www.yourdigitalguy.co.za;
    return 301 https://$host$request_uri;
}
```

### 4. YOCO Webhook Setup
Register this URL in your YOCO dashboard:
```
https://yourdigitalguy.co.za/api/webhooks/yoco
```

### 5. GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy YDG
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ec2-user
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /var/www/ydg-website
            git pull origin main
            npm ci --production
            npm run db:migrate
            npm run build
            pm2 restart ydg
```

### 6. Phase 1 Admin Setup
After first deploy, create admin user:
```bash
# Via Prisma Studio
npm run db:studio
# OR via direct SQL:
# UPDATE users SET role = 'ADMIN' WHERE email = 'YOUR_EMAIL';
```
