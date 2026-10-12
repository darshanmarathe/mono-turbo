# Repository Understanding

## Overview

This is a pnpm/Turborepo monorepo for a small multi-tenant SaaS console. The browser UI is split into Vite/React apps connected with Module Federation. Shared TypeScript packages hold UI components, models, auth helpers, API access, configuration, query hooks, and utilities. A Fastify service acts as the browser-facing API proxy, and a small ASP.NET Core service provides mock backend data for local development.

There is currently no Gmail integration, Gmail record model, database, or Gmail seed data in the repository. The available sample records are tenant-scoped users hardcoded in the DMZ mock API.

## Workspace Structure

| Path | Role |
| --- | --- |
| `apps/shell` | Host SPA and router; loads the admin apps and component gallery as federated remotes. |
| `apps/app-admin` | Admin A login/dashboard; fetches tenant users through the shared query and service packages. |
| `apps/app-admin-b` | Reports-oriented Admin B SPA with a static revenue table. |
| `apps/kitchen-sink` | Component gallery and federated widget, using the shared UI library. |
| `packages/ui` | Shared React components and design tokens. |
| `packages/models` | Zod-backed user/session schemas and API types. |
| `packages/auth` | Browser-side session-cookie helpers and auth guards. |
| `packages/services` | Typed HTTP helper and user API function. |
| `packages/query` | TanStack Query provider and `useUsers` hook. |
| `packages/config` | Environment schema and shared API/session constants. |
| `packages/utils` | Formatting, delay, and API error helpers; currently contains the workspace's Vitest test. |
| `proxy` | Fastify auth/session endpoints, API passthrough, and memory/Redis stores and cache. |
| `dmz/MockApi` | ASP.NET Core 8 Minimal API with health and tenant-filtered mock users. |

## Applications and Federation

The shell routes `/` and `/admin-a` to Admin A, `/admin-b` to Admin B, and `/components` to the Kitchen Sink widget. Its Vite federation configuration consumes the apps' `remoteEntry.js` files and shares React/React DOM as singletons.

| App | Local port | Federation role |
| --- | ---: | --- |
| Kitchen Sink | `5173` | Exposes `kitchenSink/Widget`. |
| Admin A | `5174` | Exposes `appAdmin/App`; consumes the Kitchen Sink widget. |
| Admin B | `5175` | Exposes `appAdminB/App`; consumes the Kitchen Sink widget. |
| Shell | `5176` | Host for Admin A, Admin B, and Kitchen Sink. |

Both admin apps switch between login and dashboard based on their own Zustand auth store. Admin A shows users for `tenant-acme`; Admin B currently displays hardcoded sample revenue rather than making an API request.

## Request and Authentication Flow

The intended local request path is:

```text
Browser app -> Vite /api proxy (when running an admin app directly)
             -> Fastify proxy :8080
             -> DMZ mock API :9999
```

The Fastify proxy registers health, login/logout, session, and catch-all `/api/*` routes. Login checks a small in-memory identity list, creates a session, sets the `saas.sid` cookie, and returns a signed JWT. For proxied API calls, the proxy reads the session from the cookie, signs/reuses a bearer token, adds `x-tenant-id`, and forwards the request to `API_TARGET`. GET responses are cached for 60 seconds by default. Session and cache backends can use memory or Redis.

The mock API exposes:

- `GET /api/health`
- `GET /api/users` — requires a bearer Authorization header and `x-tenant-id`; returns users belonging to that tenant.

The seeded demo users are Ada Lovelace (`admin@acme.com`), Grace Hopper (`reports@acme.com`), and Alan Turing (`operator@globex.com`). Demo passwords are displayed in the respective login UI or listed in the source identity fixture. These are local demo credentials only.

## Local Development and Checks

- Use Node.js `>=24` and pnpm `11.18.0` (`packageManager` is declared at the repository root).
- `pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm check` are Turbo-backed root scripts.
- `pnpm dev` starts workspace package dev tasks; it does not start the .NET mock API.
- `dotnet run --project dmz/MockApi` starts the mock API on `http://127.0.0.1:9999`.
- `start-all.bat` launches the pnpm dev stack and the mock API in separate Windows command windows.
- The admin Vite configs proxy `/api` to Fastify at `http://localhost:8080`. The proxy's sample environment file is `proxy/.env.example`.
- CI installs from the frozen pnpm lockfile, verifies TypeScript configs, then runs typecheck, lint, tests, and builds.

## Implementation Notes

- There is no database layer or migration/seed mechanism. Identity records and mock API users are static source arrays.
- The auth helper reads `saas.sid` from `document.cookie`, but the proxy sets that cookie as `HttpOnly`; browser JavaScript cannot read it. Admin apps instead set the returned access token in in-memory Zustand state after login, so a page reload does not restore that token through the current helper.
- `proxy/src/index.ts` calls `parseEnv()` without passing `process.env`, while `parseEnv` defaults to an empty object. Thus the schema defaults are used for parsed proxy settings rather than values loaded from `.env`; the JWT signer separately reads `process.env.SESSION_SECRET`.
- Only Admin A and Admin B configure the Vite `/api` development proxy; the shell Vite config does not.
- To add Gmail-style fake records, the codebase first needs a defined record schema, API route/data owner, and user/tenant association. The existing users endpoint and static user seed list are not a Gmail record store.
