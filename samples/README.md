# Sample Log Senders

These scripts and sample files simulate external log sources for the Log Management System.

## Requirements

- Application running on `http://localhost:3000`
- PowerShell
- `.env.local` configured with ingestion API keys
- For Syslog testing, the UDP Syslog receiver must also be running

## API Failed Login Simulator

Sends failed-login events through the HTTP ingestion endpoint.

### Tenant A

```powershell
.\samples\send_api_logs.ps1 -ApiKey "tenantA-demo-secret-key" -Ip "203.0.113.230" -User "tenantA-test-user" -Count 5

