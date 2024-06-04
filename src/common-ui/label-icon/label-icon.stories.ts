import type { Meta, StoryObj } from '@storybook/react';

import LabelIcon from '.';

const meta: Meta<typeof LabelIcon> = {
  title: 'component/LabelIcon',
  component: LabelIcon,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ColorName: Story = {
  args: {
    backgroundColor: 'blue',
  },
};

export const ColorCode: Story = {
  args: {
    backgroundColor: '#000000',
  },
};
