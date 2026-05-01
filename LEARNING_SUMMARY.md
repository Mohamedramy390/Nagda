# 📚 What You Should Learn from the Nagda Project

> **Nagda** is a full-stack IT helpdesk ticketing system.
> This document summarizes every concept, pattern, and technology you have used so far in this project.

---

## 🏗️ 1. Project Architecture — The Big Picture

You are building a **monorepo** with two independent applications:

| Part | Technology | Port |
|------|-----------|------|
| `server/` | NestJS (Node.js backend) | `3200` |
| `client/` | Next.js 15 (React frontend) | `3000` |

They communicate over **HTTP REST** — the frontend calls the backend's API endpoints.

```
Browser  →  Next.js (client)  →  NestJS (server)  →  PostgreSQL (database)
```

**Key takeaway:** Learn why we separate frontend and backend, and how they talk to each other via HTTP.

---

## 🗄️ 2. Database — PostgreSQL + Prisma ORM

### What is Prisma?
Prisma is an ORM (Object-Relational Mapper). Instead of writing raw SQL, you write a **schema** and Prisma generates a type-safe client.

### Your Schema (`schema.prisma`)
You defined **3 models** with relationships:

```
User  ──< Ticket (as requester)
User  ──< Ticket (as agent)
Ticket ──< Message
```

### Concepts to Learn:
- **Enums** — `TicketStatus` (OPEN, IN_PROGRESS, CLOSED) and `TicketPriority` (LOW, MEDIUM, HIGH)
- **Relations** — One-to-many (one user has many tickets), named relations (`RequesterRelation`, `AgentRelation`)
- **Auto-generated fields** — `@id @default(uuid())`, `@default(now())`, `@updatedAt`, `@default(autoincrement())`
- **`prisma.ticket.create()`** — how to insert a record
- **`prisma.ticket.findUnique({ include: {} })`** — how to fetch a record with related data (JOIN)
- **`prisma.ticket.count()`** — how to count records with a filter
- **Migrations** — `prisma migrate dev` generates SQL and applies it to the database

---

## 🚀 3. Backend — NestJS

NestJS is an opinionated Node.js framework built on top of Express. It uses **TypeScript** and **decorators** heavily.

### Core NestJS Concepts You Used

#### a) Modules
Every feature is a **Module** — a container that groups related code.

```
AppModule
  ├── AuthModule
  ├── UsersModule
  ├── TicketsModule
  ├── DashboardModule
  └── PrismaModule
```

Learn: `@Module({ imports, controllers, providers })` and why modules help organize large applications.

#### b) Controllers → Routes
Controllers define **HTTP routes** using decorators:

```typescript
@Controller('tickets')
class TicketsController {
  @Get()          // GET /tickets
  @Get(':id')     // GET /tickets/:id
  @Post()         // POST /tickets
  @Patch(':id')   // PATCH /tickets/:id
  @Delete(':id')  // DELETE /tickets/:id
}
```

Learn: REST conventions (GET = read, POST = create, PATCH = update, DELETE = delete).

#### c) Services → Business Logic
Services contain the actual logic. Controllers just call services.

```typescript
// Controller delegates work to service:
@Get(':id')
getTicketDetails(@Param('id') id: string) {
  return this.ticketsService.getTicketDetails(id); // ← service does the work
}
```

Learn: **Separation of concerns** — why you don't write database calls directly inside controllers.

#### d) Dependency Injection
NestJS **automatically provides** services to classes that declare them in constructors:

```typescript
constructor(private readonly prisma: PrismaService) {}
```

You don't call `new PrismaService()`. NestJS handles it. This makes code **testable** and **decoupled**.

#### e) DTOs (Data Transfer Objects)
DTOs define the **shape of incoming request data**. You used them for validation:

```typescript
// CreateTicketDto validates the body of POST /tickets
class CreateTicketDto {
  subject: string;
  priority: TicketPriority;
  // ...
}
```

Learn: Why validating input data protects your API from bad requests.

---

## 🔐 4. Authentication — JWT + Bcrypt + Passport

This is one of the most important concepts in the project.

### The Full Auth Flow:

