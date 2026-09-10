# SaaS Deployment Setup

## Overview

The SaaS version of the Log Management System can be deployed using Vercel for the Next.js application and MongoDB Atlas for persistent database storage.

The deployment provides HTTPS access to the web application and HTTP-based log ingestion APIs.

## Architecture

```text
External Sources
       |
       | HTTP / JSON
       v
    Vercel
       |
    Next.js
       |
       v
MongoDB Atlas