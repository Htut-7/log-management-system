# Log Management System

A full-stack, multi-tenant log management and security monitoring system built with Next.js, TypeScript, MongoDB, Mongoose, and Auth.js.

The system ingests logs from multiple sources, normalizes them into a centralized schema, stores them in MongoDB, provides tenant-scoped search and dashboard views, and automatically generates alerts based on configurable detection rules.

This project was developed as a Full-Stack Developer Intern practical assignment.

---

## Overview

The application demonstrates a simplified Security Information and Event Management workflow.

```text
External Log Sources
        |
        v
+--------------------------+
|      Ingestion Layer     |
|                          |
| HTTP JSON                |
| JSON Batch               |
| UDP Syslog               |
+------------+-------------+
             |
             v
+--------------------------+
|   Tenant Authentication  |
|                          |
| API Key Mapping          |
| Authenticated Session    |
+------------+-------------+
             |
             v
+--------------------------+
|      Normalization       |
|                          |
| Source-specific fields   |
|         ->               |
| Common Log Schema        |
+------------+-------------+
             |
             v
+--------------------------+
|         MongoDB          |
+------------+-------------+
             |
       +-----+------+
       |            |
       v            v
+-------------+  +----------------+
| Search and  |  | Alert Detection|
| Dashboard   |  | Engine         |
+-------------+  +-------+--------+
                        |
                        v
                 +-------------+
                 | Alerts Page |
                 +-------------+
```

The system currently supports two tenants and two user roles while enforcing tenant isolation on server-side queries.

---

## Key Features

- Multi-tenant log isolation
- Admin and Viewer role-based access control
- Credentials authentication with Auth.js
- HTTP JSON ingestion
- Batch JSON ingestion
- UDP Syslog ingestion
- API-key-based tenant identification
- Log normalization
- MongoDB storage
- Search and filtering
- Dashboard statistics
- Top IP, user, and event rankings
- Timeline visualization
- Configurable alert rules
- Automatic alert detection
- Duplicate open-alert suppression
- Seven-day MongoDB TTL retention
- Docker appliance deployment
- Seed script for fresh appliance installations
- Sample PowerShell log senders

---

## Technology Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Next.js Server Actions
- Auth.js / NextAuth
- Zod
- bcryptjs

### Database

- MongoDB
- Mongoose

### Infrastructure

- Docker
- Docker Compose
- MongoDB Atlas for development/cloud usage
- Local MongoDB container for appliance mode

### Log Ingestion

- REST / HTTP JSON
- HTTP JSON batch
- UDP Syslog
- PowerShell simulator scripts

---

## Supported Log Sources

The current implementation contains four working source types.

| Source | Ingestion Method | Format |
| --- | --- | --- |
| API application logs | HTTP POST | JSON |
| AWS | Batch HTTP POST | JSON |
| Microsoft AD / Windows Security | Batch HTTP POST | JSON |
| Firewall | UDP Syslog | Syslog text |

The system therefore demonstrates both HTTP and UDP protocols and supports single-event, batch, and Syslog ingestion.

The architecture can be extended to additional sources such as Microsoft 365 and CrowdStrike.

---

## Application Routes

| Route | Description |
| --- | --- |
| `/login` | User authentication |
| `/` | Main dashboard |
| `/log` | Log search and filtering |
| `/alerts` | Security alerts |
| `/alert-rules` | Admin alert-rule management |
| `/api/ingest` | Single HTTP log ingestion |
| `/api/batch` | Batch log ingestion |
| `/api/ingest/syslog` | Syslog forwarding endpoint |

---

## Authentication

The application uses Auth.js credentials authentication.

Passwords are stored as bcrypt hashes rather than plaintext values.

The authenticated session contains information such as:

```text
user id
role
tenant
```

Server-side actions use this session information to restrict access.

Public self-registration is not enabled. Demo users are provisioned using the appliance seed script.

---

## Role-Based Access Control

Two roles are implemented.

### ADMIN

Administrators can:

- View logs
- Search and filter logs
- View dashboard statistics
- View alerts
- Create alert rules
- View tenant alert rules

### VIEWER

Viewers can:

- View logs
- Search and filter logs
- View dashboard statistics
- View alerts belonging to their tenant

Viewers cannot access administrative alert-rule management.

The authorization check is enforced on the server, not only by hiding UI elements.

---

## Multi-Tenant Architecture

Each user, log, alert rule, and alert belongs to a tenant.

The current demonstration uses:

```text
tenantA
tenantB
```