```
1. User sends email + password to POST /auth/login
2. Server checks password using bcrypt.compare()
3. If valid → server creates a JWT token (signed with a secret)
4. Token returned to frontend → stored in HTTP-only cookie
5. For protected routes, frontend sends token in Authorization header
6. JwtAuthGuard validates the token on each request
```

### Concepts to Learn:

- **bcrypt** — one-way password hashing. You can NEVER recover the original password. `bcrypt.hash()` to store, `bcrypt.compare()` to verify.
- **JWT (JSON Web Token)** — a signed, encoded token containing a **payload** (`{ sub: userId, email, role }`). Anyone can read it, but only the server can verify it was not tampered with.
- **HTTP-only Cookies** — storing the JWT in a cookie that JavaScript cannot access, protecting against **XSS attacks**.
- **Guards** — `@UseGuards(JwtAuthGuard)` blocks any request that doesn't have a valid JWT.
- **Passport Strategy** — `JwtStrategy` tells Passport how to extract and validate the JWT from incoming requests.
- **`verifySession`** — your endpoint that validates a token AND fetches the current user from the database.

---

## ⚡ 5. Frontend — Next.js 15

Next.js is a React framework that adds routing, server components, and server actions.

### Key Concepts You Used

#### a) App Router & Route Groups
You used **route groups** `(auth)` and `(requester)` — parentheses mean they don't affect the URL, just organize code.

```
app/
  (auth)/login/        → /login
  (requester)/portal/
    (dashboard)/       → /portal/dashboard
    ticket/[id]/       → /portal/ticket/abc-123
```

Learn: Dynamic routes `[id]` and how `params` is a **Promise** in Next.js 15.

#### b) Server Components vs Client Components

| | Server Component | Client Component |
|---|---|---|
| Directive | (none, default) | `'use client'` at top |
| Can fetch data | ✅ directly | ✅ via useEffect/fetch |
| Can use hooks | ❌ | ✅ |
| Sent to browser | HTML only | JS bundle |

**Your pattern:** Pages are Server Components that fetch data, then pass it as props to Client Components.

#### c) Server Actions (`'use server'`)
Files/functions marked `'use server'` run on the Node.js server, never in the browser. You used them to:
- Read cookies securely (`cookies()` from `next/headers`)
- Call the NestJS backend with the token
- Set/delete the auth cookie after login/logout

```typescript
// lib/api/actions/auth.ts
'use server'
export async function loginAction(email, password) {
  const response = await fetch('http://localhost:3200/auth/login', ...);
  (await cookies()).set('token', data.token, { httpOnly: true });
}
```

#### d) Middleware
`middleware.ts` runs **before every request**. You used it to protect routes:

```
User visits /portal → no token → redirect to /login
User visits /login  → has token → redirect to /portal/dashboard
```

Learn: How to read cookies in middleware and implement route guards on the client side.

#### e) TypeScript Interfaces & Types
You defined types in `lib/types/` for:
- `User` — the logged-in user shape
- `TicketData` — a ticket from the API
- `MessageData` — a chat message
- `AuthContextType` — the shape of the auth context

---

## 🧠 6. State Management — React Context

You created a global `AuthContext` to share user authentication state across all pages:

```typescript
// context/AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // login(), logout(), verifySession() methods
  return <AuthContext.Provider value={...}>{children}</AuthContext.Provider>
};

// Usage anywhere in the app:
const { user, login, logout } = useAuth();
```

### Concepts to Learn:
- `createContext` / `useContext` — how to share state without prop drilling
- `useState` + `useEffect` — for session verification on app load
- Custom hooks (`useAuth`) — wrapping `useContext` for better DX and error handling

---

## 🧩 7. Component Architecture

You built a rich component library organized by concern:

```
components/
  shared/
    header/            — top navigation
    sidebar/           — portal navigation
    ticket/
      CreateTicketForm — form with state, validation, API call
      TicketRow        — single row in a list
      TicketStatus     — colored badge
      TicketPriority   — colored badge
      TicketsTable     — full table layout
      TicketTabs       — filter tabs
    ticket-details/
      TicketHeader     — ticket title & status bar
      chat/
        ChatContainer  — manages message state
        MessageList    — renders all messages
        MessageBubble  — single message UI
        ReplyEditor    — text input with send action
      sidebar/
        TicketSidebar      — container
        TicketProperties   — status/priority/category fields
        RequesterInfo      — who submitted the ticket
        SLATimer           — countdown timer
        RecentTickets      — related tickets list
```

