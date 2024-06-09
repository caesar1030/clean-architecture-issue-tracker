import LoadingSpinner from '@/common-ui/loading-spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'component/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
