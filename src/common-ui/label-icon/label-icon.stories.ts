import LabelIcon from '@/common-ui/label-icon';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LabelIcon> = {
  title: 'component/LabelIcon',
  component: LabelIcon,
  argTypes: {
    backgroundColor: {
      description:
        '유효한 색 이름(ex. "blue") 또는 <br/>헥사코드(ex."#FFFFFF", "#FFF")를 입력해주세요.',
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const ColorName: Story = {
  args: {
    backgroundColor: 'blue',
  },
};

export const ColorCode: Story = {
  args: {
    backgroundColor: '#000000',
  },
};
