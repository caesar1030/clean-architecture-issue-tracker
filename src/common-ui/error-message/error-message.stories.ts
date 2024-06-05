import ErrorMessage from '@/common-ui/error-message';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ErrorMessage> = {
  title: 'component/ErrorMessage',
  component: ErrorMessage,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '에러 메세지',
  },
};
