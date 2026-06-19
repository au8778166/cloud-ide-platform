# ☁️ Cloud IDE — Online Code Execution Platform

> **Write, run, and manage code directly from your browser — no setup required.**

A full-stack, cloud-based IDE built on a **microservices architecture** that lets developers write and execute code in isolated Docker containers, manage multi-file projects, and authenticate securely — all from a responsive browser-based interface.

---

## ✨ Features

- **Multi-language code execution** — supports C, C++, Python, and JavaScript
- **Monaco Editor** — VS Code-grade editing experience with syntax highlighting
- **Multi-file project support** — file explorer, tab-based editor, and persistent storage
- **Secure sandboxed execution** — Docker containers + Node.js child processes isolate every run
- **JWT authentication** — user registration, login, and protected API access
- **Microservices backend** — API Gateway, Auth Service, Project Service, Execution Service, Worker Service
- **Responsive UI** — built with React + Tailwind CSS, works on any screen size

---

## 🏗️ Architecture

```
                    ┌──────────────────┐
                    │     Frontend     │
                    │  React + Vite    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  API Gateway   │
                    └───────┬────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
┌────────────────┐ ┌─────────────────┐ ┌───────────────────┐
│  Auth Service  │ │ Project Service │ │ Execution Service │
│  (PostgreSQL)  │ │   (MongoDB)     │ │     (Redis)       │
└────────────────┘ └─────────────────┘ └────────┬──────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │  Worker Service │
                                        │  (Docker Run)   │
                                        └─────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Purpose                     |
|------------------|-----------------------------|
| React.js         | UI framework                |
| Vite             | Build tool                  |
| Tailwind CSS     | Styling                     |
| Monaco Editor    | Code editor                 |
| React Router     | Client-side routing         |
| Axios            | HTTP client                 |
| React Hot Toast  | Notifications               |

### Backend Services

| Service            | Responsibility                          |
|--------------------|-----------------------------------------|
| API Gateway        | Request routing & forwarding            |
| Auth Service       | User registration, login, JWT           |
| Project Service    | Project & file CRUD                     |
| Execution Service  | Job dispatch & queue management         |
| Worker Service     | Compile & execute code inside Docker    |

### Infrastructure

| Technology      | Purpose                          |
|-----------------|----------------------------------|
| Docker          | Isolated code execution          |
| Kubernetes      | Service orchestration            |
| PostgreSQL      | User & project metadata          |
| MongoDB         | File content & project storage   |
| Redis           | Caching & execution job queues   |
| GitHub Actions  | CI/CD                            |

---

## 🚀 Supported Languages

| Language   | Extension |
|------------|-----------|
| C          | `.c`      |
| C++        | `.cpp`    |
| Python     | `.py`     |
| JavaScript | `.js`     |

---

## 📂 Project Structure

```
cloud-ide-platform/
├── apps/
│   ├── frontend/          # React + Vite SPA
│   ├── api-gateway/       # Entry point for all requests
│   ├── auth-service/      # JWT auth, user management
│   ├── project-service/   # Project & file management
│   ├── execution-service/ # Execution job dispatcher
│   └── worker-service/    # Docker-based code runner
├── packages/
│   ├── shared-types/      # Common TypeScript types
│   ├── ui/                # Shared UI components
│   └── utils/             # Shared utilities
├── infrastructure/
│   ├── docker/
│   ├── kubernetes/
│   └── nginx/
├── .github/workflows/     # CI/CD pipelines
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- pnpm
- Docker
- PostgreSQL
- MongoDB
- Redis

### 1. Clone the Repository

```bash
git clone https://github.com/au8778166/cloud-ide-platform.git
cd cloud-ide-platform
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

**Auth Service** (`.env` in `apps/auth-service/`):
```env
PORT=5001
JWT_SECRET=your_jwt_secret
POSTGRES_URL=your_postgres_connection_url
```

**Project Service** (`.env` in `apps/project-service/`):
```env
PORT=5002
MONGO_URI=your_mongodb_uri
```

**Execution Service** (`.env` in `apps/execution-service/`):
```env
PORT=5004
REDIS_URL=redis://localhost:6379
```

**API Gateway** (`.env` in `apps/api-gateway/`):
```env
PORT=5000
```

### 4. Run All Services

```bash
pnpm dev
```

Or start services individually:

```bash
cd apps/api-gateway && pnpm dev
cd apps/auth-service && pnpm dev
cd apps/project-service && pnpm dev
cd apps/execution-service && pnpm dev
cd apps/worker-service && pnpm dev
cd apps/frontend && pnpm dev
```

---

## 🔌 API Endpoints

### Authentication

```
POST  /api/auth/register   # Register new user
POST  /api/auth/login      # Login and receive JWT
GET   /api/auth/me         # Get current user
```

### Projects

```
POST   /api/projects        # Create project
GET    /api/projects        # List all projects
GET    /api/projects/:id    # Get project by ID
PUT    /api/projects/:id    # Update project
DELETE /api/projects/:id    # Delete project
```

### Code Execution

```
POST /api/execute
```

**Request body:**
```json
{
  "language": "cpp",
  "code": "#include<iostream>\nusing namespace std;\nint main(){ cout << \"Hello, World!\"; }"
}
```

---

## 🔒 Security

- JWT-based stateless authentication
- Docker container isolation per code execution
- API Gateway as single entry point
- Service-level auth middleware
- Input validation on all endpoints
- Sandboxed execution environment prevents host system access

---

## 📈 Roadmap

- [ ] Real-time collaborative editing
- [ ] Integrated terminal emulator
- [ ] Git integration
- [ ] AI-assisted code completion
- [ ] Shareable code links
- [ ] Interview / competitive programming mode
- [ ] Support for more languages

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📜 License

Distributed under the **MIT License**.

---

> ⭐ If you find this project useful, give it a star on GitHub!