#!/usr/bin/env bash
set -e

echo "=== GCP e2-micro VM Setup & Deployment Script ==="

# 1. Update packages & install dependencies
sudo apt-get update
sudo apt-get install -y curl git nginx build-essential

# 2. Install Node.js 22 LTS if not present
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 22..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 3. Install PM2 process manager
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
fi

# 4. Install project dependencies & build
echo "Installing npm dependencies..."
npm install

echo "Building application..."
npm run build --workspace=backend
cd frontend && NODE_OPTIONS="--max-old-space-size=4096" npx ng build && cd ..

# 5. Seed database if required
echo "Seeding database..."
npm run seed --workspace=backend || true

# 6. Configure Nginx
echo "Configuring Nginx..."
sudo cp nginx/nginx.conf /etc/nginx/sites-available/profile-website
sudo rm -f /etc/nginx/sites-enabled/default
sudo ln -sf /etc/nginx/sites-available/profile-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 7. Start/Restart backend process via PM2
echo "Starting backend via PM2..."
pm2 stop profile-backend || true
pm2 delete profile-backend || true
pm2 start backend/dist/main.js --name "profile-backend" --env production
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER || true

echo "=== Deployment Completed Successfully! ==="
