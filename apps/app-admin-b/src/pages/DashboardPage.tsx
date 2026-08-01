import { lazy, Suspense } from 'react';
import { Avatar, Badge, Button, Card, Select, Table } from '@repo/ui';
import type { Column } from '@repo/ui';
import { formatNumber } from '@repo/utils';
import { useAuthStore } from '../auth/store.ts';
import { ErrorBoundary } from '../remote/ErrorBoundary.tsx';

const RemoteWidget = lazy(() => import('kitchenSink/Widget'));

interface RevenueRow {
  month: string;
  revenue: number;
  orders: number;
}

const REVENUE_ROWS: RevenueRow[] = [
  { month: 'May 2026', revenue: 48200, orders: 1210 },
  { month: 'Jun 2026', revenue: 51950, orders: 1334 },
  { month: 'Jul 2026', revenue: 56300, orders: 1478 },
];

const REVENUE_COLUMNS: Column<RevenueRow>[] = [
  { key: 'month', header: 'Month', accessor: 'month' },
  {
    key: 'revenue',
    header: 'Revenue',
    render: (row) => <strong>${formatNumber(row.revenue)}</strong>,
  },
  { key: 'orders', header: 'Orders', accessor: 'orders' },
];

export function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="page">
      <header className="page__header">
        <h1>Reports Dashboard</h1>
        <div className="row">
          <Badge tone="success">Authenticated</Badge>
          <Avatar name="Grace Hopper" size="sm" />
          <Button variant="secondary" onClick={logout}>
            Sign out
          </Button>
        </div>
      </header>
      <main className="page__grid">
        <Card title="Revenue">
          <div className="column">
            <Select
              defaultValue="90d"
              options={[
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' },
                { value: '12m', label: 'Last 12 months' },
              ]}
            />
            <Table columns={REVENUE_COLUMNS} rows={REVENUE_ROWS} rowKey={(row) => row.month} />
          </div>
        </Card>
        <ErrorBoundary>
          <Suspense fallback={<p>Loading remote widget...</p>}>
            <RemoteWidget />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
