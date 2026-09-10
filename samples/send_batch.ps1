param (
    [Parameter(Mandatory=$true)]
    [string]$Source,

    [Parameter(Mandatory=$true)]
    [string]$File,

    [Parameter(Mandatory=$true)]
    [string]$ApiKey
)

$url = "http://localhost:3000/api/batch"

$logs = Get-Content $File -Raw | ConvertFrom-Json

$payload = @{
    source = $Source
    data   = @($logs)
} | ConvertTo-Json -Depth 10

Write-Host "Sending payload:"
Write-Host $payload

try {
    $response = Invoke-RestMethod `
        -Uri $url `
        -Method POST `
        -Headers @{
            "x-api-key" = $ApiKey
        } `
        -ContentType "application/json" `
        -Body $payload

    $response | ConvertTo-Json -Depth 10
}
catch {
    Write-Host "Request failed:" -ForegroundColor Red

    if ($_.ErrorDetails.Message) {
        Write-Host $_.ErrorDetails.Message
    } else {
        Write-Host $_
    }
}