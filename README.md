# SaaS Monorepo

A local-development SaaS console built as a pnpm/Turborepo monorepo. It contains React micro-frontends, shared UI and service packages, a Fastify auth/API proxy, and an ASP.NET Core mock API.

## Requirements

- Node.js 24 or later
- pnpm 11.18.0
- .NET 8 SDK (for the mock API)

## Get started

Install dependencies from the repository root:

```sh
pnpm install
```

Start the frontend apps and Fastify proxy:

```sh
pnpm dev
```

In a second terminal, start the DMZ mock API:

```sh
dotnet run --project dmz/MockApi
```

On Windows, `start-all.bat` starts both commands in separate windows.

| App or service | URL |
| --- | --- |
| Kitchen Sink remote | `http://localhost:5173` |
| Admin A remote | `http://localhost:5174` |
| Admin B remote | `http://localhost:5175` |
| Shell host | `http://localhost:5176` |
| Fastify proxy health | `http://localhost:8080/api/health` |
| DMZ mock API health | `http://127.0.0.1:9999/api/health` |

The shell composes the federated apps. For login and API calls during local development, open Admin A or Admin B directly: their Vite servers proxy `/api` requests to the Fastify proxy. The shell Vite server does not currently configure that API proxy.

### Demo accounts

| Email | Password | Tenant |
| --- | --- | --- |
| `admin@acme.com` | `admin123` | `tenant-acme` |
| `reports@acme.com` | `reports123` | `tenant-acme` |
| `operator@globex.com` | `operator123` | `tenant-globex` |

These are local mock credentials; do not use them in production.

## Workspace map

| Directory | Purpose |
| --- | --- |
| `apps/shell` | Module Federation host and application router |
| `apps/app-admin` | Admin dashboard with a tenant users widget |
| `apps/app-admin-b` | Reports dashboard |
| `apps/kitchen-sink` | Shared component gallery and federated widget |
| `packages/ui` | Reusable React components and design tokens |
| `packages/models` | Shared user, session, and API types |
| `packages/auth` | Browser session helpers and auth guards |
| `packages/services` | HTTP and users API functions |
| `packages/query` | TanStack Query provider and hooks |
| `packages/config` | Environment schema and shared constants |
| `packages/utils` | Formatting, delay, and API error utilities |
| `proxy` | Fastify login/session routes and API passthrough |
| `dmz/MockApi` | ASP.NET Core mock backend |

The mock API currently serves health and tenant-filtered user data. The repository has no database or Gmail integration/record model; mock users and identities are static fixtures.

## Useful commands

Run from the repository root:

```sh
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm check
```

`pnpm check` verifies TypeScript configuration and runs typecheck, lint, and tests. The .NET mock API can be built with:

```sh
dotnet build dmz/MockApi/MockApi.csproj
```

For a more detailed codebase walkthrough, see [understanding.md](understanding.md). The mock API's endpoints and local-development role are also described in [dmz/README.md](dmz/README.md).
