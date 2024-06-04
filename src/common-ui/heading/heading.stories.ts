import type { Meta, StoryObj } from '@storybook/react';

import Heading from '.';

const meta: Meta<typeof Heading> = {
  title: 'component/Heading',
  component: Heading,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Heading',
  },
};