### Browser Users

For authenticated browser users, the tenant is obtained from the Auth.js session.

```text
Authenticated User
      |
      v
Session
      |
      v
session.user.tenant
      |
      v
Tenant-scoped database query
```

The browser does not choose which tenant to query.

### External Log Sources

External sources authenticate using ingestion API keys.

```text
Tenant A API Key
      |
      v
Backend mapping
      |
      v
tenantA
```

```text
Tenant B API Key
      |
      v
Backend mapping
      |
      v
tenantB
```

The tenant value supplied inside an external payload is not trusted.

The backend determines the tenant from the API key.

This prevents a sender from changing a request body to access or write data into another tenant.

---

## Log Normalization

All source-specific events are converted into a common schema before storage.

The current schema supports fields such as:

```text
timestamp
tenant
source
vendor
product
eventType
eventSubtype
severity
action
srcIp
srcPort
dstIp
dstPort
protocol
user
host
process
url
httpMethod
statusCode
ruleName
ruleId
raw
tags
```

For example, Microsoft Windows Security events can be normalized as:

```text
Event ID 4625
      |
      v
LOGIN_FAILED
```

and:

```text
Event ID 4624
      |
      v
LOGIN_SUCCESS
```

Normalization allows logs from different sources to use the same search, dashboard, storage, and alerting logic.

---

## Log Search

The Logs page supports filtering using fields including:

- Source
- Event type
- Source IP
- User
- Severity
- Start time
- End time

All queries are automatically restricted to the authenticated user's tenant.

Example:

```text
tenantA user
      |
      v
search srcIp=198.51.100.88
      |
      v
MongoDB query also includes tenant=tenantA
```

A tenantA user therefore cannot retrieve matching tenantB records.

---

## Dashboard

The dashboard provides a summary of tenant log activity.

Current dashboard information includes:

- Total logs
- Top source IP
- Top users
- Top event types
- Top-N rankings
- Hourly event timeline
- Time-range filtering

Tenant isolation is automatically enforced through the authenticated session.

Additional dashboard filtering can be extended as required.

---

## Alert Rules

Administrators can create detection rules from the Alert Rules page.

An alert rule contains fields such as:

```text
name
description
event
threshold
timeWindow
severity
isActive
tenant
```

Example rule:

```text
Name: Repeated Failed Login
Event: LOGIN_FAILED
Threshold: 5
Time Window: 5 minutes
Severity: HIGH
Status: Active
```

Another example:

```text
Name: Login Failures
Event: LOGIN_FAILED
Threshold: 10
Time Window: 10 minutes
Severity: CRITICAL
Status: Active
```

---

## Alert Detection

After log ingestion, the application evaluates active rules.

For a repeated failed-login rule:

```text
New LOGIN_FAILED log
       |
       v
Find active LOGIN_FAILED rules
       |
       v
Find matching logs within time window
       |
       v
Group by source IP
       |
       v
Compare count with threshold
       |
       v
Create alert
```

Example generated alert:

```text
Repeated Failed Login

Severity: HIGH
Source IP: 198.51.100.88
Status: OPEN

5 LOGIN_FAILED events detected from
198.51.100.88 within 5 minutes
```

The application also checks for an existing open alert for the same rule and source IP to reduce duplicate alert flooding.

---

## Data Retention

Log retention is implemented with a MongoDB TTL index.

The current retention period is:

```text
7 days
```

The TTL index is based on the document creation time.

This allows MongoDB to automatically remove expired log records.

---

# Project Structure

```text
log-management-system/
|
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   │
│   ├── (root)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── log/
│   │   │   └── page.tsx
│   │   ├── alerts/
│   │   │   └── page.tsx
│   │   └── alert-rules/
│   │       └── page.tsx
│   │
│   └── api/
│       ├── auth/
│       ├── ingest/
│       │   └── syslog/
│       └── batch/
│
├── database/
│   ├── dbConnect.ts
│   └── models/
│
├── lib/
│   ├── actions/
│   ├── schema/
│   └── response.ts
│
├── ingest/
│   └── syslog-server.mjs
│
├── samples/
│   ├── README.md
│   ├── api_logs.json
│   ├── aws_logs.json
│   ├── ad_logs.json
│   ├── firewall_logs.txt
│   ├── send_api_logs.ps1
│   ├── send_batch.ps1
│   └── send_syslog.ps1
│
├── scripts/
│   └── seed.mjs
│
├── docs/
│
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env.example
├── package.json
└── README.md
```

