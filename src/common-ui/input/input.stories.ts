import Input from '@/common-ui/input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'component/Input',
  component: Input,
  argTypes: {
    label: {
      description: 'HTML의 label 태그 역할을 합니다.',
    },
    labelPosition: {
      description: '"left", "top"이 가능합니다.',
    },
    id: {
      description: `label의 htmlFor과 input의 id를 지정합니다.`,
    },
    value: {
      table: { disable: true },
    },

    error: {
      description: `하단에 에러메세지를 출력하고 싶다면 <br/> 
        에러메세지를 입력해주세요.`,
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const LabelLeft: Story = {
  args: {
    label: '라벨',
    labelPosition: 'left',
    id: 'id',
    value: '사용자 입력값',
  },
};

export const LabelTop: Story = {
  args: {
    label: '라벨',
    labelPosition: 'top',
    id: 'id',
    value: '사용자 입력값',
  },
};

export const Error: Story = {
  args: {
    label: '제목',
    labelPosition: 'left',
    id: 'id',
    value: '제목입니다',
    error: '제목은 최대 4글자 입니다.',
  },
};
