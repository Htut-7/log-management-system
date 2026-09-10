# System Architecture

## Overview

The Log Management System is a multi-tenant security log management platform that collects logs from multiple sources, normalizes them into a common schema, stores them in MongoDB, provides search and dashboard analytics, and generates alerts based on configurable detection rules.

## Architecture Flow

```mermaid
flowchart TD
    A[External Log Sources] --> B[Ingestion Layer]

    A1[HTTP API] --> B
    A2[AWS Logs] --> B
    A3[Active Directory Logs] --> B
    A4[Firewall Syslog] --> B

    B --> C[API Key Validation]
    C --> D[Tenant Mapping]
    D --> E[Normalization]
    E --> F[MongoDB]

    F --> G[Log Search]
    F --> H[Dashboard Analytics]
    F --> I[Alert Detection]

    I --> J[Alerts]
    J --> K[Alerts UI]

    L[Authenticated User] --> M[Auth.js]
    M --> N[Role and Tenant Authorization]
    N --> G
    N --> H
    N --> K