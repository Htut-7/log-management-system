$server = "127.0.0.1"
$port = 5514

$messages = @(
    "action=deny src=10.10.20.15 spt=49152 dst=8.8.8.8 dpt=53 proto=udp",
    "action=allow src=10.10.20.21 spt=44321 dst=10.0.0.10 dpt=443 proto=tcp",
    "action=deny src=192.168.1.50 spt=55000 dst=172.16.0.20 dpt=22 proto=tcp"
)

$udpClient = New-Object System.Net.Sockets.UdpClient

foreach ($message in $messages) {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($message)

    $udpClient.Send(
        $bytes,
        $bytes.Length,
        $server,
        $port
    ) | Out-Null

    Write-Host "Sent Syslog: $message"

    Start-Sleep -Seconds 1
}

$udpClient.Close()