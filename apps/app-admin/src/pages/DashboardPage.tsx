import { lazy, Suspense } from 'react';
import { Badge, Button, Card } from '@repo/ui';
import { AppQueryProvider, useUsers } from '@repo/query';
import { useAuthStore } from '../auth/store.ts';
import { ErrorBoundary } from '../remote/ErrorBoundary.tsx';

const RemoteWidget = lazy(() => import('kitchenSink/Widget'));

function UsersWidget() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data, isPending, isError, error } = useUsers('tenant-acme', accessToken ?? '');

  return (
    <Card title="Users (TanStack Query)">
      {isPending ? <p>Loading...</p> : null}
      {isError ? <p className="error">{error.message}</p> : null}
      {data ? (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.displayName}</li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}

export function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <AppQueryProvider>
      <div className="page">
        <header className="page__header">
          <h1>Admin Dashboard</h1>
          <div className="row">
            <Badge tone="success">Authenticated</Badge>
            <Button variant="secondary" onClick={logout}>
              Sign out
            </Button>
          </div>
        </header>
        <main className="page__grid">
          <UsersWidget />
          <ErrorBoundary>
            <Suspense fallback={<p>Loading remote widget...</p>}>
              <RemoteWidget />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </AppQueryProvider>
  );
}
