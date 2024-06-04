import type { Meta, StoryObj } from '@storybook/react';

import InformationTag from '.';

const meta: Meta<typeof InformationTag> = {
  title: 'component/InformationTag',
  component: InformationTag,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    variant: 'open',
    children: '열린 태그',
  },
};

export const Closed: Story = {
  args: {
    variant: 'closed',
    children: '닫힌 태그',
  },
};

export const Writer: Story = {
  args: {
    variant: 'writer',
    children: '작성자',
  },
};
