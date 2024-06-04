import type { Meta, StoryObj } from '@storybook/react';

import LabelTag from '.';

const meta: Meta<typeof LabelTag> = {
  title: 'component/LabelTag',
  component: LabelTag,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ColorName: Story = {
  args: {
    backgroundColor: 'blue',
    textColor: 'white',
    children: '레이블',
  },
};

export const ColorCode: Story = {
  args: {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    children: '레이블',
  },
};
