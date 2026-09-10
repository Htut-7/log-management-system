Write-Host "Starting Log Management System..."

docker compose up -d --build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to start Docker containers."
    exit 1
}

Write-Host "Waiting for MongoDB..."

do {
    docker compose exec -T mongo mongosh --quiet --eval "db.adminCommand('ping')" *> $null

    if ($LASTEXITCODE -ne 0) {
        Start-Sleep -Seconds 2
    }
} while ($LASTEXITCODE -ne 0)

Write-Host "MongoDB is ready."

Write-Host "Seeding demo users and alert rules..."

docker compose exec -T app node scripts/seed.mjs

if ($LASTEXITCODE -ne 0) {
    Write-Error "Database seed failed."
    exit 1
}

Write-Host ""
Write-Host "Log Management System is ready."
Write-Host "Web UI: http://localhost:3000"
Write-Host "Syslog UDP: localhost:5514"