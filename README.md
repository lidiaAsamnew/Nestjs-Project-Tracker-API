# Week 3 Project Tracker API

A backend REST API built with **NestJS** to demonstrate:

- **M1 Foundations**: DNS/TCP/IP basics, HTTP methods/status/headers, client–server model
- **M2 NestJS Basics**: NestJS philosophy + CLI + project structure
- **Build deliverable**: scaffold a NestJS app, generate `ProjectsModule/Controller/Service`, and test the server using `curl`

---

## Tech Stack

- **Backend:** NestJS (Node.js + TypeScript)
- **Testing:** Jest (unit + e2e) + `curl` (manual)
- **Package Manager:** npm
- **Architecture:** Modular, feature-based

---

## Getting Started

### 1) (Optional) Install NestJS CLI

```bash
npm i -g @nestjs/cli
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run the server

```bash
npm run start:dev
```

Server runs at `http://localhost:3000`

---

## Project Structure

```txt
week-3-task/
│
├── src/
│   ├── main.ts                    # Entry point - starts NestJS
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts          # Default controller for GET /
│   ├── app.service.ts             # Default service logic
│   ├── app.controller.spec.ts     # Unit test for AppController
│   │
│   ├── projects/                  # Projects feature (CRUD, in-memory)
│   │   ├── projects.controller.ts # /projects routes
│   │   ├── projects.service.ts    # Business logic + in-memory storage
│   │   └── projects.module.ts     # Module connecting controller & service
│   │
├── test/
│   ├── app.e2e-spec.ts            # End-to-end test file
│   └── jest-e2e.json              # Jest config for e2e testing
│
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

---

## M1 Foundations (notes)

### DNS/TCP/IP basics (how your request reaches NestJS)

- **DNS** resolves a hostname (example: `example.com`) → an IP address.
- **IP** routes packets between machines.
- **TCP** establishes a reliable connection (3-way handshake).
- **HTTP** runs on top of TCP and defines methods, status codes, headers, and bodies.

### HTTP basics used in this API

- **Methods**: `GET`, `POST`, `PATCH`, `DELETE`
- **Common status codes**: `200`, `201`, `400`, `401`, `404`
- **Important headers**:
  - `Content-Type: application/json`

---

## M2 Core Backend – NestJS REST APIs

### Overview

This project demonstrates the core backend architecture of NestJS:

- Controllers and decorators (`@Controller`, `@Get`, `@Post`, `@Patch`, `@Delete`)
- Services and providers (Dependency Injection)
- Modules
- CRUD patterns
- Separation of concerns (controller calls service; service contains business logic)

### Features implemented

- **Projects CRUD endpoints** using **in-memory storage** (`src/projects/*`)
- **Business logic handled inside services**

---

## API Endpoints

### Projects

- `GET /projects` (optional query: `?status=PLANNED|ACTIVE|DONE`)
- `GET /projects/:id`
- `POST /projects`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

---

## Manual API testing with curl

### 1) Base route

```bash
curl -i http://localhost:3000/
```

### 2) Projects routes (examples)

```bash
curl -s http://localhost:3000/projects
```

```bash
curl -s -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Demo Project","description":"Created with curl","status":"PLANNED"}'
```

---

## Tests

```bash
npm test
npm run test:e2e
```

