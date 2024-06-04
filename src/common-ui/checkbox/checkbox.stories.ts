import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'component/Checkbox',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
