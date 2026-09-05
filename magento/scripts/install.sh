#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "Missing magento/.env. Copy .env.example to .env and fill it in." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
source .env
set +a

required_vars=(
  MAGENTO_VERSION
  MAGENTO_BASE_URL
  MAGENTO_BACKEND_FRONTNAME
  MAGENTO_PUBLIC_KEY
  MAGENTO_PRIVATE_KEY
  MAGENTO_ADMIN_FIRSTNAME
  MAGENTO_ADMIN_LASTNAME
  MAGENTO_ADMIN_EMAIL
  MAGENTO_ADMIN_USER
  MAGENTO_ADMIN_PASSWORD
  MARIADB_DATABASE
  MARIADB_USER
  MARIADB_PASSWORD
  MARIADB_ROOT_PASSWORD
)

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "Required value $var_name is missing from magento/.env." >&2
    exit 1
  fi
done

if [[ "$MAGENTO_ADMIN_PASSWORD" == "replace-with-a-strong-password" ]]; then
  echo "Set a strong MAGENTO_ADMIN_PASSWORD before installing." >&2
  exit 1
fi

if [[ "$MARIADB_PASSWORD" == replace-with-* || "$MARIADB_ROOT_PASSWORD" == replace-with-* ]]; then
  echo "Replace the example MariaDB passwords before installing." >&2
  exit 1
fi

echo "Building the Magento PHP image..."
docker compose build php

echo "Starting MariaDB and OpenSearch..."
docker compose up -d db opensearch

echo "Saving repo.magento.com credentials inside the private Composer volume..."
docker compose run --rm --user root php \
  composer config --global http-basic.repo.magento.com \
  "$MAGENTO_PUBLIC_KEY" "$MAGENTO_PRIVATE_KEY"

if [[ ! -f src/bin/magento ]]; then
  echo "Downloading Magento Open Source ${MAGENTO_VERSION}..."
  docker compose run --rm php sh -lc \
    "composer create-project --repository-url=https://repo.magento.com/ magento/project-community-edition=${MAGENTO_VERSION} /tmp/magento && cp -a /tmp/magento/. /var/www/html/"
else
  echo "Magento source already exists; skipping Composer create-project."
fi

if [[ ! -f src/app/etc/env.php ]]; then
  echo "Installing Magento..."
  docker compose run --rm php bin/magento setup:install \
    --base-url="$MAGENTO_BASE_URL" \
    --db-host=db \
    --db-name="$MARIADB_DATABASE" \
    --db-user="$MARIADB_USER" \
    --db-password="$MARIADB_PASSWORD" \
    --backend-frontname="$MAGENTO_BACKEND_FRONTNAME" \
    --admin-firstname="$MAGENTO_ADMIN_FIRSTNAME" \
    --admin-lastname="$MAGENTO_ADMIN_LASTNAME" \
    --admin-email="$MAGENTO_ADMIN_EMAIL" \
    --admin-user="$MAGENTO_ADMIN_USER" \
    --admin-password="$MAGENTO_ADMIN_PASSWORD" \
    --language=en_US \
    --currency=USD \
    --timezone=America/New_York \
    --use-rewrites=1 \
    --search-engine=opensearch \
    --opensearch-host=opensearch \
    --opensearch-port=9200 \
    --opensearch-enable-auth=0
else
  echo "Magento is already installed; skipping setup:install."
fi

docker compose run --rm php bin/magento deploy:mode:set developer
docker compose run --rm php bin/magento cache:flush
docker compose run --rm php bin/magento indexer:reindex

echo "Starting Magento PHP and nginx..."
docker compose up -d php nginx

echo
echo "FNFlowers Magento is ready:"
echo "Storefront: ${MAGENTO_BASE_URL}"
echo "Admin: ${MAGENTO_BASE_URL}${MAGENTO_BACKEND_FRONTNAME}/"
echo "Admin user: ${MAGENTO_ADMIN_USER}"
echo "The password remains only in your local magento/.env file."
