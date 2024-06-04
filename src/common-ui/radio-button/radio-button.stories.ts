import type { Meta, StoryObj } from '@storybook/react';

import RadioButton from '.';

const meta: Meta<typeof RadioButton> = {
  title: 'component/RadioButton',
  component: RadioButton,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};
