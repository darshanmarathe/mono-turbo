import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input.tsx';
import { Select } from './Select.tsx';

const meta = {
  title: 'Forms/Input',
  component: Input,
  args: { placeholder: 'Enter a value' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Password: Story = { args: { type: 'password', placeholder: 'Password' } };

export function SelectExample() {
  return (
    <Select
      aria-label="User role"
      defaultValue="admin"
      options={[
        { value: 'admin', label: 'Administrator' },
        { value: 'operator', label: 'Operator' },
      ]}
    />
  );
}
