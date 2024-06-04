import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'component/Button',
  component: Button,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: '버튼',
    variant: 'contained',
    size: 'L',
  },
};

export const Outline: Story = {
  args: {
    children: '버튼',
    variant: 'outline',
    size: 'L',
  },
};

export const Ghosts: Story = {
  args: {
    children: '버튼',
    variant: 'ghosts',
    size: 'L',
  },
};

export const Flexible: Story = {
  args: {
    children: '버튼',
    variant: 'ghosts',
    flexible: true,
    size: 'L',
  },
};