This project uses a unified Next.js full-stack architecture rather than separate standalone frontend and backend applications.

Frontend code is primarily located under:

```text
app/(auth)
app/(root)
```

Backend code is primarily located under:

```text
app/api
lib/actions
database
```

Log collector code is located under:

```text
ingest/
```

---

# Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
MONGODB_URI=your-mongodb-connection-string

AUTH_SECRET=replace-with-secure-auth-secret
AUTH_TRUST_HOST=true

INGEST_API_KEY_TENANTA=replace-with-tenant-a-api-key
INGEST_API_KEY_TENANTB=replace-with-tenant-b-api-key

SEED_TENANTA_ADMIN_PASSWORD=replace-with-password
SEED_TENANTA_VIEWER_PASSWORD=replace-with-password
SEED_TENANTB_ADMIN_PASSWORD=replace-with-password
SEED_TENANTB_VIEWER_PASSWORD=replace-with-password
```

Do not commit `.env.local`.

Real passwords, database credentials, authentication secrets, and API keys should never be committed to the repository.

A `.env.example` file should contain placeholders only.

---

# Local Development

## Requirements

- Node.js 22
- npm
- MongoDB Atlas or local MongoDB

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

When running the development server, the application uses the `MONGODB_URI` configured in `.env.local`.

---

# Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# Docker Appliance Mode

The appliance deployment uses Docker Compose.

The current Docker appliance contains:

```text
Docker Compose
|
+-- Next.js Application
|
+-- MongoDB
```

The application container communicates with MongoDB using the Docker service hostname:

```text
mongo
```

instead of:

```text
localhost
```

---

## Build the Appliance

Run:

```bash
docker compose build
```

---

## Start the Appliance

Run:

```bash
docker compose up -d
```

Check the container status:

```bash
docker compose ps
```

The application should be available at:

```text
http://localhost:3000
```

---

## Stop the Appliance

Run:

```bash
docker compose down
```

Do not normally use:

```bash
docker compose down -v
```

unless you intentionally want to remove the MongoDB volume and delete the appliance database.

---

## Development Server and Docker

Do not run:

```bash
npm run dev
```

at the same time as the Docker application if both are configured to use port `3000`.

Otherwise Docker may report:

```text
ports are not available
```

---

# Appliance Database

The Docker appliance uses its own local MongoDB container.

This database is separate from MongoDB Atlas.

For example:

```text
npm run dev
      |
      v
MongoDB Atlas
```

while:

```text
docker compose up
      |
      v
Docker MongoDB
```

Logs and users from MongoDB Atlas will therefore not automatically appear inside the appliance database.

---

# Seed the Appliance Database

A new MongoDB appliance starts with an empty database.

Run the seed script after starting the containers:

```bash
docker compose exec app node scripts/seed.mjs
```

The seed script creates demonstration users for both tenants and initial alert rules.

The script uses environment variables for passwords.

It does not store plaintext demo passwords directly inside the source file.

---

## Seeded Demo Accounts

The current seed setup creates the following users.

| Email | Role | Tenant |
| --- | --- | --- |
| `admin.secops@example.com` | ADMIN | tenantA |
| `viewer.secops@example.com` | VIEWER | tenantA |
| `admin.blue@example.com` | ADMIN | tenantB |
| `viewer.blue@example.com` | VIEWER | tenantB |

Passwords are configured through environment variables and are not documented in the repository.

---

## Verify Appliance Database

You can inspect the Docker MongoDB database using:

```powershell
docker compose exec mongo mongosh log-management-system --quiet --eval "printjson({users: db.users.countDocuments(), logs: db.logs.countDocuments(), rules: db.alertrules.countDocuments(), alerts: db.alerts.countDocuments()})"
```

Example:

```text
{
  users: 4,
  logs: 0,
  rules: 3,
  alerts: 0
}
```

Exact counts depend on the current database state.

---

# Sample Log Ingestion

Sample data and sender scripts are located under:

```text
samples/
```

See:

```text
samples/README.md
```

for additional commands.

Do not place real production API keys in documentation.

Use placeholders such as:

```text
<TENANT_A_API_KEY>
<TENANT_B_API_KEY>
```

---

# API Failed Login Simulator

The PowerShell API sender simulates failed login activity.

Example:

```powershell
.\samples\send_api_logs.ps1 -ApiKey "<TENANT_A_API_KEY>" -Ip "203.0.113.230" -User "test-user" -Count 5
```

Parameters:

| Parameter | Purpose |
| --- | --- |
| `ApiKey` | Determines which tenant receives the logs |
| `Ip` | Source IP used in the generated events |
| `User` | Username stored in the generated events |
| `Count` | Number of events to send |

Example for five events:

```powershell
.\samples\send_api_logs.ps1 -ApiKey "<TENANT_A_API_KEY>" -Ip "203.0.113.230" -User "docker-test-user" -Count 5
```

Example for ten events:

```powershell
.\samples\send_api_logs.ps1 -ApiKey "<TENANT_B_API_KEY>" -Ip "198.51.100.199" -User "bruteforce-user" -Count 10
```

---

# Active Directory Batch Ingestion

Send the AD sample file:

```powershell
.\samples\send_batch.ps1 -Source ad -File samples\ad_logs.json -ApiKey "<TENANT_A_API_KEY>"
```

For tenantB:

```powershell
.\samples\send_batch.ps1 -Source ad -File samples\ad_logs.json -ApiKey "<TENANT_B_API_KEY>"
```

The application normalizes Windows authentication events such as:

```text
4625 -> LOGIN_FAILED
4624 -> LOGIN_SUCCESS
```

---

# AWS Batch Ingestion

Send the AWS sample file:

```powershell
.\samples\send_batch.ps1 -Source aws -File samples\aws_logs.json -ApiKey "<TENANT_A_API_KEY>"
```

The logs are passed through the AWS normalization path before being stored.

---

# Firewall Syslog Ingestion

Firewall events are transmitted using UDP Syslog.

The current demonstration uses:

```text
UDP port 5514
```

Start the Syslog receiver:

```bash
node --env-file=.env.local ingest/syslog-server.mjs
```

Expected output:

```text
Syslog UDP receiver listening on port 5514
```

In another PowerShell terminal, run:

```powershell
.\samples\send_syslog.ps1
```

The data flow is:

```text
send_syslog.ps1
       |
       v
