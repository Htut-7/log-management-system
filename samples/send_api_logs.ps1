param (
    [Parameter(Mandatory=$true)]
    [string]$ApiKey,

    [string]$Ip = "198.51.100.88",

    [string]$User = "tenantb-test-user",

    [int]$Count=10
)

$url = "http://localhost:3000/api/ingest"

for ($i = 1; $i -le $Count; $i++) {
    $payload = @{
        source = "api"
        data = @{
            event_type = "app_login_failed"
            user = $User
            ip = $Ip
        }
    } | ConvertTo-Json -Depth 10

    try {
        $response = Invoke-RestMethod `
            -Uri $url `
            -Method POST `
            -Headers @{
                "x-api-key" = $ApiKey
            } `
            -ContentType "application/json" `
            -Body $payload

        Write-Host "Sent LOGIN_FAILED $i/$Count - $User - $Ip"
    }
    catch {
        Write-Host "Request $i failed" -ForegroundColor Red

        if ($_.ErrorDetails.Message) {
            Write-Host $_.ErrorDetails.Message
        }
    }

    Start-Sleep -Seconds 1
}