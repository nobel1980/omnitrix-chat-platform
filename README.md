# Omnichannel Communication Platform

An enterprise-grade omnichannel communication platform built using a microservices architecture. This monorepo manages all core services, shared libraries, and deployment configurations.

## Architecture & Project Structure

The project is structured as a monorepo using npm workspaces:

```
omnichannel/
├── .github/                       # CI/CD Workflows per service
│   └── workflows/
├── apps/                          # THE 10 MICROSERVICES
│   ├── ai-service/                # AI and NLP capabilities, intent classification, sentiment analysis
│   ├── analytics-service/         # Real-time analytics, reporting, and metrics aggregation
│   ├── agent-service/             # Agent workspace, presence, routing, and ticket management
│   ├── audit-service/             # Centralized compliance, security logs, and transaction auditing
│   ├── auth-service/              # Identity provider, SSO, JWT generation and session management
│   ├── chatbot-service/           # Interactive automated chat handlers, flow engine
│   ├── conversation-service/      # Message routing, chat session orchestration, history retention
│   ├── gateway-service/           # API Gateway, rate limiting, request routing, and SSL termination
│   ├── media-service/             # Asset storage, image resizing, attachment processing
│   └── notification-service/      # SMS, Email, Push notifications and webhook dispatchers
├── libs/                          # SHARED REUSABLE PACKAGES
│   ├── shared-schemas/            # Unified Message Schema definitions (JSON schemas & types)
│   ├── shared-auth/               # Shared authentication and authorization middleware
│   └── shared-logger/             # Standardized Winston/Zap logger configuration
└── deployments/                   # INFRASTRUCTURE AS CODE
    ├── docker-compose.yml         # Local multi-service development setup
    ├── k8s/                       # Production Kubernetes manifests
    └── terraform/                 # Multi-cloud provisioning definitions (S3, Redis, DBs)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & Docker Compose
- [npm](https://www.npmjs.com/) (v9+)

### Installation

Install all dependencies across the monorepo:

```bash
npm install
```

### Local Development

To spin up all external dependencies (databases, brokers, cache) and services locally:

```bash
docker-compose -f deployments/docker-compose.yml up -d
npm run dev
```

## Key Technologies

- **Backend Logic:** Node.js, Express, Fastify, TypeScript
- **Databases & Caches:** PostgreSQL, MongoDB, Redis
- **Message Broker:** RabbitMQ / Apache Kafka
- **Infrastructure:** Docker, Kubernetes, Terraform, GitHub Actions
# omnitrix-chat-platform