UDP 5514
       |
       v
syslog-server.mjs
       |
       v
/api/ingest/syslog
       |
       v
Normalization
       |
       v
MongoDB
       |
       v
Logs Page
```

When the Next.js application is running through Docker, `npm run dev` is not required.

---

# Testing Tenant Isolation

Tenant isolation can be demonstrated by sending unique data into each tenant.

Example:

```text
Tenant B API Key
      |
      v
198.51.100.88
      |
      v
Saved as tenantB
```

Log in as a tenantB user and search for:

```text
198.51.100.88
```

The records should be visible.

Then log in as a tenantA user and search for the same source IP.

The tenantA account should not receive those tenantB records.

This demonstrates that tenant restrictions are enforced by backend queries.

---

# Testing Alerts

For a rule configured as:

```text
Event: LOGIN_FAILED
Threshold: 5
Time Window: 5 minutes
```

send five events from the same source IP:

```powershell
.\samples\send_api_logs.ps1 -ApiKey "<TENANT_B_API_KEY>" -Ip "198.51.100.88" -User "alert-test-user" -Count 5
```

Then open:

```text
/alerts
```

A matching alert should be generated.

For a rule configured as:

```text
Event: LOGIN_FAILED
Threshold: 10
Time Window: 10 minutes
```

run:

```powershell
.\samples\send_api_logs.ps1 -ApiKey "<TENANT_B_API_KEY>" -Ip "198.51.100.199" -User "bruteforce-user" -Count 10
```

Use a new source IP when testing a rule if an open alert already exists for another test IP.

---

# Security Design

The project applies several security controls.

## Password Security

Passwords are hashed using bcrypt before being stored.

## Authentication

Auth.js credentials authentication is used for application users.

## Authorization

ADMIN and VIEWER permissions are validated server-side.

## Tenant Isolation

Browser requests derive the tenant from the authenticated session.

External ingestion derives the tenant from API-key mapping.

## Input Validation

Zod schemas are used to validate incoming data.

## Secret Management

Secrets are stored in environment variables.

## Retention

MongoDB TTL indexing automatically removes expired log data.

## SaaS Transport Security

The SaaS version is intended to be served over HTTPS.

---

# Docker Troubleshooting

## Port 3000 Is Already in Use

If Docker reports:

```text
bind: Only one usage of each socket address is normally permitted
```

stop the local development server.

```text
Ctrl + C
```

Then run:

```bash
docker compose up -d
```

---

## Auth.js UntrustedHost

If the Docker logs contain:

```text
UntrustedHost: Host must be trusted
```

make sure `.env.local` contains:

```env
AUTH_TRUST_HOST=true
```

Then recreate the application container:

```bash
docker compose up -d --force-recreate app
```

---

## Check Application Logs

Run:

```bash
docker compose logs app --tail=100
```

---

## Check MongoDB Logs

Run:

```bash
docker compose logs mongo --tail=100
```

---

## Check Running Containers

Run:

```bash
docker compose ps
```

---

# Deployment Modes

The project is designed to support two deployment models.

## Appliance Mode

The appliance version runs on a single machine or virtual machine.

Current architecture:

```text
Host Machine / VM
       |
       v
