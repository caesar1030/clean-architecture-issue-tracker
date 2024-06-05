import Checkbox from '@/common-ui/checkbox';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Checkbox> = {
  title: 'component/Checkbox',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
