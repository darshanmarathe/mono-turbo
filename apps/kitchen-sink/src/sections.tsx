import { Alert, Avatar, Badge, Button, Card, Input, Select, Table } from '@repo/ui';
import type { Column } from '@repo/ui';

interface SampleRow {
  id: string;
  name: string;
  status: string;
}

const SAMPLE_ROWS: SampleRow[] = [
  { id: '1', name: 'Ada Lovelace', status: 'Active' },
  { id: '2', name: 'Grace Hopper', status: 'Active' },
  { id: '3', name: 'Alan Turing', status: 'Invited' },
];

const SAMPLE_COLUMNS: Column<SampleRow>[] = [
  { key: 'name', header: 'Name', accessor: 'name' },
  { key: 'status', header: 'Status', render: (row) => <Badge tone={row.status === 'Active' ? 'success' : 'warning'}>{row.status}</Badge> },
];

export function ButtonsSection() {
  return (
    <Card title="Button">
      <div className="row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </div>
    </Card>
  );
}

export function InputsSection() {
  return (
    <Card title="Input & Select">
      <div className="column">
        <Input placeholder="First name" />
        <Select
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'editor', label: 'Editor' },
            { value: 'viewer', label: 'Viewer' },
          ]}
        />
      </div>
    </Card>
  );
}

export function BadgesSection() {
  return (
    <Card title="Badge & Avatar">
      <div className="row">
        <Badge>Neutral</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="danger">Danger</Badge>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" size="lg" />
      </div>
    </Card>
  );
}

export function AlertsSection() {
  return (
    <Card title="Alert">
      <div className="column">
        <Alert>Info alert</Alert>
        <Alert tone="success">Operation completed</Alert>
        <Alert tone="warning">Review before continuing</Alert>
        <Alert tone="danger">Something went wrong</Alert>
      </div>
    </Card>
  );
}

export function TablesSection() {
  return (
    <Card title="Table">
      <Table columns={SAMPLE_COLUMNS} rows={SAMPLE_ROWS} rowKey={(row) => row.id} />
    </Card>
  );
}
