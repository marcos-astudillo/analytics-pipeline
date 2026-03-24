# Analytics Pipeline Service

![Node](https://img.shields.io/badge/node.js-backend-green)
![TypeScript](https://img.shields.io/badge/typescript-enabled-blue)
![Docker](https://img.shields.io/badge/docker-containerized-blue)
![Redis](https://img.shields.io/badge/cache-redis-red)
![PostgreSQL](https://img.shields.io/badge/database-postgresql-blue)
![License](https://img.shields.io/github/license/marcos-astudillo/analitics-pipeline)
![API Status](https://img.shields.io/badge/API-live-success)

Production-ready analytics backend built with **Node.js**, **TypeScript**, **Express**, **PostgreSQL**, **Redis**, and **Prisma**.

This project is designed as a **backend engineering portfolio project** demonstrating scalable distributed system patterns.

## Overview

Analytics Pipeline Service provides:

- Event ingestion from multiple producers (web, mobile, backend)
- Event validation and enrichment
- Raw event storage (immutable)
- Aggregated daily metrics
- Redis-based event queue
- Asynchronous event processing worker
- Dockerized local development and deployment
- GitHub Actions CI pipeline
- Railway deployment
- OpenAPI documentation with Swagger UI

---

## Live API

This service is deployed on Railway and exposes public documentation and health monitoring endpoints.

[![Swagger UI](https://img.shields.io/badge/Swagger-UI-85EA2D?style=for-the-badge&logo=swagger)](http://localhost:3000/api-docs)
[![Health Check](https://img.shields.io/badge/Health-Check-success?style=for-the-badge&logo=railway)](http://localhost:3000/health)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-JSON-blue?style=for-the-badge&logo=openapiinitiative)](http://localhost:3000/openapi.json)

---

## Swagger Screenshots

### GET /v1/metrics
![Swagger GET](docs/images/swagger-ui-Get1.png)

### POST /v1/events
![Swagger POST 1](docs/images/swagger-ui-Post1.png)
![Swagger POST 2](docs/images/swagger-ui-Post2.png)

### Railway Deployment
![Railway](docs/images/railway.png)

### Swagger UI Overview
![Swagger UI](docs/images/swagger-ui.png)

---

# System Design Reference

This implementation follows the analytics pipeline architecture described in the system design repository:

https://github.com/marcos-astudillo/system-design-notes

The goal is to demonstrate how a **system design document can be translated into a production-style backend implementation**.

---

## Architecture

At a high level, the system works like this:

1. Producers send events via `/v1/events` API.
2. API validates and enqueues events into Redis.
3. Worker consumes events asynchronously.
4. Worker updates aggregated daily metrics in PostgreSQL.
5. Metrics can be queried via `/v1/metrics` API.
6. Raw events remain stored for replay and analytics.

### High-level flow

```text
Producers (web, mobile, backend)
        |
        v
Express API
  |-----------------------> PostgreSQL (aggDailyMetrics)
  |
  |-----------------------> Redis (event queue)
  |
  '-- Worker consumes queue --> updates aggregates --> PostgreSQL
```

## Tech Stack
 - Runtime: Node.js
 - Language: TypeScript
 - Framework: Express
 - ORM: Prisma
 - Database: PostgreSQL
 - Cache / Queue: Redis
 - Background Jobs: Node worker
 - Testing: Vitest + Supertest
 - Containerization: Docker + Docker Compose
 - CI: GitHub Actions
 - Deployment: Railway

 ---

## Project Structure

```text
analytics-pipeline/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── app.ts
│   ├── server.ts
│   └── worker/event.processor.ts
├── prisma/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docker/
│   ├── api/
│   └── worker/
├── .github/workflows/
├── docker-compose.yml
├── package.json
└── README.md
``` 

## Main Features
### 1. Event ingestion

Accepts events from multiple producers via API.

#### Endpoint
```text
POST /v1/events
```

#### Request body
```text
{
  "event_id": "550e8400-e29b-41d4-a716-446655440000",
  "type": "page_view",
  "user_id": "u_1",
  "ts": "2026-03-04T12:00:00Z",
  "props": { "path": "/home" }
}
```

#### Response
```text
{
  "status": "accepted"
}
```

### 2. Daily metrics aggregation

Events are processed asynchronously by a worker to update aggregated daily metrics in PostgreSQL.

#### Endpoint
```text
GET /v1/metrics?date=2026-03-04
```

#### Response
```text
{
  "date": "2026-03-04",
  "metrics": [
    { "type": "page_view", "value": 123 },
    { "type": "click_button", "value": 45 }
  ]
}
```

### 3. Event Queue (Redis)
 - Queue stores incoming events for asynchronous processing.
 - Supports durability and retry logic.
 - Ensures no event is lost if worker crashes.

### 4. Validation & Enrichment
 - Validates event schema using Zod.
 - Optional enrichment (device, geo, etc.).
 - Invalid events are rejected with proper HTTP response.

### 5. Health Checks
#### Endpoint
```text
Get /health
```

#### Response
```text
{
  "status": "ok",
  "service": "analytics-pipeline",
  "checks": {
    "database": "up",
    "redis": "up"
  }
}
```
### 6. Production-ready features
 - Feature flags for optional behaviors
 - Async event processing
 - Graceful shutdown for API and worker
 - Dockerized services
 - GitHub Actions CI workflow
 - OpenAPI / Swagger documentation
 - Metrics and retry durability tests

 ---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables
Create a .env file based on .env.example with your local configuration.
```env
NODE_ENV=development
PORT=3000
BASE_URL=http://127.0.0.1:3000
LOG_LEVEL=info

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/analytics
REDIS_URL=redis://localhost:6379

FEATURE_ANALYTICS=true
RATE_LIMIT_ENABLED=true
```

### 3. Start Infrastructure
```bash
docker compose up -d postgres redis
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 5. Run API
```bash
npm run dev
```

### 6. Run Worker
```bash
npm run worker:dev
```

### 7. Open Swagger UI
```bash
http://127.0.0.1:3000/docs
```

---

## Docker
Build and run full stack
```bash
docker compose up --build
```

This start:
 - API
 - Worker
 - PostgreSQL
 - Redis

## Useful commands
```bash
docker compose down
npm run build
npm run typecheck
```

---

## Testing

### Unit tests
```bash
npm run test:unit
```

### Integration tests
Requires PostgreSQL and Redis:
```bash
docker compose up -d postgres redis
npm run test:integration
```

### End-to-end tests
Requires PostgreSQL, Redis, and the worker:
```bash
docker compose up -d postgres redis
npm run worker:dev
npm run test:e2e
```

### Full test suite
```bash
npm run test:run
```

---

## CI (GitHub Actions)

GitHub Actions runs:
 - dependency installation
 - Prisma client generation
 - migrations
 - typecheck
 - unit tests
 - integration tests

Workflow file:
```text
.github/workflows/ci.yml
```

---

## Deployment Notes

This project is designed to deploy cleanly on Railway using four services in the same project:

- API
- Worker
- PostgreSQL
- Redis

### API service

- Public domain enabled
- Dockerfile path: `docker/api/Dockerfile`
- Start command:

```bash
sh -c "npx prisma migrate deploy && node dist/server.js"
```

Worker service
 - No public domain required
 - Dockerfile path: docker/worker/Dockerfile
 - Start command:

```bash
sh -c "npx prisma migrate deploy && node dist/worker/event.processor.js"
```

## Scalability Considerations

This project intentionally includes several production-oriented backend patterns:
 - Async event processing keeps API latency low.
 - Redis queue ensures durability and retry logic for events.
 - Separation of API and Worker isolates background jobs from request path.
 - Feature flags make behavior configurable without code changes.
 - Graceful shutdown improves deploy safety and service reliability.
 - Dockerized services provide consistent local and cloud execution.
 - Typed schemas and CI improve maintainability and correctness.
 - Metrics routes allow monitoring for dashboards or observability.

---

Connect With Me
<p align="center">
    <a href="https://www.marcosastudillo.com">
        <img src="https://img.shields.io/badge/Website-marcosastudillo.com-blueviolet?style=for-the-badge&logo=google-chrome" /> 
    </a>
    <a href="https://www.linkedin.com/in/marcos-astudillo-c/">
        <img src="https://img.shields.io/badge/LinkedIn-Marcos%20Astudillo-blue?style=for-the-badge&logo=linkedin" />
    </a>
    <a href="https://github.com/marcos-astudillo/analitics-pipeline">
        <img src="https://img.shields.io/badge/GitHub-Marcos%20Astudillo-181717?style=for-the-badge&logo=github&logoColor=white" />
    </a>
    <a href="mailto:m.astudillo1986@gmail.com">
        <img src="https://img.shields.io/badge/Email-m.astudillo1986%40gmail.com-red?style=for-the-badge&logo=gmail" />
    </a>
</p>
