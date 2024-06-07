import InformationTag from '@/common-ui/information-tag';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InformationTag> = {
  title: 'component/InformationTag',
  component: InformationTag,
  argTypes: {
    variant: {
      description: '"open", "closed", "writer"가 가능합니다.',
    },
  },
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
