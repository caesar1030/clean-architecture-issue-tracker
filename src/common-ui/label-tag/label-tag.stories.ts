import LabelTag from '@/common-ui/label-tag';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LabelTag> = {
  title: 'component/LabelTag',
  component: LabelTag,
  argTypes: {
    backgroundColor: {
      description:
        '배경 색상을 입력해주세요. <br /> 유효한 색 이름(ex. "blue") 또는 <br/>헥사코드(ex."#FFFFFF", "#FFF")를 입력해주세요.',
    },
    textColor: {
      description:
        '텍스트의 색상을 입력해주세요. <br /> 유효한 색 이름(ex. "blue") 또는 <br/>헥사코드(ex."#FFFFFF", "#FFF")를 입력해주세요.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ColorName: Story = {
  args: {
    backgroundColor: 'blue',
    textColor: 'white',
    children: '레이블',
  },
};

export const ColorCode: Story = {
  args: {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    children: '레이블',
  },
};