### Key Pattern: Container → Presentational
`ChatContainer` holds state (`useState`) and passes data down to `MessageList` (dumb, just renders).

---

## 🔄 8. Data Flow Patterns

### Pattern 1: Server Component Data Fetching
```
Page (Server Component)
  → getTicket(id)  [server action calls NestJS]
  → passes data as props to Client Components
```

### Pattern 2: Client-side Form Submission
```
CreateTicketForm (Client Component)
  → user fills form → handleSubmit()
  → calls createTicket() [server action]
  → server action calls POST /tickets on NestJS
  → NestJS saves to PostgreSQL via Prisma
```

### Pattern 3: Dashboard KPIs (Parallel Queries)
```typescript
// Server executes BOTH queries simultaneously
const [kpis, recent] = await Promise.all([
  ticketsService.getTicketKPIs(),
  ticketsService.getRecentTickets(),
]);
```
Learn: `Promise.all()` — running async operations in **parallel** instead of sequentially.

---

## 🛡️ 9. Security Concepts Applied

| Concept | Where Applied |
|---------|--------------|
| Password hashing (bcrypt) | `auth.service.ts` |
| JWT token signing & verification | `auth.service.ts`, `jwt.strategy.ts` |
| HTTP-only cookies (no JS access) | `lib/api/actions/auth.ts` |
| Route guards (server) | `@UseGuards(JwtAuthGuard)` on all controllers |
| Route guards (client) | `middleware.ts` |
| Stripping passwords from responses | `const { password: _, ...safeUser } = user` |
| Input validation via DTOs | `create-ticket.dto.ts`, `register.dto.ts` |

---

## 🎨 10. UI & Styling — Tailwind CSS

You used **Tailwind CSS** utility classes extensively. Key patterns learned:

- **Dark mode** — `dark:bg-slate-900` applies only when dark mode is active
- **Responsive design** — `grid-cols-1 lg:grid-cols-3` (1 column on mobile, 3 on desktop)
- **State variants** — `hover:bg-blue-600`, `focus:ring-2`, `disabled:opacity-50`
- **Sticky positioning** — `sticky top-6` for the ticket sidebar

---

## 📋 11. What's Still Missing / Next Steps to Learn

Based on the project's current state, here's what you should learn next:

| Feature | Concept to Learn |
|---------|-----------------|
| Real chat messages (DB-backed) | Connecting `ReplyEditor` to a real `POST /messages` API |
| WebSockets for live chat | NestJS `@nestjs/websockets`, `socket.io` |
| Role-based access (Admin/Agent) | `RolesGuard`, custom decorators `@Roles('ADMIN')` |
| File uploads | `@nestjs/platform-express` Multer, storing files |
| Pagination & filtering | Query params, `skip`/`take` in Prisma |
| Error handling UI | Toast notifications, error boundaries |
| Environment variables | `.env` files, `ConfigModule.forRoot()` |
| Testing | Jest unit tests (spec files already exist!) |
| Deployment | Docker, environment configuration for production |

---

## 🗺️ Learning Roadmap (Recommended Order)

```
1. ✅ TypeScript Basics
2. ✅ REST API concepts (GET, POST, PATCH, DELETE)
3. ✅ PostgreSQL + Prisma ORM
4. ✅ NestJS (Modules, Controllers, Services, Guards)
5. ✅ JWT Authentication + bcrypt
6. ✅ Next.js 15 App Router (Server/Client components)
7. ✅ React Context + Custom Hooks
8. ✅ Next.js Middleware
9. ✅ Next.js Server Actions
10. ⬜ Role-Based Authorization
11. ⬜ WebSockets (real-time features)
12. ⬜ File Uploads (Multer)
13. ⬜ Testing (Jest + Supertest)
14. ⬜ Deployment & DevOps
```

---

*Generated on: 2026-04-25 | Project: Nagda IT Helpdesk System*
