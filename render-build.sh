#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Install Node dependencies and build the React frontend
npm install
npm run build

# Clear caches and run database migrations
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan migrate --force