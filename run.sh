#!/bin/sh
set -e

echo "Starting Log Management System..."

docker compose up -d --build

echo "Waiting for MongoDB..."

until docker compose exec -T mongo mongosh --quiet --eval "db.adminCommand('ping')" > /dev/null 2>&1
do
  sleep 2
done

echo "MongoDB is ready."

echo "Seeding demo users and alert rules..."

docker compose exec -T app node scripts/seed.mjs

echo ""
echo "Log Management System is ready."
echo "Web UI: http://localhost:3000"
echo "Syslog UDP: localhost:5514"