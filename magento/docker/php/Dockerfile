FROM php:8.3-fpm-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        default-mysql-client \
        git \
        libfreetype6-dev \
        libicu-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libxml2-dev \
        libxslt1-dev \
        libzip-dev \
        unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        gd \
        intl \
        opcache \
        pdo_mysql \
        soap \
        sockets \
        xsl \
        zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2.10 /usr/bin/composer /usr/local/bin/composer
COPY php.ini /usr/local/etc/php/conf.d/zz-magento.ini

RUN usermod -u 1000 www-data \
    && groupmod -g 1000 www-data

USER www-data
