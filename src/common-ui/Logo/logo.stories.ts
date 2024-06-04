import type { Meta, StoryObj } from '@storybook/react';

import Logo from '.';

const meta: Meta<typeof Logo> = {
  title: 'component/Logo',
  component: Logo,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};
