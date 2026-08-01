import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar.tsx';
import { Card } from './Card.tsx';
import { Table } from './Table.tsx';

const meta = {
  title: 'Data Display/Card',
  component: Card,
  args: { title: 'Card title', children: 'Card content' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export function Avatars() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" size="lg" />
    </div>
  );
}

interface UserRow {
  id: string;
  name: string;
  role: string;
}

const rows: UserRow[] = [
  { id: '1', name: 'Ada Lovelace', role: 'Administrator' },
  { id: '2', name: 'Grace Hopper', role: 'Reports' },
];

export function UsersTable() {
  return (
    <Table
      columns={[
        { key: 'name', header: 'Name', accessor: 'name' },
        { key: 'role', header: 'Role', accessor: 'role' },
      ]}
      rows={rows}
      rowKey={(user) => user.id}
    />
  );
}
