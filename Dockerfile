FROM php:8.2-cli

# 1. Install system dependencies and required PHP extensions for Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql mbstring xml zip bcmath pcntl

# 2. Install Node.js (needed to build your React frontend)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 3. Get the latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Set the working directory inside the container
WORKDIR /app

# 5. Copy your portfolio code into the container
COPY . .

# 6. Install dependencies and compile the React app
RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

# 7. Start the server and migrate the database
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}