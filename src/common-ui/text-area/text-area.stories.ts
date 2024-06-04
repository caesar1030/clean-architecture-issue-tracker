import type { Meta, StoryObj } from '@storybook/react';

import TextArea from '.';

const meta: Meta<typeof TextArea> = {
  title: 'component/TextArea',
  component: TextArea,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: 'Label',
    value: '',
    className: 'h-[200px]',
  },
};

export const Value: Story = {
  args: {
    label: 'Label',
    value: 'Text Area Value',
    className: 'h-[200px]',
  },
};
