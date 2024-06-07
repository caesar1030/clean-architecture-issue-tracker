import Logo from '@/common-ui/logo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Logo> = {
  title: 'component/Logo',
  component: Logo,
  argTypes: {
    size: {
      description: '"M" 또는 "L"이 가능합니다.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: 'M',
  },
};

export const Large: Story = {
  args: {
    size: 'L',
  },
};
