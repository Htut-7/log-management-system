$url = "http://localhost:3000/api/ingest"
$apiKey = "tenantA-demo-secret-key"

for ($i = 1; $i -le 5; $i++) {
    $payload = @{
        source = "api"
        data = @{
            event_type = "app_login_failed"
            user = "sample-attacker"
            ip = "203.0.113.220"
        }
    } | ConvertTo-Json -Depth 10

    try {
        $response = Invoke-RestMethod `
            -Uri $url `
            -Method POST `
            -Headers @{
                "x-api-key" = $apiKey
            } `
            -ContentType "application/json" `
            -Body $payload

        Write-Host "Sent LOGIN_FAILED $i/5"
    }
    catch {
        Write-Host "Request $i failed" -ForegroundColor Red

        if ($_.ErrorDetails.Message) {
            Write-Host $_.ErrorDetails.Message
        }
    }

    Start-Sleep -Seconds 1
}