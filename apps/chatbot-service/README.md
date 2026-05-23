# Chatbot Service

This microservice handles the automated interactive chat capability, flow engine, and integration with Generative AI (LLMs) for conversational automation.

## Features

- **Generative AI Gateway:** Unified integration with LLMs (e.g. OpenAI GPT-4o) with safety moderations and structured prompt builders.
- **Workflow / Flow Engine:** Executes conversational workflows and dialogue scripts.
- **Session & Memory Management:** Context retention and message history tracking.
- **Escalation Rules:** Intelligently redirects users to human agents based on sentiment or intent analysis.
- **Prisma ORM Integration:** Access to Postgres data layer for auditing, active sessions, and logs.

## Setup and Commands

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local database migrations:**
   ```bash
   npm run prisma:migrate
   ```

3. **Seed database:**
   ```bash
   npm run prisma:seed
   ```

4. **Start local development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
