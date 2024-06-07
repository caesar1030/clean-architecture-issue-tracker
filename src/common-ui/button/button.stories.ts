import Button from '@/common-ui/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'component/Button',
  component: Button,
  argTypes: {
    variant: {
      description: '"contained", "outline", "ghosts"이 가능합니다.',
    },
    size: {
      description: '"S", "M", "L"이 가능합니다.',
    },
    flexible: {
      description:
        '버튼 container가 영역을 차지하고 싶지 않을 때 사용합니다. 주로 variant "ghosts"와 함께 사용됩니다.',
    },
    to: {
      description:
        'to에 route path를 주게 되면 Link 컴포넌트가 반환됩니다. 디자인은 Button과 동일합니다.',
    },
  },
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
