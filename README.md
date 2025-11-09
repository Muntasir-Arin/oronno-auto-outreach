# Oronno: AI-Powered Post-Purchase Feedback Collection System

## Overview

Oronno is an AI-powered post-purchase feedback collection system that uses Gemini Live API for natural voice conversations and personalized email outreach, targeting 30-40% response rates compared to traditional 3-8%.

## Architecture

### Core Architecture Pattern
- **Microservices Architecture** with Domain-Driven Design
- **Event-Driven Communication** via Apache Kafka
- **API Gateway Pattern** for unified entry point
- **CQRS Pattern** for read/write optimization
- **Saga Pattern** for distributed transactions

### Technology Stack

**Languages & Frameworks:**
- Java 23 with Spring Boot 3.5.5 (80% of services)
- Golang (WebSocket Gateway Service for real-time audio streaming)
- Python FastAPI (Context Enrichment Service for vector operations)
- Next.js/React (Portal - Web admin dashboard)

**Infrastructure:**
- **Message Broker**: Apache Kafka
- **Service Discovery**: Spring Cloud Netflix Eureka
- **API Gateway**: Spring Cloud Gateway
- **Databases**: 
  - PostgreSQL (Transactional data)
  - Cassandra (High-volume, time-series data)
  - Weaviate (Vector DB for semantic search)
  - Elasticsearch (Logs & Search)
- **Cache**: Redis (with Bloom Filter for DNC list)
- **Container Orchestration**: Kubernetes

## Microservices

### Edge Services
- **API Gateway Service**: Single entry point, routing, authentication, rate limiting
- **WebSocket Gateway Service** (Golang): Real-time voice streaming, low-latency audio handling
- **Portal** (Next.js/React): Web-based admin dashboard and user interface

### Core Business Services
- **User Management Service**: Authentication, authorization, RBAC, multi-tenant support
- **Campaign Management Service**: Campaign creation, template management, scheduling
- **Customer Data Service**: Customer profiles, purchase history, preferences
- **Bulk Import Service**: CSV/Excel processing, batch processing, validation

### AI & Communication Services
- **Voice Orchestration Service**: Gemini Live API integration, call flow management
- **Email Orchestration Service**: Email personalization, send time optimization
- **Context Enrichment Service** (Python): Vector DB operations, semantic search, RAG
- **Conversation Intelligence Service**: Transcription, sentiment analysis, intent detection

### Analytics & Support Services
- **Analytics Service**: Real-time metrics, campaign performance tracking
- **Feedback Processing Service**: Feedback categorization, sentiment scoring
- **Notification Service**: Multi-channel notifications (Email, SMS, Webhook)
- **Scheduler Service**: Cron job management, campaign scheduling, DNC sync
- **DNC List Service**: DNC list management, Redis Bloom Filter integration
- **Audit & Compliance Service**: Activity logging, compliance checking (GDPR, DNC)

### Migration Services
- **Cassandra Migration Service**: Automated Cassandra schema migrations
- **Postgres Migration Service**: Flyway-based PostgreSQL migrations

## Data Architecture

### Database Strategy
- **PostgreSQL**: Transactional data (users, campaigns, customers, DNC list)
- **Cassandra**: High-volume time-series data (call transcripts, email logs, event logs)
- **Weaviate**: Vector embeddings for semantic search and RAG
- **Elasticsearch**: Application logs, audit trails, full-text search
- **Redis**: Caching, session management, rate limiting, Bloom Filter for DNC

## Key Features

### Voice Call Flow
- Pre-call DNC validation using Redis Bloom Filter
- Customer context enrichment via Weaviate vector search
- Real-time audio streaming with Gemini Live API
- Low-latency audio conversion (8kHz ↔ 16kHz ↔ 24kHz)

### DNC List Management
- Automatic synchronization with national DNC registry
- Redis Bloom Filter for sub-millisecond phone number lookups
- PostgreSQL for authoritative storage and audit trail
- Pre-call validation to block DNC violations

### Event-Driven Architecture
- Kafka topics for business events, communication events, compliance events
- Event sourcing for audit trail
- Choreography and orchestration patterns

## Project Structure

```
oronno/
├── applications/          # Microservices
│   ├── GatewayService/
│   ├── UserManagementService/
│   ├── VoiceOrchestrationService/
│   ├── EmailOrchestrationService/
│   ├── CampaignManagementService/
│   ├── CustomerDataService/
│   ├── BulkImportService/
│   ├── ConversationIntelligenceService/
│   ├── AnalyticsService/
│   ├── FeedbackProcessingService/
│   ├── NotificationService/
│   ├── SchedulerService/
│   ├── DNCListService/
│   ├── AuditComplianceService/
│   ├── WebSocketGatewayService/  # Golang
│   ├── Portal/                   # Next.js/React
│   ├── CassandraMigrationService/
│   └── PostgresMigrationService/
├── modules/              # Shared modules
│   ├── config/
│   ├── datamodel/
│   ├── persistent/
│   ├── database-config/
│   ├── redis-config/
│   └── audio-conversion/
├── deployment/
│   └── infra/           # Infrastructure docker-compose
├── documentation/       # System design and architecture docs
│   ├── oronno-system-design.md
│   └── oronno-architecture-diagrams.md
└── build.gradle
```

## Quick Start

### Prerequisites
- Java 23
- Docker & Docker Compose
- Gradle 8+

### Infrastructure Setup

1. Start infrastructure services:
```bash
cd deployment/infra
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- Cassandra (port 9042)
- Redis (port 6379)
- Zookeeper (port 2181)
- Kafka (port 9092)

### Database Migrations

1. Run PostgreSQL migrations:
```bash
./gradlew :applications:PostgresMigrationService:bootRun
```

2. Run Cassandra migrations:
```bash
./gradlew :applications:CassandraMigrationService:bootRun
```

### Running Services

Build all services:
```bash
./gradlew build
```

Run individual services:
```bash
./gradlew :applications:GatewayService:bootRun
./gradlew :applications:UserManagementService:bootRun
# ... etc
```

## Configuration

Services use Spring Boot configuration with profiles:
- `application.yml`: Base configuration
- Environment variables for sensitive data
- Service-specific configurations in respective `application.yml` files

## Performance Targets

- **API Response Time**: < 100ms (p95)
- **Voice Latency**: < 600ms first response
- **Throughput**: 10,000 concurrent calls
- **Message Processing**: 100,000 events/second
- **Uptime**: 99.99% availability

## Success Metrics

- **Response Rate**: 30-40% (vs 3-8% traditional)
- **Cost per Interaction**: < $0.75 (70% reduction)
- **Customer Satisfaction**: > 85%

## Documentation

- **System Design**: See `documentation/oronno-system-design.md` for detailed architecture
- **Architecture Diagrams**: See `documentation/oronno-architecture-diagrams.md` for visual representations


