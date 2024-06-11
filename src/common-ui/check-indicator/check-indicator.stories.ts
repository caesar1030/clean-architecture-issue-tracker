import CheckIndicator from '@/common-ui/check-indicator';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckIndicator> = {
  title: 'component/CheckIndicator',
  component: CheckIndicator,
  argTypes: {
    checked: {
      description: 'true 또는 false가 가능합니다.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};
