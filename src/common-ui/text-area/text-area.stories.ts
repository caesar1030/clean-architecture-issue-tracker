import TextArea from '@/common-ui/text-area';
import type { Meta, StoryObj } from '@storybook/react';

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
  argTypes: {
    label: {
      description: `HTML의 label 태그 역할을 합니다.`,
    },
    value: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    error: {
      description: `하단에 에러메세지를 출력하고 싶다면 <br/> 
        에러메세지를 입력해주세요.`,
    },
  },
};

export const Value: Story = {
  args: {
    label: 'Label',
    value: '사용자 입력값',
    className: 'h-[200px]',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    value: '사용자 입력값',
    className: 'h-[200px]',
    error: '최대 6자까지 입력 가능합니다.',
  },
};
