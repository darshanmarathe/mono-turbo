import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Badge } from './index.ts';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  args: { children: 'Your changes have been saved.' },
  argTypes: {
    tone: { control: 'radio', options: ['info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { tone: 'success' } };
export const Warning: Story = { args: { tone: 'warning' } };
export const Danger: Story = { args: { tone: 'danger' } };

export function Badges() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge>Neutral</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
    </div>
  );
}
