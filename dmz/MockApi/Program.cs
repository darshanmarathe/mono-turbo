var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var users = new[]
{
    new User("a1f9b0e0-0000-4000-8000-000000000001", "tenant-acme", "admin@acme.com", "Ada Lovelace", new[] { "admin" }),
    new User("a1f9b0e0-0000-4000-8000-000000000002", "tenant-acme", "reports@acme.com", "Grace Hopper", new[] { "admin", "reports" }),
    new User("a1f9b0e0-0000-4000-8000-000000000003", "tenant-globex", "operator@globex.com", "Alan Turing", new[] { "operator" }),
};

app.MapGet("/api/health", () => Results.Ok(new { ok = true, service = "dmz-mock-api" }));

app.MapGet("/api/users", (HttpRequest request) =>
{
    if (!request.Headers.Authorization.ToString().StartsWith("Bearer ", StringComparison.Ordinal))
    {
        return Results.Unauthorized();
    }

    var tenantId = request.Headers["x-tenant-id"].ToString();
    if (string.IsNullOrWhiteSpace(tenantId))
    {
        return Results.BadRequest(new { code = "tenant_required", message = "The x-tenant-id header is required." });
    }

    return Results.Ok(users.Where(user => user.TenantId == tenantId));
});

app.Run();

record User(string Id, string TenantId, string Email, string DisplayName, string[] Roles);
