#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building the application..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm test

# Copy nginx configuration to server
echo "🔧 Updating Nginx configuration..."
scp -i ~/Documents/alexbordei_dev.pem nginx.conf bitnami@3.65.121.191:~/nginx.conf

# Apply Nginx configuration and restart service
echo "🔄 Applying Nginx configuration..."
ssh -i ~/Documents/alexbordei_dev.pem bitnami@3.65.121.191 "sudo mv nginx.conf /etc/nginx/sites-available/alexbordei.conf && sudo ln -sf /etc/nginx/sites-available/alexbordei.conf /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl restart nginx"

# Copy application files to server
echo "📤 Copying application files..."
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' --exclude '.env*' -e "ssh -i ~/Documents/alexbordei_dev.pem" ./ bitnami@3.65.121.191:/home/bitnami/app/

# Install dependencies and restart the application on the server
echo "⚙️ Installing dependencies and restarting application..."
ssh -i ~/Documents/alexbordei_dev.pem bitnami@3.65.121.191 "cd /home/bitnami/app && npm install --production && pm2 restart all || pm2 start npm --name 'alexbordei' -- start"

echo "✅ Deployment completed successfully!" 