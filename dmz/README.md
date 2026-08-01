# DMZ mock API

`MockApi` is a dependency-free ASP.NET Core 8 Minimal API that represents the .NET services located behind the DMZ. It allows the frontend and Node.js proxy to be developed end-to-end before a real .NET API is connected.

## Architecture role

The browser never calls this service directly. Requests follow this path:

```text
Admin SPA -> Fastify proxy (:8080) -> DMZ Mock API (:9999)
```

The Fastify proxy owns the browser session cookie, resolves the tenant, and adds the bearer token plus `x-tenant-id` header before forwarding requests here.

## Prerequisites

- .NET 8 SDK
- The Fastify proxy in `../proxy`

## Run locally

From the `turbo` directory:

```powershell
dotnet run --project dmz/MockApi
```

The service listens at `http://127.0.0.1:9999`. This is the default value of `API_TARGET` in `proxy/.env`, so no proxy configuration changes are needed for local development.

Alternatively, run `start-all.bat` from the `turbo` directory to start this service, the proxy, and frontend apps in separate windows.

## Endpoints

| Endpoint | Purpose | Requirements |
| --- | --- | --- |
| `GET /api/health` | Service availability check | None |
| `GET /api/users` | Returns users for the requested tenant | `Authorization: Bearer ...` and `x-tenant-id` |

## Seeded tenant data

| Tenant | User | Role |
| --- | --- | --- |
| `tenant-acme` | Ada Lovelace (`admin@acme.com`) | `admin` |
| `tenant-acme` | Grace Hopper (`reports@acme.com`) | `admin`, `reports` |
| `tenant-globex` | Alan Turing (`operator@globex.com`) | `operator` |

## Validation

After starting the mock API and proxy, sign in at the admin app using `admin@acme.com` / `admin123`. The dashboard's Users widget should display the Acme users.

To build the API:

```powershell
dotnet build dmz/MockApi/MockApi.csproj
```

## Replacing the mock

When the real DMZ service is available, set `API_TARGET` in `proxy/.env` to its base URL and restart the Fastify proxy. The browser apps do not need to change because they continue calling the proxy's `/api/*` routes.