Docker Compose
       |
       +------------------+
       |                  |
       v                  v
Next.js App            MongoDB
       |
       v
Syslog Receiver
```

The local appliance database is persisted using a Docker volume.

---

## SaaS / Cloud Mode

The SaaS version can use:

```text
Vercel
   |
   v
Next.js
   |
   v
MongoDB Atlas
```

The public cloud deployment should expose the browser application and HTTP ingestion endpoints through HTTPS.

UDP Syslog requires a persistent UDP listener and is therefore primarily demonstrated through the appliance deployment when using a serverless SaaS platform.

The SaaS deployment is configured separately from the local appliance database.

---

# Example Demonstration Workflow

A typical project demonstration can follow this sequence:

```text
1. Start the Docker appliance
2. Show the application login page
3. Login as tenantA Admin
4. Show the dashboard
5. Send HTTP API logs
6. Refresh the Logs page
7. Search for the newly ingested record
8. Send an AD batch
9. Show normalized AD records
10. Send an AWS batch
11. Show normalized AWS records
12. Send Firewall Syslog events
13. Show NETWORK_EVENT firewall logs
14. Trigger a failed-login threshold
15. Show the generated alert
16. Show Alert Rules as an Admin
17. Login as a Viewer
18. Demonstrate that Alert Rules are unavailable
19. Login as a different tenant
20. Demonstrate tenant data isolation
```

The terminal sender scripts can be copied from `samples/README.md` during the demonstration. The commands do not need to be memorized.

The important part is understanding the data flow:

```text
Source
  |
  v
Ingestion
  |
  v
Authentication / Tenant Mapping
  |
  v
Normalization
  |
  v
Storage
  |
  +----------+
  |          |
  v          v
Search     Alerts
  |
  v
Dashboard
```

---

# Development and Appliance Workflow

For normal coding and hot reload:

```bash
npm run dev
```

For appliance testing:

```bash
docker compose up -d
```

Do not normally run both simultaneously because both use port `3000`.

After changing application source files used inside the Docker image, rebuild with:

```bash
docker compose up -d --build
```

Environment-only changes may only require recreating the container:

```bash
docker compose up -d --force-recreate app
```

---

# Git and Secret Safety

Before pushing the repository, verify:

```bash
git status
```

Make sure the following are not committed:

```text
.env
.env.local
real API keys
real MongoDB credentials
real Auth.js secrets
plaintext passwords
```

Use placeholder values in:

```text
.env.example
README.md
samples/README.md
```

If a key has been publicly exposed, replace or rotate it before deployment.

---

# Current Implementation Status

Implemented:

- Next.js full-stack application
- MongoDB and Mongoose
- Auth.js credentials authentication
- ADMIN and VIEWER roles
- tenantA and tenantB isolation
- HTTP JSON ingestion
- Batch JSON ingestion
- UDP Syslog ingestion
- API source normalization
- AWS source normalization
- Active Directory normalization
- Firewall normalization
- Search and filtering
- Tenant-aware dashboard
- Alert-rule management
- Automatic alert generation
- Alert viewing
- Duplicate open-alert suppression
- Seven-day log retention
- Dockerfile
- Docker Compose
- Local MongoDB appliance
- Appliance seed script
- Sample PowerShell sender scripts

Remaining submission work may include:

- Final architecture documentation
- Appliance setup documentation
- SaaS setup documentation
- Dashboard source filtering
- Example automated tests
- Postman / Insomnia collection
- Public SaaS deployment
- Final production build verification
- Demo recording

---

# Documentation

Project documentation is stored under:

```text
docs/
```

Planned documentation:

```text
docs/architecture.md
docs/setup_appliance.md
docs/setup_saas.md
```

The architecture document will describe:

- Ingestion flow
- Normalization
- MongoDB design
- Tenant isolation
- RBAC
- Alert detection
- Appliance architecture
- SaaS architecture

---

# License

This project was created for technical assessment, learning, and demonstration purposes.