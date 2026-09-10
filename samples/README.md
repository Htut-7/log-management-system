# Sample Log Senders

These scripts and sample files simulate external log sources for the Log Management System.

## Requirements

- Next.js application running on `http://localhost:3000`
- PowerShell
- `.env.local` configured with the ingestion API keys

## API Failed Login Simulator

Sends five failed-login events through the HTTP ingestion endpoint.

```powershell
.\samples\send_api_logs.ps1
```
