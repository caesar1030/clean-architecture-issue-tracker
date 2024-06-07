import Avatar from '@/common-ui/avatar';
import Divider from '@/common-ui/divider';
import Logo from '@/common-ui/logo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Divider> = {
  title: 'component/Divider',
  component: Divider,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          width: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        <Logo size="L" />
        <Story />
        <Avatar />
      </div>
    ),
  ],
};
