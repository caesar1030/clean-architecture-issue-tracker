import type { Meta, StoryObj } from '@storybook/react';

import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'component/Input',
  component: Input,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const LabelLeft: Story = {
  args: {
    label: '라벨',
    labelPosition: 'left',
    id: 'id',
  },
};

export const LabelTop: Story = {
  args: {
    label: '라벨',
    labelPosition: 'top',
    id: 'id',
  },
};
